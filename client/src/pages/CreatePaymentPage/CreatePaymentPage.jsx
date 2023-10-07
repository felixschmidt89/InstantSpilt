import React from "react";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import styles from "./CreatePaymentPage.module.css";
import emojiConstants from "../../constants/emojiConstants";

import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import RenderPaymentForm from "../../components/containerComponents/RenderPaymentForm/RenderPaymentForm";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import GroupActionButton from "../../components/reuseableComponents/SplitExpensesActionsButton/SplitExpensesActionsButton";

export default function CreatePaymentPage() {
  // Define states for paymentAmount, userName, paymentRecipient, and error message
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  console.log(groupMembers);

  // Conditional rendering based on isFetched
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Add payment' />
      {/* Render a back button */}
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />

      <h2 className={styles.header}>Add payment {emojiConstants.payment}</h2>

      {/* Conditional rendering based on isFetched */}
      {!isFetched ? (
        // Render a spinner while data is being fetched
        <Spinner />
      ) : groupMembers.length <= 1 ? (
        // Render a message and a button when there are no or only 1 group member
        <div>
          <p>You need at least 2 users to make a payment. </p>
          <GroupActionButton
            route={"create-users-inapp"}
            buttonText={<span>{emojiConstants.user}</span>}
            tooltipText='add user'
          />
        </div>
      ) : (
        // Else render the payment
        <RenderPaymentForm groupMembers={groupMembers} groupCode={groupCode} />
      )}
    </main>
  );
}