// React and Third-Party Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Constants and Utils
import emojiConstants from "../../constants/emojiConstants";

// Hooks
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import useFetchGroupCurrency from "../../hooks/useFetchGroupCurrency";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import RenderPaymentDetails from "../../components/features/Payments/RenderPaymentDetails/RenderPaymentDetails";
import RenderResourceCreated from "../../components/common/RenderResourceCreated/RenderResourceCreated";
import Emoji from "../../components/common/Emoji/Emoji";

// Styles
import styles from "./PaymentDetailsPage.module.css";

const PaymentDetailsPage = () => {
  const { groupCode, itemId } = useParams();
  const { paymentInfo, isFetched: paymentInfoIsFetched } =
    useFetchPaymentInfo(itemId);
  const { groupCurrency, isFetched: currencyInfoIsFetched } =
    useFetchGroupCurrency(groupCode);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - payment details' />
      <PiratePx COUNT_IDENTIFIER={"payment-details"} />
      <InAppNavigationBar back={true} />
      {paymentInfoIsFetched && currencyInfoIsFetched ? (
        <div className={styles.container}>
          <h1>
            payment details{" "}
            <Emoji
              label={"payment emoji"}
              emoji={emojiConstants.payment}></Emoji>
          </h1>
          <RenderPaymentDetails
            groupCode={groupCode}
            paymentInfo={paymentInfo}
            groupCurrency={groupCurrency}
          />
          <RenderResourceCreated createdAt={paymentInfo.createdAt} />
          <RouteButton
            route={`update-payment/${groupCode}/${itemId}`}
            buttonText={"update"}
            setPreviousRoute={true}
          />
          <DeleteResource resourceId={itemId} resourceType='payments' />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default PaymentDetailsPage;
