// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

//  Hooks
import useExpenseUpdate from "../../hooks/useExpenseUpdate";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdateExpense from "../../components/features/Expenses/UpdateExpense/UpdateExpense";

// Styles
import styles from "./UpdateExpensePage.module.css";

function UpdateExpensePage() {
  const { expenseId } = useParams();
  // Use custom hook to manage expense update logic
  const { isLoading, groupCode, expenseInfo, groupMembers } =
    useExpenseUpdate(expenseId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - update expense' />
      <PiratePx COUNT_IDENTIFIER={"update-expense-page"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
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
              route={`/instant-split`}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default UpdateExpensePage;
