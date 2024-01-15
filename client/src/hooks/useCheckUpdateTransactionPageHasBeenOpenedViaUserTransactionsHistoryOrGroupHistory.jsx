// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Hooks
import useGetPreviousRoutesFromLocalStorage from "./useGetPreviousRouteFromLocalStorage";

/**
 * Custom hook to check if the update payment or update expense page has been opened via UserTransactionsHistory or GroupHistory to rendered the appropriate InAppNavigation
 *
 * @returns {{
 *   openedViaGroupHistory: boolean,
 *   openedViaUserTransactionsHistory: boolean
 * }} Object containing flags indicating whether the page has been opened via GroupHistory or UserTransactionsHistory.
 */
const useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory =
  () => {
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
          previousRoute.includes("expense-page") ||
            previousRoute.includes("payment-page")
        );

        // Check if the page has been opened via UserTransactionsHistory
        setOpenedViaUserTransactionsHistory(
          nestedPreviousRoute.includes("/user-transaction-history/")
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

export default useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory;
