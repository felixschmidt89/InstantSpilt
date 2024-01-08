// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

//  Hooks
import usePaymentUpdate from "../../hooks/usePaymentUpdate";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdatePayment from "../../components/features/Payments/UpdatePayment/UpdatePayment";

// Styles
import styles from "./UpdatePaymentPage.module.css";

const UpdatePaymentPage = () => {
  const { itemId } = useParams();
  // Use custom hook to manage payment update logic
  const { isLoading, groupCode, paymentInfo, groupMembers } =
    usePaymentUpdate(itemId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - update payment' />
      <PiratePx COUNT_IDENTIFIER={"update-payment"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      <h2 className={styles.header}>Update payment {emojiConstants.payment}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <UpdatePayment
          groupMembers={groupMembers}
          groupCode={groupCode}
          paymentDetails={paymentInfo}
        />
      )}
    </main>
  );
};
export default UpdatePaymentPage;
