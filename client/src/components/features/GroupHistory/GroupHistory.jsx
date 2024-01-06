import React, { useEffect, useState } from "react";
import axios from "axios";
import emojiConstants from "../../../constants/emojiConstants";
import RenderGroupExpenses from "./RenderGroupExpenses/RenderGroupExpenses";
import RenderGroupPayments from "./RenderGroupPayments/RenderGroupPayments";
import Spinner from "../../common/Spinner/Spinner";
import PiratePx from "../../common/PiratePx/PiratePx";
import styles from "./GroupHistory.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const GroupHistory = ({ groupCode }) => {
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
  return isLoading ? (
    <div className={styles.spinner}>
      <Spinner />
      <PiratePx COUNT_IDENTIFIER={"group-history"} />
    </div>
  ) : (
    <div className={styles.container}>
      {groupExpensesAndPayments.length > 0 ? (
        <ul>
          {groupExpensesAndPayments.map((item) => (
            <li key={item._id}>
              {item.expenseName ? (
                <RenderGroupExpenses item={item} />
              ) : (
                <RenderGroupPayments item={item} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.failMessage}>
          Begin adding expenses{" "}
          <span className={styles.emojiParenthesis}>
            ({emojiConstants.expense}) and payments{" "}
            <span className={styles.emojiParenthesis}></span>(
            {emojiConstants.payment})
          </span>{" "}
          below 👇.
        </p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default GroupHistory;
