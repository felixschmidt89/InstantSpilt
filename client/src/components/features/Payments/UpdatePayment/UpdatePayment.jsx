// React and Third-Party Libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";

// Components
import PaymentAmount from "../PaymentAmount/PaymentAmount";
import PaymentMaker from "../PaymentMaker/PaymentMaker";
import PaymentRecipient from "../PaymentRecipient/PaymentRecipient";

// Styles
import styles from "./UpdatePayment.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const UpdatePayment = ({
  groupMembers,
  groupCode,
  paymentDetails,
  itemId,
  route = "/instant-split",
}) => {
  const navigate = useNavigate();

  const paymentId = paymentDetails._id;

  const [paymentAmount, setPaymentAmount] = useState(
    paymentDetails.paymentAmount
  );
  const [paymentMakerName, setPaymentMakerName] = useState(
    paymentDetails.paymentMaker.userName
  );
  const [paymentRecipientName, setPaymentRecipientName] = useState(
    paymentDetails.paymentRecipient.userName
  );
  const [formChanged, setFormChanged] = useState(false);

  const [error, setError] = useState("");

  const isSubmitButtonVisible =
    formChanged && paymentAmount && paymentMakerName && paymentRecipientName;

  // useEffect to handle form changes
  useEffect(() => {
    const isFormChanged =
      paymentAmount !== paymentDetails.paymentAmount ||
      paymentMakerName !== paymentDetails.paymentMaker.userName ||
      paymentRecipientName !== paymentDetails.paymentRecipient.userName;

    setFormChanged(isFormChanged);
  }, [paymentAmount, paymentMakerName, paymentRecipientName, paymentDetails]);

  // On form submission: post payment and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/payments/${paymentId}`, {
        paymentMakerName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });
      devLog("Payment updated:", response);
      navigate(route);
    } catch (error) {
      if (error.response) {
        // Handle bad requests
        if (error.response.status === 400) {
          setError(error.response.data.errors[0].message);
        } else if (error.response.status === 409) {
          // Handle conflict
          setError(error.response.data.message);
        }
      } else {
        setError("Error updating payment. Please try again.");
        devLog("Error updating payment:", error);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <PaymentAmount
        paymentAmount={paymentAmount}
        onAmountChange={setPaymentAmount}
      />
      <PaymentMaker
        paymentMakerName={paymentMakerName}
        onPaymentMakerChange={setPaymentMakerName}
        groupMembers={groupMembers}
      />
      <span className={styles.paymentToEmoji}>
        {emojiConstants.paymentsMade}
      </span>
      <PaymentRecipient
        paymentRecipientName={paymentRecipientName}
        onRecipientChange={setPaymentRecipientName}
        groupMembers={groupMembers}
      />

      <div className={styles.buttonContainer}>
        {isSubmitButtonVisible && (
          <button className={styles.button} type='submit'>
            update
          </button>
        )}
        {error && <div className={styles.errorText}>{error}</div>}{" "}
      </div>
    </form>
  );
};

export default UpdatePayment;
