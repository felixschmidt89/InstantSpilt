import { useState, useEffect } from "react";
import axios from "axios";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching a user's data.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Object} An object containing user data and potential error.
 * @property {Object|null} userData - The fetched user data.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        const userData = response.data.user;
        devLog("User data fetched:", userData);
        setUserData(userData);
      } catch (error) {
        devLog("Error fetching user data:", error);
        setError(
          "An error occurred while fetching user data. Please try again later."
        );
      }
    }

    fetchUserData();
  }, [userId]);

  return { userData, error };
};

export default useFetchUserData;
