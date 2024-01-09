import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./SettlementPaymentSuggestions.module.css";
import emojiConstants from "../../../../constants/emojiConstants";

// Define the API URL from environment variables
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Set threshold for considering balances as settled
const BALANCE_THRESHOLD = 0.01;
/**
 * Renders settlement payment suggestions for users with unsettled balances, applying a treshold
 * Separates them into two groups, sorting them from highest to lowest unsettled balance. Suggests the highest possible
 * settling payment suggestion in each iteration and adds them to a settlement payment suggestion array
 * up until unsettled user balances equal the sum of all settlement payments suggestions in the array.
 * Then renders each settlement payment suggestion **/
const SettlementPaymentSuggestions = () => {
  // Get the active group code from local storage
  const groupCode = localStorage.getItem("activeGroupCode");

  // States for user details, loading error messages
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user details function, extract & format relevant data, then set the user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );

        const responseData = response.data;

        if (responseData.users && responseData.users.length > 0) {
          const userDetails = responseData.users.map((user) => {
            const userBalanceCalculated =
              user.totalExpensesPaidAmount +
              user.totalPaymentsMadeAmount -
              user.totalExpenseBenefittedAmount -
              user.totalPaymentsReceivedAmount;
            // Calculate and add userBalanceCalculated property
            return {
              ...user,
              userBalanceCalculated,
            };
          });

          // Apply balance threshold and treat balances as settled if within the threshold
          const unsettledUserDetails = userDetails.filter(
            (user) => Math.abs(user.userBalanceCalculated) > BALANCE_THRESHOLD
          );
          setUserDetails(unsettledUserDetails);
          setIsLoading(false); // Set loading to false after a successful fetch
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching data:", error);
        }
        setError(
          "An error occurred while fetching group users. Please try again later."
        );
        setIsLoading(false); // Set loading to false on error
      }
    };
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Separate users with positive and negative balances
  const positiveBalanceUsers = userDetails
    .filter((user) => user.userBalanceCalculated > 0)
    .map((user) => ({
      ...user,
    }));

  const negativeBalanceUsers = userDetails
    .filter((user) => user.userBalanceCalculated < 0)
    .map((user) => ({
      ...user,
    }));

  // Define settlements array to gather settlement payment suggestions
  const settlements = [];

  // Sort users with positive balance from highest to lowest
  positiveBalanceUsers.sort(
    (a, b) => b.userBalanceCalculated - a.userBalanceCalculated
  );

  // Sort users with negative balance from lowest to highest
  negativeBalanceUsers.sort(
    (a, b) => a.userBalanceCalculated - b.userBalanceCalculated
  );

  // Calculate settlement payment suggestions between users with negative and users with positive balance
  while (positiveBalanceUsers.length > 0 && negativeBalanceUsers.length > 0) {
    const creditor = positiveBalanceUsers[0];
    const debtor = negativeBalanceUsers[0];

    // Calculate the highest possible amount for a settlement payment between a user with positive and negative balance
    const amountToSettle = Math.min(
      Math.abs(debtor.userBalanceCalculated),
      creditor.userBalanceCalculated
    );

    // Add that settlement payment suggestion to settlements array
    settlements.push({
      from: debtor.userName,
      to: creditor.userName,
      amount: amountToSettle.toFixed(2),
    });

    // Update the userBalances after adding the settlement payment suggestion to settlements array
    creditor.userBalanceCalculated -= amountToSettle;
    debtor.userBalanceCalculated += amountToSettle;

    // Remove settled users
    if (creditor.userBalanceCalculated === 0) {
      positiveBalanceUsers.shift();
    }

    if (debtor.userBalanceCalculated === 0) {
      negativeBalanceUsers.shift();
    }
  }

  return (
    <div>
      <h2>Suggested payments {emojiConstants.payment}</h2>
      <ul>
        {settlements.map((settlement, index) => (
          <li key={index} className={styles.paymentSuggestions}>
            <span>
              {settlement.from} {emojiConstants.paymentsMade} {settlement.to}:
            </span>{" "}
            <span>
              <u>{settlement.amount}</u>€
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettlementPaymentSuggestions;
