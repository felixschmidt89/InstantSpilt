// React and Third-Party Libraries
import { useState, useEffect } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching group currency.
 *
 * @param {string} groupCode - The groupCode of the group to fetch data for
 * @returns {Object} - An object containing group currency and potential error.
 * @property {string|null} groupCurrency - The fetched group currency value
 * @property {boolean} isFetched - Indicates whether the group data has been successfully fetched.
 * @property {Error|null} error - The error object if an error
 */
const useFetchGroupCurrency = (groupCode) => {
  const [groupCurrency, setGroupCurrency] = useState(null);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupCurrency = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/currency/${groupCode}`
        );

        const { data, status } = response;

        if (status === StatusCodes.NO_CONTENT) {
          devLog("No group found for groupCode:", groupCode);
          setIsFetched(true);
          return;
        }

        devLog("Group currency fetched:", data);
        setGroupCurrency(data.currency);
        setIsFetched(true);
      } catch (error) {
        devLog("Error fetching group currency:", error);
        setError(genericErrorMessage);
      }
    };

    fetchGroupCurrency();
  }, [groupCode]);

  return { groupCurrency, isFetched, error };
};

export default useFetchGroupCurrency;
