import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./RenderGroupHistory.module.css";
import NoTransactions from "../NoTransactions/NoTransactions";
import RenderGroupExpenses from "../RenderGroupExpenses/RenderGroupExpenses";
import RenderGroupPayments from "../RenderGroupPayments/RenderGroupPayments";
import Spinner from "../../../common/Spinner/Spinner";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const RenderGroupHistory = ({ groupCode }) => {
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
        const responseData = response.data;
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
              itemType: item.expenseDescription
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
    </div>
  ) : (
    <div className={styles.container}>
      {groupExpensesAndPayments.length > 0 ? (
        <ul>
          {groupExpensesAndPayments.map((item) => (
            <li key={item._id}>
              {item.expenseDescription ? (
                <RenderGroupExpenses item={item} />
              ) : (
                <RenderGroupPayments item={item} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <NoTransactions />
      )}
      <ErrorDisplay error={error} remWidth={20} />
    </div>
  );
};

export default RenderGroupHistory;
