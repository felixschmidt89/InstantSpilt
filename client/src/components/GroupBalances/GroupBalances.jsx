import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./GroupBalances.module.css";
import Spinner from "../reuseableComponents/Spinner/Spinner";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function GroupBalances() {
  const groupCode = localStorage.getItem("activeGroupCode");

  // States for user details, loading error messages
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
            userBalance: user.userBalance,
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
  }, [groupCode]); // Include groupCode in the dependency array

  // Render spinner while loading then render user details,  link to user pages, and any error message
  return (
    <div className={styles.balances}>
      {isLoading ? ( // Display Spinner while loading
        <Spinner />
      ) : (
        <ul>
          {userDetails.map((user) => (
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
                {/* Visually indicate negative userBalance by rendering it in a different color */}
                <div
                  className={`${styles.userBalance} ${
                    user.userBalance >= 0
                      ? styles.positiveBalance
                      : styles.negativeBalance
                  }`}>
                  {user.userBalance === 0.01
                    ? "0.00€"
                    : user.userBalance.toFixed(2) + "€"}{" "}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}{" "}
      {/* Display error message if there's an error */}
    </div>
  );
}
