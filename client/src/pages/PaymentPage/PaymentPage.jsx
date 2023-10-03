import React from "react";
import { useParams, Link } from "react-router-dom";
import NavigateButton from "../../components/NavigateButton/NavigateButton";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import emojiConstants from "../../constants/emojiConstants";
import DeleteResourceButton from "../../components/DeleteResourceButton/DeleteResourceButton";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import SuggestSettlePayments from "../../components/biggerComponents/SuggestSettlePayments/SuggestSettlePayments";

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
            <strong>
              <Link to={`/user-page/${paymentDetails.paymentMaker._id}`}>
                {paymentDetails.paymentMaker.userName}
              </Link>
            </strong>{" "}
            {emojiConstants.paymentsMade}{" "}
            <strong>
              <Link to={`/user-page/${paymentDetails.paymentRecipient._id}`}>
                {paymentDetails.paymentRecipient.userName}
              </Link>
            </strong>{" "}
          </p>
          <p>
            {emojiConstants.created}{" "}
            {new Date(paymentDetails.createdAt).toLocaleString()}
          </p>
          {/* <p>Updated: {new Date(paymentDetails.updatedAt).toLocaleString()}</p> */}
          <DeleteResourceButton resourceId={itemId} resourceType='payments' />
        </div>
      ) : (
        <Spinner />
      )}
      <SuggestSettlePayments />
    </main>
  );
};

export default PaymentPage;
