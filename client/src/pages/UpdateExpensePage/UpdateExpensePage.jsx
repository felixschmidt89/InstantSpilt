import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RenderExpenseUpdateForm from "../../components/containerComponents/RenderExpenseUpdateForm/RenderExpenseUpdateForm";

import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import emojiConstants from "../../constants/emojiConstants";
import useFetchExpenseInfo from "../../hooks/uesFetchExpenseInfo";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import styles from "./UpdateExpensePage.module.css";

function UpdateExpensePage() {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { expenseId } = useParams();
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
      {/* Render a back button */}
      <NavigateButton
        route={"instant-split"}
        buttonText={"⬅"}
        alignment={"left"}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles.container}>
            <h1 className={styles.header}>
              Update expense {emojiConstants.expense}
            </h1>
            <RenderExpenseUpdateForm
              expenseInfo={expenseInfo}
              groupCode={groupCode}
              groupMembers={groupMembers}
              expenseId={expenseId}
            />
          </div>
        </>
      )}
    </main>
  );
}

export default UpdateExpensePage;
