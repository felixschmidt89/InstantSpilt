import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../common/Spinner/Spinner";
import styles from "./RenderUserNames.module.css";
import { devLog } from "../../../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const RenderUserNames = ({ refreshData, groupCode }) => {
  const [userNames, setUserNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!groupCode) {
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const responseData = response.data;
        if (responseData.users && responseData.users.length > 0) {
          const userNames = responseData.users.map((user) => user.userName);
          setUserNames(userNames);
        }
        setError(null);
        setIsLoading(false);
      } catch (error) {
        devLog("Error fetching group users:", error);
        setError(
          "An error occurred while fetching group users. Please try again later."
        );
        setIsLoading(false);
      }
    };

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
};

export default RenderUserNames;
