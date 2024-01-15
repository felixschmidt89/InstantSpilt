// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

//  Hooks
import usePaymentUpdate from "../../hooks/usePaymentUpdate";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdatePayment from "../../components/features/Payments/UpdatePayment/UpdatePayment";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Hooks
import useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";

// Styles
import styles from "./UpdatePaymentPage.module.css";

const UpdatePaymentPage = () => {
  const { groupCode, paymentId } = useParams();

  // Use custom hook to specify previous page to render appropriate InAppNavigation
  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory();

  // Use custom hook to manage payment update logic
  const { isLoading, paymentInfo, groupMembers } = usePaymentUpdate(paymentId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - update payment' />
      <PiratePx COUNT_IDENTIFIER={"update-payment"} />
      {isChecked && openedViaGroupHistory && (
        <InAppNavigationBar previousRoute={true} home={true} />
      )}
      {isChecked && openedViaUserTransactionsHistory && (
        <InAppNavigationBar nestedPreviousRoute={true} home={true} />
      )}
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
