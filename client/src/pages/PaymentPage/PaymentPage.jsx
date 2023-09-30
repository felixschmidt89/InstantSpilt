import React from "react";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import emojiConstants from "../../constants/emojiConstants";

const PaymentPage = () => {
  const { itemId } = useParams();
  const paymentDetails = useFetchPaymentInfo(itemId);

  return (
    <main>
      <NavigateButton
        route={"instant-split"}
        buttonText={"back"}
        alignment={"left"}
      />

      {paymentDetails ? (
        <div>
          <h1>Payment {emojiConstants.payment}</h1>
          <h2>{paymentDetails.paymentAmount.toFixed(2)}€</h2>
          <p>
            {paymentDetails.paymentMaker.userName} {emojiConstants.paymentsMade}{" "}
            {paymentDetails.paymentRecipient.userName}{" "}
          </p>
          <p></p>
          <p>
            {emojiConstants.created}{" "}
            {new Date(paymentDetails.createdAt).toLocaleString()}
          </p>
          {/* <p>Updated: {new Date(paymentDetails.updatedAt).toLocaleString()}</p> */}
        </div>
      ) : (
        <p>Loading payment details...</p>
      )}
    </main>
  );
};

export default PaymentPage;
