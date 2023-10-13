import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SettlementParent.module.css";
import Spinner from "../../reuseableComponents/Spinner/Spinner";
import RenderSettlementOverview from "./RenderSettlementOverview/RenderSettlementOverview";
import RenderSettlementPaymentSuggestions from "./RenderSettlementPaymentSuggestions/RenderSettlementPaymentSuggestions";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Set threshold for considering balances as settled (for certain rounding situations, e.g., 10€ to be split among 3 users.)
const BALANCE_THRESHOLD = 0.01;

export default function SettlementParent() {
  const groupCode = localStorage.getItem("activeGroupCode");

  // States for user details, loading error messages
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define fetch user details function, extract & format relevant data, then set the user details
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );

        const responseData = response.data.data;

        if (responseData.users && responseData.users.length > 0) {
          // Modify user details to include userBalanceCalculated
          const userDetails = responseData.users.map((user) => {
            const userBalanceCalculated =
              user.totalExpensesPaidAmount +
              user.totalPaymentsMadeAmount -
              user.totalExpenseBenefittedAmount -
              user.totalPaymentsReceivedAmount;

            // Include userBalanceCalculated property in the user details
            return {
              ...user, // Keep all existing user properties
              userBalanceCalculated,
            };
          });

          // Apply the balance threshold and treat balances as settled if within the threshold
          const unsettledUserDetails = userDetails.filter(
            (user) => Math.abs(user.userBalanceCalculated) > BALANCE_THRESHOLD
          );

          setUserDetails(unsettledUserDetails);
        } else {
          // If there are no users with unsettled expenses, display a message.
          setUserDetails([]); // Clear userDetails
        }
        setIsLoading(false); // Set loading to false after a successful fetch
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching data:", error);
        }
        setError(
          "An error occurred while fetching group users. Please try again later."
        );
        setIsLoading(false); // Set loading to false on error
      }
    }

    // Call the fetchUserDetails function when dependencies change
    fetchUserDetails();
  }, [groupCode]);

  // Separate users with positive and negative balances
  const positiveBalanceUsers = userDetails
    .filter((user) => user.userBalanceCalculated > 0)
    .map((user) => ({
      ...user,
      userBalanceCalculated: user.userBalanceCalculated, // Add userBalanceCalculated property back
    }));

  const negativeBalanceUsers = userDetails
    .filter((user) => user.userBalanceCalculated < 0)
    .map((user) => ({
      ...user,
      userBalanceCalculated: user.userBalanceCalculated, // Add userBalanceCalculated property back
    }));

  // Render spinner while loading, then render user details, link to user pages
  return (
    <div className={styles.balances}>
      {isLoading ? ( // Display Spinner while loading
        <Spinner />
      ) : (
        <div>
          {error ? (
            // Display the error message when there's an error
            <p className={styles.errorText}>{error}</p>
          ) : userDetails.length === 0 ? (
            // Display a message when there are no users with unsettled balances
            <p className={styles.balancesSettled}>All settled. 🤝</p>
          ) : (
            <div className={styles.container}>
              <RenderSettlementOverview
                negativeBalanceUsers={negativeBalanceUsers}
                positiveBalanceUsers={positiveBalanceUsers}
              />
              <RenderSettlementPaymentSuggestions />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
