import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import GroupActionsButton from "../../components/common/GroupActionsButton/GroupActionsButton";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import CreateExpense from "../../components/features/Expenses/CreateExpense/CreateExpense";
import styles from "./CreateExpensePage.module.css";

const CreateExpensePage = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-expense"} />

      {/* Render a back button */}
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h2 className={styles.header}>Add expense {emojiConstants.expense}</h2>
      {/* Conditional rendering based on isFetched */}
      {!isFetched ? (
        // Render a spinner while data is being fetched
        <Spinner />
      ) : groupMembers.length <= 1 ? (
        // Render a message and a button when there are no or only 1 group member
        <div>
          <p>You need at least 2 users to add an expense. </p>
          <GroupActionsButton
            route={"create-users-inapp"}
            buttonText={<span>{emojiConstants.user}</span>}
            tooltipText='add user'
          />
        </div>
      ) : (
        // Else render the expense form
        <CreateExpense groupMembers={groupMembers} groupCode={groupCode} />
      )}
    </main>
  );
};

export default CreateExpensePage;
