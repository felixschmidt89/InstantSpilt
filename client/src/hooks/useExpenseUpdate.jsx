// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Hooks
import useFetchExpenseInfo from "./useFetchExpenseInfo";
import useFetchGroupMembers from "./useFetchGroupMembers";

/**
 * Custom hook for handling expense update logic.
 *
 * @param {string} expenseId - The ID of the expense to update.
 * @returns {Object} - Object containing group code, expense information, fetching errors, and group members.
 * @property {boolean} isLoading - Indicates whether the expense details and group members are being fetched.
 * @property {string} groupCode - The groupCode of the active group associated with the expense.
 * @property {Object|null} expenseInfo - The fetched expense details
 * @property {string[]} groupMembers - Array of group members' usernames.
 * @property {string|null} fetchExpenseError - An error message in case of an error during fetching expense details.
 * @property {string|null} fetchGroupMembersError - An error message in case of an error during fetching group members.
 */
const useExpenseUpdate = (expenseId) => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { expenseInfo, error: fetchExpenseError } =
    useFetchExpenseInfo(expenseId);
  const { groupMembers, error: fetchGroupMembersError } =
    useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to set isLoading to true when expenseDetails are fetched
  useEffect(() => {
    if (expenseInfo && groupMembers) {
      setIsLoading(false);
    }
  }, [expenseInfo, groupMembers]);

  return {
    isLoading,
    groupCode,
    expenseInfo,
    groupMembers,
    fetchGroupMembersError,
    fetchExpenseError,
  };
};

export default useExpenseUpdate;
