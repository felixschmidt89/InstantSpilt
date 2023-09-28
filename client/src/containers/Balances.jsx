import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function Balances({ refreshData }) {
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
    <div>
      <h2>Balances</h2>
      <ul>
        {userDetails.map((user) => (
          <li key={user.userName}>
            <div>
              <strong>{user.userName}</strong>
            </div>
            {user.userBalance !== null && <div>{user.userBalance}€</div>}
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </div>
  );
}
