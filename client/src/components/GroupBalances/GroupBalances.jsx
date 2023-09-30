import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./GroupBalances.module.css";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function GroupBalances({ refreshData }) {
  const [userDetails, setUserDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const groupCode = localStorage.getItem("activeGroupCode");

    if (!groupCode) {
      return;
    }

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

    fetchUserDetails();
  }, [refreshData]);

  return (
    <div className={styles.balances}>
      <ul>
        {userDetails.map((user) => (
          <li key={user.userName}>
            <div>
              <strong>
                <Link to={`/user-page/${user.userId}`}>{user.userName}</Link>
              </strong>
            </div>
            {user.userBalance !== null && (
              <div>{user.userBalance.toFixed(2)}€</div>
            )}
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
}
