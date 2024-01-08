import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import emojiConstants from "../../constants/emojiConstants";
import useFetchExpenseInfo from "../../hooks/useFetchExpenseInfo";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import styles from "./UpdateExpenseUserPage.module.css";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import UpdateExpense from "../../components/features/Expenses/UpdateExpense/UpdateExpense";

function UpdateUserExpensePage() {
  const { userId, expenseId } = useParams();
  const groupCode = localStorage.getItem("activeGroupCode");
  const expenseInfo = useFetchExpenseInfo(expenseId);
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect to set isLoading to true when expenseDetails are fetched
  useEffect(() => {
    if (expenseInfo && isFetched) {
      setIsLoading(false);
    }
  }, [expenseInfo, isFetched]);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Update expense' />
      <PiratePx COUNT_IDENTIFIER={"update-expense"} />
      {/* Render a back button */}
      <NavigateButton
        route={`user-history/${userId}`}
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
              route={`/user-history/${userId}`}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default UpdateUserExpensePage;
