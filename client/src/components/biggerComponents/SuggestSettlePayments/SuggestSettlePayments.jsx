import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./SuggestSettlePayments.module.css";
import Spinner from "../../reuseableComponents/Spinner/Spinner";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function SuggestSettlePayments() {
  const groupCode = localStorage.getItem("activeGroupCode");

  // States for user details, loading error messages
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define fetch user details function, extract & format relevant data, set user details excluding those with (almost) 0 user balance (rounding hack).
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );

        const responseData = response.data.data;

        if (responseData.users && responseData.users.length > 0) {
          const userDetails = responseData.users
            .filter(
              (user) =>
                user.userBalance !== 0 &&
                user.userBalance !== 0.01 &&
                user.userBalance !== -0.01
            )
            .map((user) => ({
              userId: user._id,
              userName: user.userName,
              userBalance: user.userBalance,
            }));
          setUserDetails(userDetails);
        }
        setError(null);
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
    (user) => user.userBalance >= 0
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
        </div>
      )}
    </div>
  );
}
