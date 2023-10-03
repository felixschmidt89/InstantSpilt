import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./RenderUserNames.module.css";
import Spinner from "../reuseableComponents/Spinner/Spinner";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export default function RenderUserNames({ refreshData }) {
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          const userNames = responseData.users.map((user) => user.userName);
          setUserNames(userNames);
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
        setIsLoading(false);
      }
    }

    fetchUserDetails();
  }, [refreshData]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={styles.userList}>
          {userNames.map((userName) => (
            <li key={userName}>
              <div>
                <strong>{userName}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
