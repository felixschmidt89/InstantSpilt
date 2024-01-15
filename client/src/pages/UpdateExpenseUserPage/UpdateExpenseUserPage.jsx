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

// Styles
import styles from "./UpdateExpenseUserPage.module.css";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

/**
 * Page for updating an expense via user history page.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */
function UserHistoryUpdateExpensePage() {
  const { userId, expenseId } = useParams();
  // Use custom hook to manage expense update logic
  const { isLoading, groupCode, expenseInfo, groupMembers } =
    useExpenseUpdate(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - update expense' />
      <PiratePx COUNT_IDENTIFIER={"user-transaction-history-update-expense"} />
      <InAppNavigationBar nestedPreviousRoute={true} home={true} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <h1 className={styles.header}>
              Update expense {emojiConstants.expense}
            </h1>
            <UpdateExpense
              expenseInfo={expenseInfo}
              groupCode={groupCode}
              groupMembers={groupMembers}
              expenseId={expenseId}
              route={`/user-transaction-history/${userId}`}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default UserHistoryUpdateExpensePage;
