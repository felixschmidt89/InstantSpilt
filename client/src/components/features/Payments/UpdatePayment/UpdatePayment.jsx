// React and Third-Party Libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { TiArrowDownThick } from "react-icons/ti";

import axios from "axios";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import emojiConstants from "../../../../constants/emojiConstants";
import { genericErrorMessage } from "../../../../constants/errorConstants";
import { MINIMUM_VALID_AMOUNT } from "../../../../constants/dataConstants";
import { buttonStyles } from "../../../../constants/stylesConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import PaymentAmountInput from "../PaymentAmountInput/PaymentAmountInput";
import PaymentMakerSelect from "../PaymentMakerSelect/PaymentMakerSelect";
import PaymentRecipientSelect from "../PaymentRecipientSelect/PaymentRecipientSelect";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import Emoji from "../../../common/Emoji/Emoji";
import RenderReactIcon from "../../../common/RenderReactIcon/RenderReactIcon";

// Styles
import styles from "./UpdatePayment.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Parent component for updating a payment.
 *
 * @param {Object} props - The properties of the component.
 * @param {Object[]} props.groupMembers - An array of group members.
 * @param {string} props.groupCode - The groupCode identifying the group.
 * @param {Object} props.paymentDetails - The details of the payment stored in the database prior to being updated.
 * @param {string} props.itemId - The unique identifier of the payment.
 * @param {string} [props.route="/instant-split"] - The route to navigate to after updating the payment.
 * @returns {JSX.Element} React component. */
const UpdatePayment = ({
  groupMembers,
  groupCode,
  paymentDetails,
  itemId,
  route = "/instant-split",
}) => {
  const navigate = useNavigate();
  const paymentId = paymentDetails._id;

  // Values stored in database
  const storedPaymentAmount = paymentDetails.paymentAmount;
  const storedPaymentMakerName = paymentDetails.paymentMaker.userName;
  const storedPaymentRecipientName = paymentDetails.paymentRecipient.userName;

  // States to manage to be updated properties
  const [paymentAmount, setPaymentAmount] = useState(storedPaymentAmount);
  const [paymentMakerName, setPaymentMakerName] = useState(
    storedPaymentMakerName
  );
  const [paymentRecipientName, setPaymentRecipientName] = useState(
    storedPaymentRecipientName
  );

  const [formChanged, setFormChanged] = useState(false);
  const [error, setError] = useState("");

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const isSubmitButtonVisible =
    formChanged &&
    paymentAmount >= MINIMUM_VALID_AMOUNT &&
    paymentMakerName &&
    paymentRecipientName;

  // useEffect to handle form changes
  useEffect(() => {
    const isFormChanged =
      paymentAmount !== storedPaymentAmount ||
      paymentMakerName !== storedPaymentMakerName ||
      paymentRecipientName !== storedPaymentRecipientName;

    setFormChanged(isFormChanged);
  }, [
    paymentAmount,
    paymentMakerName,
    paymentRecipientName,
    paymentDetails,
    storedPaymentAmount,
    storedPaymentMakerName,
    storedPaymentRecipientName,
  ]);

  // On form submission: post payment and navigate to instant-split page
  const handleFormSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/payments/${paymentId}`, {
        groupCode,
        paymentAmount,
        paymentMakerName,
        paymentRecipientName,
        storedPaymentMakerName,
        storedPaymentRecipientName,
      });
      devLog("Payment updated:", response);
      navigate(route);
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error updating payment:", error);
        displayErrorModal();
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <PaymentAmountInput
        paymentAmount={paymentAmount}
        onAmountChange={setPaymentAmount}
        isUpdate={true}
      />
      <PaymentMakerSelect
        paymentMakerName={paymentMakerName}
        onPaymentMakerChange={setPaymentMakerName}
        groupMembers={groupMembers}
        isUpdate={true}
      />
      <div className={styles.emojis}>
        <Emoji label={"payment emoji"} emoji={emojiConstants.payment}></Emoji>
        <RenderReactIcon
          icon={TiArrowDownThick}
          size={1.6}
          scale={1.4}
          translateX={0.1}
          translateY={0.25}
        />
      </div>
      <PaymentRecipientSelect
        paymentRecipientName={paymentRecipientName}
        onRecipientChange={setPaymentRecipientName}
        groupMembers={groupMembers}
        isUpdate={true}
      />
      <div className={styles.buttonContainer}>
        {isSubmitButtonVisible && (
          <Button style={buttonStyles} variant='contained' type='submit'>
            update payment
          </Button>
        )}
        <ErrorModal
          error={error}
          onClose={handleCloseErrorModal}
          isVisible={isErrorModalVisible}
        />{" "}
      </div>
    </form>
  );
};

export default UpdatePayment;
