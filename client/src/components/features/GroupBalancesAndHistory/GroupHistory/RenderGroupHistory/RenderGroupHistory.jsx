// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../../constants/errorConstants";

// Hooks
import useFetchGroupMembers from "../../../../../hooks/useFetchGroupMembers";

// Components
import Spinner from "../../../../common/Spinner/Spinner";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";
import RenderGroupExpense from "../RenderGroupExpense/RenderGroupExpense";
import RenderGroupPayment from "../RenderGroupPayment/RenderGroupPayment";
import NotEnoughUsers from "../../NotEnoughUsers/NotEnoughUsers";
import NoGroupTransactions from "../NoGroupTransactions/NoGroupTransactions";

// Styles
import styles from "./RenderGroupHistory.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for displaying expenses and payments history of a group.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {string} props.groupCode - The groupCode of the group to display expenses and payments.
 * @returns {JSX.Element} - Rendered component.
 */
const RenderGroupHistory = ({ groupCode }) => {
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const [groupExpensesAndPayments, setGroupExpensesAndPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupExpensesAndPayments = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/${groupCode}/expenses-and-payments`
        );
        const responseData = response.data;
        devLog("Group expenses and payments data fetched:", response);

        // Check if groupExpensesAndPayments array exists and has items
        if (
          responseData.groupExpensesAndPayments &&
          responseData.groupExpensesAndPayments.length > 0
        ) {
          // Add new properties and sort by createdAt in descending order
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
              // Convert createdAt to date object and sort by in descending order
              createdAt: new Date(item.createdAt),
            }))
            .sort((a, b) => b.createdAt - a.createdAt);
          devLog("Group expenses and payments data modified:", modifiedData);
          setGroupExpensesAndPayments(modifiedData);
        }
        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group expenses and payments:", error);
        setError(genericErrorMessage);
        setIsLoading(false);
      }
    };
    fetchGroupExpensesAndPayments();
  }, [groupCode]);

  return isLoading ? (
    <div className={styles.spinner}>
      <Spinner />
    </div>
  ) : (
    // Render container with group expenses and payments or display  messages if there are either no such transactions or not at least 2 users in the group
    <>
      {groupExpensesAndPayments.length > 0 ? (
        <div className={styles.container}>
          <ul>
            {/* Map through group expenses and payments */}
            {groupExpensesAndPayments.map((item) => (
              <li key={item._id}>
                {item.expenseDescription ? (
                  <RenderGroupExpense item={item} groupCode={groupCode} />
                ) : (
                  <RenderGroupPayment item={item} groupCode={groupCode} />
                )}
              </li>
            ))}
          </ul>
          <ErrorDisplay error={error} remWidth={20} />
        </div>
      ) : (
        <div className={styles.issue}>
          {isFetched && groupMembers.length > 1 ? (
            <NoGroupTransactions />
          ) : (
            <NotEnoughUsers />
          )}
          <ErrorDisplay error={error} remWidth={20} />
        </div>
      )}
    </>
  );
};

export default RenderGroupHistory;
