// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchExpenseInfo from "../../hooks/useFetchExpenseInfo";

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

const ExpenseDetailsPage = () => {
  const { groupCode, itemId } = useParams();
  const { expenseInfo, isFetched } = useFetchExpenseInfo(itemId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - expense details' />
      <PiratePx COUNT_IDENTIFIER={"expense-details"} />
      <InAppNavigation back={true} />
      <h1>Expense {emojiConstants.expense}</h1>
      {isFetched ? (
        <div>
          <RenderExpenseDetails expenseInfo={expenseInfo} />
          <RenderExpenseBeneficiaries
            expenseBeneficiaries={expenseInfo.expenseBeneficiaries}
          />
          <RenderResourceCreated createdAt={expenseInfo.createdAt} />
          <RouteButton
            route={`update-expense/${groupCode}/${itemId}`}
            buttonText={"update"}
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
