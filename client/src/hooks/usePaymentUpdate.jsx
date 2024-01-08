import { useEffect, useState } from "react";
import useFetchGroupMembers from "./useFetchGroupMembers";
import useFetchPaymentInfo from "./useFetchPaymentInfo";

/**
 * Custom hook for handling payment update logic.
 *
 * @param {string} itemId - The ID of the payment item.
 * @param {string} userId - The ID of the user associated with the payment.
 * @returns {Object} - Object containing loading state, group code, payment information, payment error, and group members.
 */
const usePaymentUpdate = (itemId, userId) => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { paymentInfo, error: paymentError } = useFetchPaymentInfo(itemId);
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);

  // Effect to update loading status when paymentInfo and groupMembers are fetched
  useEffect(() => {
    if (paymentInfo && isFetched) {
      setIsLoading(false);
    }
  }, [paymentInfo, isFetched]);

  return {
    isLoading,
    groupCode,
    paymentInfo,
    paymentError,
    groupMembers,
  };
};

export default usePaymentUpdate;
