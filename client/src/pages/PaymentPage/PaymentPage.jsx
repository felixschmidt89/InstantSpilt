import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchPaymentInfo from "../../hooks/useFetchPaymentInfo";
import emojiConstants from "../../constants/emojiConstants";
import Spinner from "../../components/reuseableComponents/Spinner/Spinner";
import NavigateButton from "../../components/reuseableComponents/NavigateButton/NavigateButton";
import DeleteResourceButton from "../../components/reuseableComponents/DeleteResourceButton/DeleteResourceButton";
import { Helmet } from "react-helmet-async";

const PaymentPage = () => {
  const { itemId } = useParams();
  const paymentDetails = useFetchPaymentInfo(itemId);

  return (
    <main>
      <Helmet>
        <title>
          InstantSplit - Payment <details></details>
        </title>
      </Helmet>
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
          {/* TODO: activate when update payment functionality is implemented */}
          {/* <p>Updated: {new Date(paymentDetails.updatedAt).toLocaleString()}</p> */}
          <DeleteResourceButton resourceId={itemId} resourceType='payments' />
        </div>
      ) : (
        <Spinner />
      )}
    </main>
  );
};

export default PaymentPage;
