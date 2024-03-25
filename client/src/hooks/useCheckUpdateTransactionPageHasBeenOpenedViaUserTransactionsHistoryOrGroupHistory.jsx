// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "./useGetPreviousRouteFromLocalStorage";

/**
 * Custom hook to determine if the update payment or update expense page has been opened via UserTransactionsHistory or GroupHistory,
 * enabling the appropriate InAppNavigation rendering.
 *
 * @returns {{
 *   openedViaGroupHistory: boolean,
 *   openedViaUserTransactionsHistory: boolean,
 *   isChecked: boolean
 * }} Object with flags for page opening sources and a check status.
 */
const useDetermineUpdateTransactionPageOpeningSource = () => {
  const [openedViaGroupHistory, setOpenedViaGroupHistory] = useState(false);

  const [
    openedViaUserTransactionsHistory,
    setOpenedViaUserTransactionsHistory,
  ] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const { previousRoute, nestedPreviousRoute, isRetrieved } =
    useGetPreviousRoutesFromLocalStorage();

  useEffect(() => {
    if (isRetrieved) {
      // Check if the page has been opened via GroupHistory or PaymentPage
      setOpenedViaGroupHistory(
        previousRoute.includes("expense-details") ||
          previousRoute.includes("payment-details")
      );

      // Check if the page has been opened via UserTransactionsHistory
      setOpenedViaUserTransactionsHistory(
        nestedPreviousRoute.includes("/groupmember-transaction-history/")
      );
      setIsChecked(true);
    }
  }, [nestedPreviousRoute, previousRoute, isRetrieved]);

  return {
    openedViaGroupHistory,
    openedViaUserTransactionsHistory,
    isChecked,
  };
};

export default useDetermineUpdateTransactionPageOpeningSource;
