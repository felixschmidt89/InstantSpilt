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
import useConfirmationModalLogicAndActions from "../../../../hooks/useConfirmationModalLogicAndActions";

// Components
import ReactIconNavigate from "../../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

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

  // Get confirmation modal logic from hook, pass callbacks to be executed on confirmation
  const {
    isConfirmationVisible,
    handleConfirmation,
    handleShowConfirmation,
    handleHideConfirmation,
  } = useConfirmationModalLogicAndActions(() => confirmSettlementPayment());

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
        handleApiErrorsAndTriggerErrorModal(error, setError);
      } else {
        setError(genericErrorMessage);
        devLog("Error creating settlement payment:", error);
      }
    }
  };

  return (
    <>
      <ReactIconNavigate
        icon={GiTakeMyMoney}
        tooltip='Confirm'
        onClick={handleShowConfirmation}
        iconSize={2.5}
      />

      {isConfirmationVisible && (
        <ConfirmationModal
          message={`Confirm settlement payment by ${paymentMakerName} to ${paymentRecipientName}?`}
          onConfirm={handleConfirmation}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={error}
        />
      )}
    </>
  );
};

export default ConfirmSettlementPayment;
