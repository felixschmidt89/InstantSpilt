// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchExpenseInfo from "../../hooks/useFetchExpenseInfo";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

//Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import RenderExpenseBeneficiaries from "../../components/features/Expenses/RenderExpenseBeneficiaries/RenderExpenseBeneficiaries";
import RenderExpenseDetails from "../../components/features/Expenses/RenderExpenseDetails/RenderExpenseDetails";
import RenderResourceCreated from "../../components/common/RenderResourceCreated/RenderResourceCreated";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigation from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./ExpenseDetailsPage.module.css";

const ExpenseDetailsPage = () => {
  const { groupCode, itemId } = useParams();
  const { expenseInfo, isFetched: expenseInfoIsFetched } =
    useFetchExpenseInfo(itemId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - expense details' />
      <PiratePx COUNT_IDENTIFIER={"expense-details"} />
      <InAppNavigation back={true} />
      {expenseInfoIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <h1>
            {emojiConstants.expense} {expenseInfo.expenseDescription}
          </h1>
          <div className={styles.detailsBox}>
            <RenderExpenseDetails
              expenseInfo={expenseInfo}
              groupCurrency={groupCurrency}
              expenseAmountPerBeneficiary={
                expenseInfo.expenseAmountPerBeneficiary
              }
              expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
            />
            <RenderExpenseBeneficiaries
              expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
            />
            <RenderResourceCreated
              createdAt={expenseInfo.createdAt}
              updatedAt={expenseInfo.updatedAt}
            />
          </div>
          <RouteButton
            route={`update-expense/${groupCode}/${itemId}`}
            buttonText={"edit expense"}
            setPreviousRoute={true}
          />
          <DeleteResource resourceId={itemId} resourceType='expenses' />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default ExpenseDetailsPage;
