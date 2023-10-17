import React from "react";
import RenderExpenseForm from "../../components/containerComponents/RenderExpenseForm/RenderExpenseForm";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import GroupActionButton from "../../components/reuseableComponents/SplitExpensesActionsButton/SplitExpensesActionsButton";
import emojiConstants from "../../constants/emojiConstants";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import styles from "./CreateExpensePage.module.css";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";

export default function CreateExpensePage() {
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-expense"} />;
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
          <GroupActionButton
            route={"create-users-inapp"}
            buttonText={<span>{emojiConstants.user}</span>}
            tooltipText='add user'
          />
        </div>
      ) : (
        // Else render the payment form

        <RenderExpenseForm groupMembers={groupMembers} groupCode={groupCode} />
      )}
    </main>
  );
}
