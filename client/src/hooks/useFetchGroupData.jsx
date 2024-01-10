// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching group data.
 *
 * @param {string} groupCode - The groupCode of the group to fetch data for
 * @returns {Object} - An object containing group information and potential error.
 * @property {Object|null} groupData - The fetched group data
 * @property {Error|null} error - The error object if an error occurred
 *
 */
const useFetchGroupData = (groupCode) => {
  const [groupData, setGroupData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/groups/${groupCode}`);
        const fetchedGroupData = response.data;
        devLog("GroupData fetched:", response);
        setGroupData(fetchedGroupData);
      } catch (error) {
        devLog("Error fetching group data:", error);
        setError(genericErrorMessage);
      }
    };

    fetchGroupData();
  }, [groupCode]);

  return { groupData, error };
};

export default useFetchGroupData;
