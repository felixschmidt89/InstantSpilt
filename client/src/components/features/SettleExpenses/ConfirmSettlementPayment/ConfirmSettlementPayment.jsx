// React and Third-Party Libraries
import React, { useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ConfirmSettlementPayment = ({
  paymentAmount,
  paymentMakerName,
  paymentRecipientName,
  groupCode,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const confirmSettlementPayment = async (e) => {
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/payments`, {
        paymentMakerName,
        groupCode,
        paymentAmount,
        paymentRecipientName,
      });
      devLog("Settlement payment created:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error creating settlement payment:", error);
        displayErrorModal();
      }
    }
  };

  return (
    <>
      <ReactIconNavigate
        icon={GiTakeMyMoney}
        tooltip='Confirm'
        onClick={confirmSettlementPayment}
        iconSize={3}
      />
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </>
  );
};

export default ConfirmSettlementPayment;
