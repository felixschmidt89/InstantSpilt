import { useEffect, useState } from "react";
import useFetchExpenseInfo from "./useFetchExpenseInfo";
import useFetchGroupMembers from "./useFetchGroupMembers";

/**
 * Custom hook for handling expense update logic.
 *
 * @param {string} expenseId - The ID of the expense to update.
 * @returns {Object} - Object containing relevant information and state for updating expenses.
 */
const useExpenseUpdate = (expenseId) => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { expenseInfo, error: expenseError } = useFetchExpenseInfo(expenseId);
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to set isLoading to true when expenseDetails are fetched
  useEffect(() => {
    if (expenseInfo && isFetched) {
      setIsLoading(false);
    }
  }, [expenseInfo, isFetched]);

  return {
    isLoading,
    groupCode,
    expenseInfo,
    groupMembers,
    expenseError,
  };
};

export default useExpenseUpdate;
