import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./GroupBalances.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function GroupBalances() {
  const groupCode = localStorage.getItem("activeGroupCode");

  // States for user details and error messages
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);

  // Define fetch user details function, extract & format relevant data, then set the user details
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        // Make a GET request to the API to get user data by group code
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );

        const responseData = response.data.data;

        if (responseData.users && responseData.users.length > 0) {
          const userDetails = responseData.users.map((user) => ({
            userId: user._id,
            userName: user.userName,
            userBalance: user.userBalance,
          }));
          setUserDetails(userDetails);
        }
        setError(null);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching data:", error);
        }
        setError(
          "An error occurred while fetching group users. Please try again later."
        );
      }
    }

    // Call the fetchUserDetails function
    fetchUserDetails();
  }, [groupCode]); // Include groupCode in the dependency array

  // Render user details, link to user pages and any error message
  return (
    <div className={styles.balances}>
      <ul>
        {userDetails.map((user) => (
          <li key={user.userId} className={styles.userListItem}>
            <div className={styles.userDetails}>
              <strong>
                {/* Link to the user page with user-specific URL */}
                <Link
                  className={styles.userName}
                  to={`/user-page/${user.userId}`}>
                  {user.userName}
                </Link>
              </strong>
              {/* Visually indicate negative userBalance by rendering it in a different color */}
              <div
                className={`${styles.userBalance} ${
                  user.userBalance >= 0
                    ? styles.positiveBalance
                    : styles.negativeBalance
                }`}>
                {user.userBalance.toFixed(2)}€
              </div>
            </div>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}{" "}
      {/* Display error message if there's an error */}
    </div>
  );
}
