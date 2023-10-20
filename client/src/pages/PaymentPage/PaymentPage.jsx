import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import emojiConstants from "../../constants/emojiConstants";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import DeleteResourceButton from "../../components/reuseableComponents/DeleteResourceButton/DeleteResourceButton";
import HelmetMetaTagsNetlify from "../../components/reuseableComponents/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import styles from "./PaymentPage.module.css";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import PiratePx from "../../components/reuseableComponents/PiratePx/PiratePx";
import RouteButton from "../../components/reuseableComponents/RouteButton/RouteButton";

const PaymentPage = () => {
  const { itemId } = useParams();
  const paymentDetails = useFetchPaymentInfo(itemId);

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - Payment details' />
      <PiratePx COUNT_IDENTIFIER={"payment-page/:itemId"} />
      <NavigateButton
        route={"instant-split"}
        buttonText={faLeftLong}
        alignment={"left"}
        isIcon={true}
      />
      {paymentDetails ? (
        <div>
          <h1>Payment {emojiConstants.payment}</h1>
          <h2>{paymentDetails.paymentAmount.toFixed(2)}€</h2>
          <p>
            <Link to={`/user-page/${paymentDetails.paymentMaker._id}`}>
              {paymentDetails.paymentMaker.userName}
            </Link>{" "}
            {emojiConstants.paymentsMade}{" "}
            <Link to={`/user-page/${paymentDetails.paymentRecipient._id}`}>
              {paymentDetails.paymentRecipient.userName}
            </Link>{" "}
          </p>
          <p>
            {emojiConstants.created}{" "}
            {new Date(paymentDetails.createdAt).toLocaleString()}
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
