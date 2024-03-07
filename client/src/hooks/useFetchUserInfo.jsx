// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching a user's data.
 *
 * @param {string} userId - The ID of the user to fetch data for.
 * @returns {Object} An object containing user data and potential error.
 * @property {Object|null} userData - The fetched user data.
 *  @property {boolean} isFetched - Indicates whether the user's data has been successfully fetched.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchUserData = (userId) => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const userData = response.data.user;
        devLog("User data fetched:", userData);
        setUserData(userData);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching user data:", error);
        setError(t("generic-error-message"));
      }
    };

    fetchUserData();
  }, [userId]);

  return { userData, isFetched, error };
};

export default useFetchUserData;
