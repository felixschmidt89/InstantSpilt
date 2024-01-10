// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching a user's data.
 *
 * @param {string} userId - The ID of the user to fetch data for.
 * @returns {Object} An object containing user data and potential error.
 * @property {Object|null} userData - The fetched user data.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const userData = response.data.user;
        devLog("User data fetched:", userData);
        setUserData(userData);
      } catch (error) {
        devLog("Error fetching user data:", error);
        setError(genericErrorMessage);
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, error };
};

export default useFetchUserData;
