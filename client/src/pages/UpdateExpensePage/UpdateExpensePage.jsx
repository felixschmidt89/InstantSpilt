// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//  Hooks
import useExpenseUpdate from "../../hooks/useExpenseUpdate";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdateExpense from "../../components/features/Expenses/UpdateExpense/UpdateExpense";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./UpdateExpensePage.module.css";

function UpdateExpensePage() {
  const { groupCode, expenseId } = useParams();
  const { t } = useTranslation();

  // Use custom hook to identify user's previous route to render appropriate InAppNavigation
  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

  // Use custom hook to manage expense update logic
  const { isLoading, expenseInfo, groupMembers } = useExpenseUpdate(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title={t("update-expense-page-title")} />

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
          <h1 className={styles.header}>{t("update-expense-page-header")}</h1>
          <div className={styles.container}>
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
