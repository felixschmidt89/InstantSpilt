// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Components
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import Emoji from "../../../common/Emoji/Emoji";
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./CreatePayment.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component for creating a payment.
 *
 * @param {Object} props - The properties of the component.
 * @param {Object[]} props.groupMembers - An array of the group members.
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @returns {JSX.Element} React component. */
const CreatePayment = ({ groupMembers, groupCode }) => {
  const navigate = useNavigate();

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMakerName, setPaymentMakerName] = useState("");
  const [paymentRecipientName, setPaymentRecipientName] = useState("");
  const [error, setError] = useState("");

  const isSubmitButtonVisible =
    paymentAmount && paymentMakerName && paymentRecipientName;

  // On form submission: post payment and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/payments`, {
        paymentMakerName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });
      devLog("Payment created:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        // Handle bad requests
        if (error.response.status === 400) {
          setError(error.response.data.errors[0].message);
        } else if (error.response.status === 409) {
          setError(error.response.data.message);
        }
      } else {
        setError(genericErrorMessage);
        devLog("Error creating payment:", error);
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <PaymentAmountInput
        paymentAmount={paymentAmount}
        onAmountChange={setPaymentAmount}
      />

      <PaymentMakerSelect
        paymentMakerName={paymentMakerName}
        onPaymentMakerChange={setPaymentMakerName}
        groupMembers={groupMembers}
      />
      <span className={styles.paymentToEmoji}>
        <Emoji
          label={"payment to other user emoji"}
          emoji={emojiConstants.paymentsMade}></Emoji>{" "}
      </span>
      <PaymentRecipientSelect
        paymentRecipientName={paymentRecipientName}
        onRecipientChange={setPaymentRecipientName}
        groupMembers={groupMembers}
      />
      <div className={styles.buttonContainer}>
        {isSubmitButtonVisible && (
          <button className={styles.button} type='submit'>
            +{" "}
          </button>
        )}
      </div>
      <ErrorDisplay error={error} />
    </form>
  );
};

export default CreatePayment;
