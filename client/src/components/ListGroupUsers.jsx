import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function ListGroupUsers({ refreshData }) {
  const [userNames, setUserNames] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getUsers() {
      try {
        const groupObjectId = localStorage.getItem("activeGroupObjectId");
        const response = await axios.get(
          `${apiUrl}/users/byGroupObjectId/${groupObjectId}`
        );
        const responseData = response.data;
        if (responseData.users && responseData.users.length > 0) {
          const names = responseData.users.map((user) => user.userName);
          setUserNames(names);
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

    getUsers();
  }, [refreshData]);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul style={{ listStyleType: "none" }}>
        {userNames.map((userName) => (
          <li key={userName}>{userName}</li>
        ))}
      </ul>
    </div>
  );
}
