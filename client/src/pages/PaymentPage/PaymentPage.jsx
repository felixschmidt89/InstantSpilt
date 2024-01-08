import React from "react";
import { useParams, Link } from "react-router-dom";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import emojiConstants from "../../constants/emojiConstants";
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import NavigateButton from "../../components/common/NavigateButton/NavigateButton";
import Spinner from "../../components/common/Spinner/Spinner";
import DeleteResourceButton from "../../components/common/DeleteResourceButton/DeleteResourceButton";
import RouteButton from "../../components/common/RouteButton/RouteButton";
import styles from "./PaymentPage.module.css";

const PaymentPage = () => {
  const { itemId } = useParams();
  const { paymentInfo, error } = useFetchPaymentInfo(itemId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - payment details' />
      <PiratePx COUNT_IDENTIFIER={"payment-page"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      {paymentInfo ? (
        <div className={styles.container}>
          <h1>Payment {emojiConstants.payment}</h1>
          <h2>{paymentInfo.paymentAmount.toFixed(2)}€</h2>
          <p>
            <Link to={`/user-page/${paymentInfo.paymentMaker._id}`}>
              {paymentInfo.paymentMaker.userName}
            </Link>{" "}
            {emojiConstants.paymentsMade}{" "}
            <Link to={`/user-page/${paymentInfo.paymentRecipient._id}`}>
              {paymentInfo.paymentRecipient.userName}
            </Link>{" "}
          </p>
          <p>
            {emojiConstants.created}{" "}
            {new Date(paymentInfo.createdAt).toLocaleString()}
          </p>
          <RouteButton route={`update-payment/${itemId}`} />

          <DeleteResourceButton resourceId={itemId} resourceType='payments' />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default PaymentPage;
