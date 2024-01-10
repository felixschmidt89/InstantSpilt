// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching group members.
 *
 * @param {string} groupCode - The groupCode of the group to fetch members for.
 * @returns {Object} - Object containing group members and fetch status.
 * @property {string[]} groupMembers - Array of group members' usernames.
 * @property {Error|null} error - The error object if an error occurred during fetching, otherwise null.
 */
const useFetchGroupMembers = (groupCode) => {
  const [groupMembers, setGroupMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/users/byGroupCode/${groupCode}`
        );
        const userData = response.data.users;
        const userNames = userData.map((user) => user.userName);
        devLog("Group members fetched:", response);
        setGroupMembers(userNames);
      } catch (error) {
        devLog("Error fetching group members:", error);
        setError(genericErrorMessage);
      }
    };

    fetchGroupMembers();
  }, [groupCode]);

  return { groupMembers, error };
};

export default useFetchGroupMembers;
