import { useState, useEffect } from "react";
import axios from "axios";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for fetching expense information.
 *
 * @param {string} expenseId - The ID of the expense to fetch.
 * @returns {Object} An object containing expense information and potential error.
 * @property {Object|null} expenseInfo - The fetched expense information.
 * @property {string|null} error - An error message in case of an error during fetching.
 */
const useFetchExpenseInfo = (expenseId) => {
  const [expenseInfo, setExpenseInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExpenseInfo() {
      try {
        const response = await axios.get(`${apiUrl}/expenses/${expenseId}`);
        const expenseData = response.data.expense;
        devLog("Expense info fetched:", response);
        setExpenseInfo(expenseData);
      } catch (error) {
        devLog("Error fetching expense info:", error);
        setError(
          "An error occurred while fetching expense info. Please try again later."
        );
      }
    }

    fetchExpenseInfo();
  }, [expenseId]);

  return { expenseInfo, error };
};

export default useFetchExpenseInfo;
