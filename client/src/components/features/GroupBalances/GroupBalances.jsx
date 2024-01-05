// DONE adding only meaningful necessary comments

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import emojiConstants from "../../../constants/emojiConstants";
import Spinner from "../../common/Spinner/Spinner";
import PiratePx from "../../common/PiratePx/PiratePx";
import styles from "./GroupBalances.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

// Set threshold for considering balances as settled (for certain rounding situations, e.g., 10€ to be split among 3 users.)
const BALANCE_THRESHOLD = 0.01;

/**
 * Displays each group members balance.
 * Fetches user details, formats the data, handles rounding of edge case and renders the balances.
 */
export default function GroupBalances() {
  const groupCode = localStorage.getItem("activeGroupCode");

  // States for user details, loading status and error messages
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
            userBalance:
              // Check if the absolute value of userBalance is less than or equal to the defined threshold
              Math.abs(user.userBalance) <= BALANCE_THRESHOLD
                ? 0 // If true, set userBalance to 0 to treat such edge cases as settled
                : +parseFloat(user.userBalance).toFixed(2), // round to 2 decimal places
          }));
          setUserDetails(userDetails);
        }
        setError(null);
        setIsLoading(false); // Set loading to false when data is fetched
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
  // Render spinner while loading then render user details,  link to user pages, and any error message
  return isLoading ? (
    <div className={styles.spinner}>
      <Spinner />
      <PiratePx COUNT_IDENTIFIER={"group-balances"} />
    </div>
  ) : (
    <div className={styles.balancesContainer}>
      {userDetails.length > 0 ? (
        <ul>
          {userDetails.map((user) => (
            <li key={user.userId} className={styles.userListItem}>
              <div className={styles.userDetails}>
                <div className={styles.leftColumn}>
                  {/* Link to the user page */}
                  <Link
                    className={styles.userName}
                    to={`/user-page/${user.userId}`}>
                    {user.userName}
                  </Link>
                </div>
                <div className={styles.rightColumn}>
                  {/* Visually indicate negative userBalance by setting different CSS classes and later rendering it in a different color */}
                  <div
                    className={`${styles.userBalance} ${
                      user.userBalance >= 0
                        ? styles.positiveBalance
                        : styles.negativeBalance
                    }`}>
                    {/* Fix remaining rounding issue in certain settings, e.g., 100€/3 will result in 33.33, 33.33, 33.4 */}
                    {user.userBalance === 0.01
                      ? "0.00€"
                      : user.userBalance.toFixed(2) + "€"}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // Display a message if there are no users
        <p className={styles.failMessage}>
          Add users{" "}
          <span className={styles.emojiParanthesis}>
            ({emojiConstants.user})
          </span>{" "}
          below 👇 to start settling expenses .
        </p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
