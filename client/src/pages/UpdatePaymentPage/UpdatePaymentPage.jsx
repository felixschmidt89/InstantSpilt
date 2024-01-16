// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

//  Hooks
import usePaymentUpdate from "../../hooks/usePaymentUpdate";
import useDetermineUpdateTransactionPageOpeningSource from "../../hooks/useCheckUpdateTransactionPageHasBeenOpenedViaUserTransactionsHistoryOrGroupHistory";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import UpdatePayment from "../../components/features/Payments/UpdatePayment/UpdatePayment";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./UpdatePaymentPage.module.css";

const UpdatePaymentPage = () => {
  const { groupCode, paymentId } = useParams();

  // Use custom hook to identify user's previous route to render appropriate InAppNavigation
  const { isChecked, openedViaGroupHistory, openedViaUserTransactionsHistory } =
    useDetermineUpdateTransactionPageOpeningSource();

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
      <div className={styles.container}>
        <h2 className={styles.header}>
          Update payment {emojiConstants.payment}
        </h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.innerContainer}>
            <UpdatePayment
              groupMembers={groupMembers}
              groupCode={groupCode}
              paymentDetails={paymentInfo}
            />
          </div>
        )}
      </div>
    </main>
  );
};
export default UpdatePaymentPage;
