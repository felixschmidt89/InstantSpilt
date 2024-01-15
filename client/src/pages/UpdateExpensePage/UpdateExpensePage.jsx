// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

//  Hooks
import useExpenseUpdate from "../../hooks/useExpenseUpdate";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdateExpense from "../../components/features/Expenses/UpdateExpense/UpdateExpense";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Hooks
import useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";

// Styles
import styles from "./UpdateExpensePage.module.css";

function UpdateExpensePage() {
  const { groupCode, expenseId } = useParams();

  // Use custom hook to specify previous page to render appropriate InAppNavigation
  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory();

  // Use custom hook to manage expense update logic
  const { isLoading, expenseInfo, groupMembers } = useExpenseUpdate(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - update expense' />
      <PiratePx COUNT_IDENTIFIER={"update-expense"} />
      {isChecked && openedViaGroupHistory && (
        <InAppNavigationBar previousRoute={true} home={true} />
      )}
      {isChecked && openedViaUserTransactionsHistory && (
        <InAppNavigationBar nestedPreviousRoute={true} home={true} />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <h1 className={styles.header}>
              Update expense {emojiConstants.expense}
            </h1>
            <UpdateExpense
              groupCode={groupCode}
              groupMembers={groupMembers}
              expenseId={expenseId}
              expenseInfo={expenseInfo}
              route={`/instant-split`}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default UpdateExpensePage;
