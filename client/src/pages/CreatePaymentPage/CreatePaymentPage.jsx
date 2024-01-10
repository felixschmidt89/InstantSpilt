// React and Third-Party Libraries
import React from "react";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchGroupMembers from "../../hooks/useFetchGroupMembers";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import CreatePayment from "../../components/features/Payments/CreatePayment/CreatePayment";
import CreateUserCTA from "../../components/common/CreateUserCTA/CreateUserCTA";

// Styles
import styles from "./CreatePaymentPage.module.css";

const CreatePaymentPage = () => {
  // Define states for paymentAmount, userName, paymentRecipient, and error message
  const groupCode = localStorage.getItem("activeGroupCode");
  const { groupMembers, isFetched } = useFetchGroupMembers(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - add payment' />
      <PiratePx COUNT_IDENTIFIER={"create-payment"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h2 className={styles.header}>Add payment {emojiConstants.payment}</h2>
      {!isFetched ? (
        <Spinner />
      ) : // Check if there are at least 2 group members
      groupMembers.length <= 1 ? (
        <CreateUserCTA />
      ) : (
        <CreatePayment groupMembers={groupMembers} groupCode={groupCode} />
      )}
    </main>
  );
};

export default CreatePaymentPage;
