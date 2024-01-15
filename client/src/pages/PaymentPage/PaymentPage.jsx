import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";

import Spinner from "../../components/common/Spinner/Spinner";
import RouteButton from "../../components/common/InAppNavigation/RouteButton/RouteButton";
import styles from "./PaymentPage.module.css";
import DeleteResource from "../../components/common/DeleteResource/DeleteResource";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

const PaymentPage = () => {
  const { groupCode, itemId } = useParams();
  const { paymentInfo } = useFetchPaymentInfo(itemId);

  console.log(paymentInfo);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - payment details' />
      <PiratePx COUNT_IDENTIFIER={"payment-details"} />
      <InAppNavigationBar back={true} />
      {paymentInfo ? (
        <div className={styles.container}>
          <h1>Payment {emojiConstants.payment}</h1>
          <h2>{paymentInfo.paymentAmount.toFixed(2)}€</h2>
          <p>
            <Link
              to={`/user-page/${groupCode}/${paymentInfo.paymentMaker._id}`}>
              {paymentInfo.paymentMaker.userName}
            </Link>{" "}
            {emojiConstants.paymentsMade}{" "}
            <Link
              to={`/user-page/${groupCode}/${paymentInfo.paymentRecipient._id}`}>
              {paymentInfo.paymentRecipient.userName}
            </Link>{" "}
          </p>
          <p>
            {emojiConstants.created}{" "}
            {new Date(paymentInfo.createdAt).toLocaleString()}
          </p>
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

export default PaymentPage;
