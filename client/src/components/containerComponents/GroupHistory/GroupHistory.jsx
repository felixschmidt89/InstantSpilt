import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./GroupHistory.module.css";
import emojiConstants from "../../../constants/emojiConstants";
import Spinner from "../../reuseableComponents/Spinner/Spinner";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function GroupHistory({ groupCode }) {
  const [groupExpensesAndPayments, setGroupExpensesAndPayments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");

    async function fetchGroupExpensesAndPayments() {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/${groupCode}/expenses-and-payments`
        );
        const responseData = response.data.data;
        if (
          responseData.groupExpensesAndPayments &&
          responseData.groupExpensesAndPayments.length > 0
        ) {
          // Create new properties and sort by createdAt in descending order
          const modifiedData = responseData.groupExpensesAndPayments
            .map((item) => ({
              ...item,
              itemId: item._id,
              // Determine and add 'itemType' based on the presence of properties
              itemType: item.expenseName
                ? "expense"
                : item.paymentAmount
                ? "payment"
                : "unknown",
              // Convert createdAt to a Date object
              createdAt: new Date(item.createdAt),
            })) // Sort by createdAt in descending order
            .sort((a, b) => b.createdAt - a.createdAt);
          console.log(modifiedData);
          setGroupExpensesAndPayments(modifiedData);
        }
        setError(null);
        setIsLoading(false);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching group expenses and payments:", error);
        }
        setError(
          "An error occurred while fetching group expenses and payments. Please try again later."
        );
        setIsLoading(false); // Set loading to false when data is fetched
      }
    }

    fetchGroupExpensesAndPayments();
  }, [groupCode]);
  return (
    <div className={styles.expenses}>
      {isLoading ? (
        <Spinner />
      ) : groupExpensesAndPayments.length > 0 ? ( // Check if there are expenses or payments
        <ul>
          {groupExpensesAndPayments.map((item) => (
            <li key={item._id}>
              {item.expenseName ? (
                <div>
                  <strong>
                    {emojiConstants.expense} {item.expenseName}
                  </strong>
                  :{" "}
                  <Link
                    to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
                    {item.expenseAmount.toFixed(2)}€
                  </Link>{" "}
                  {emojiConstants.paidFor}{" "}
                  <strong>{item.expensePayer.userName}</strong>
                </div>
              ) : (
                <div>
                  <span>
                    {emojiConstants.payment}{" "}
                    <Link
                      to={`/item-page?itemId=${item.itemId}&itemType=${item.itemType}`}>
                      {item.paymentAmount.toFixed(2)}€
                    </Link>
                  </span>{" "}
                  <strong>
                    {item.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
                    {item.paymentRecipient.userName}
                  </strong>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses added yet...</p> // Display a message when there are no expenses or payments
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
