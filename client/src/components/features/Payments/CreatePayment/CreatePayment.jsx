// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";
import { genericErrorMessage } from "../../../../constants/errorConstants";
import { MINIMUM_VALID_AMOUNT } from "../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import Emoji from "../../../common/Emoji/Emoji";
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

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

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

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
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error creating payment:", error);
        displayErrorModal();
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
      <Emoji
        label={"payment to other user emoji"}
        emoji={emojiConstants.paymentsMade}
        className={styles.paymentToEmoji}></Emoji>
      <PaymentRecipientSelect
        paymentRecipientName={paymentRecipientName}
        onRecipientChange={setPaymentRecipientName}
        groupMembers={groupMembers}
      />
      <div>
        <FormSubmitButton fontSize={3.2} add={true} translateY='0.2' />
      </div>

      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </form>
  );
};

export default CreatePayment;
