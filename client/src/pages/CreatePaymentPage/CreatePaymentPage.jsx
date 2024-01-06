import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import RenderPaymentForm from "../../components/features/CreatePayment/CreatePayment";
import GroupActionsButton from "../../components/common/GroupActionsButton/GroupActionsButton";
import styles from "./CreatePaymentPage.module.css";

const CreatePaymentPage = () => {
  // Define states for paymentAmount, userName, paymentRecipient, and error message
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  console.log(groupMembers);

  // Conditional rendering based on isFetched
  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-payment"} />

      {/* Render a back button */}
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
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
          <GroupActionsButton
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
};

export default CreatePaymentPage;
