// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Hooks
import useFetchGroupMembers from "./useFetchGroupMembers";
import useFetchPaymentInfo from "./useFetchPaymentInfo";

/**
 * Custom hook for handling payment update logic.
 *
 * @param {string} paymentId - The ID of the payment item to update.
 * @returns {Object} - Object containing group code, payment information, fetching errors, and group members.
 * @property {boolean} isLoading - Indicates whether the payment details and group members are being fetched.
 * @property {string} groupCode - The groupCode of the active group associated with the payment.
 * @property {Object|null} paymentInfo - The fetched payment details.
 * @property {string[]} groupMembers - Array of group members' usernames.
 * @property {string|null} fetchPaymentError - An error message in case of an error during fetching payment details.
 * @property {string|null} fetchGroupMembersError - An error message in case of an error during fetching group members.
 */
const usePaymentUpdate = (paymentId) => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { paymentInfo, error: fetchPaymentError } =
    useFetchPaymentInfo(paymentId);
  const { groupMembers, error: fetchGroupMembersError } =
    useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to update loading status when paymentInfo and groupMembers are fetched
  useEffect(() => {
    if (paymentInfo && groupMembers) {
      setIsLoading(false);
    }
  }, [paymentInfo, groupMembers]);

  return {
    isLoading,
    groupCode,
    paymentInfo,
    groupMembers,
    fetchPaymentError,
    fetchGroupMembersError,
  };
};

export default usePaymentUpdate;
