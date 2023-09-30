import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./GroupHistory.module.css";
import emojiConstants from "../../constants/emojiConstants";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function GroupHistory({ groupCode }) {
  const [groupExpensesAndPayments, setGroupExpensesAndPayments] = useState([]);
  const [error, setError] = useState(null);

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
          // Create new properties
          const modifiedData = responseData.groupExpensesAndPayments.map(
            (item) => ({
              ...item,
              itemId: item._id,
              // Determine and add 'itemType' based on the presence of properties
              itemType: item.expenseName
                ? "expense"
                : item.paymentAmount
                ? "payment"
                : "unknown",
            })
          );
          setGroupExpensesAndPayments(modifiedData);
        }
        setError(null);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching group expenses and payments:", error);
        }
        setError(
          "An error occurred while fetching group expenses and payments. Please try again later."
        );
      }
    }

    fetchGroupExpensesAndPayments();
  }, [groupCode]);

  return (
    <div className={styles.expenses}>
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
                <div className={styles.date}>
                  ({new Date(item.updatedAt).toLocaleString()})
                </div>
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
                <div className={styles.date}>
                  ({new Date(item.updatedAt).toLocaleString()})
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
