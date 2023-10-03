import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./SuggestSettlePayments.module.css";
import Spinner from "../../reuseableComponents/Spinner/Spinner";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Set threshold for considering balances as settled (for certain rounding situations, e.g., 10€ to be split among 3 users.)
const BALANCE_THRESHOLD = 0.01;

export default function SuggestSettlePayments() {
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
          const userDetails = responseData.users.map((user) => ({
            userId: user._id,
            userName: user.userName,
            userBalance: +parseFloat(user.userBalance).toFixed(2), // round to 2 decimal places
          }));

          // Apply the balance threshold and treat balances as settled if within the threshold
          const unsettledUserDetails = userDetails.filter(
            (user) => Math.abs(user.userBalance) > BALANCE_THRESHOLD
          );
          setUserDetails(unsettledUserDetails);
        } else {
          // If there are no users with unsettled expenses, display a message.
          setUserDetails([]); // Clear userDetails
        }
        setIsLoading(false);
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

    // Call the fetchUserDetails function
    fetchUserDetails();
  }, [groupCode]);

  // Separate users with positive and negative balances
  const positiveBalanceUsers = userDetails.filter(
    (user) => user.userBalance > 0
  );
  const negativeBalanceUsers = userDetails.filter(
    (user) => user.userBalance < 0
  );

  // Render spinner while loading then render user details, link to user pages
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
            // Display a message when there are no users
            <p>All settled. 🤝</p>
          ) : (
            <>
              <h2>Needs to pay back:</h2>
              <ul>
                {negativeBalanceUsers.map((user) => (
                  <li key={user.userId} className={styles.userListItem}>
                    <div className={styles.userDetails}>
                      <strong>
                        {/* Link to the user page */}
                        <Link
                          className={styles.userName}
                          to={`/user-page/${user.userId}`}>
                          {user.userName}
                        </Link>
                      </strong>
                      <span className={styles.separator}>owes:</span>
                      <div
                        className={`${styles.userBalance} ${styles.negativeBalance}`}>
                        {Math.abs(user.userBalance).toFixed(2)}€
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <h2>Should get paid:</h2>
              <ul>
                {positiveBalanceUsers.map((user) => (
                  <li key={user.userId} className={styles.userListItem}>
                    <div className={styles.userDetails}>
                      <strong>
                        {/* Link to the user page */}
                        <Link
                          className={styles.userName}
                          to={`/user-page/${user.userId}`}>
                          {user.userName}
                        </Link>
                      </strong>
                      <span className={styles.separator}>is owed:</span>
                      <div
                        className={`${styles.userBalance} ${styles.positiveBalance}`}>
                        {user.userBalance.toFixed(2)}€
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
