// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Hooks
import useConfirmationModalLogicAndActions from "../../../../hooks/useConfirmationModalLogicAndActions";

// Components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./ConfirmSettlementPayment.module.css";
import emojiConstants from "../../../../constants/emojiConstants";
import Emoji from "../../../common/Emoji/Emoji";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering an icon to confirm a settlement payment on click.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.paymentAmount - The amount of the payment.
 * @param {string} props.paymentMakerName - The name of the payment maker.
 * @param {string} props.paymentRecipientName - The name of the payment recipient.
 * @param {string} props.groupCode - The group code.
 * @returns {JSX.Element} React component.
 */
const ConfirmSettlementPayment = ({
  paymentAmount,
  paymentMakerName,
  paymentRecipientName,
  groupCode,
  groupCurrency,
}) => {
  const { t } = useTranslation();
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
      setError(genericErrorMessage);
      devLog("Error creating settlement payment:", error);
    }
  };

  return (
    <div className={styles.container} onClick={handleShowConfirmation}>
      <div className={styles.confirm}>
        <Emoji
          label={"payment emoji"}
          emoji={emojiConstants.payment}
          shrinkOnSmallDevices={true}></Emoji>
        <span className={styles.confirmText}>
          {t("confirm-settlement-payment-button")}
        </span>
      </div>
      {isConfirmationVisible && (
        <ConfirmationModal
          message={t("confirm-settlement-payment-message", {
            paymentMakerName,
            paymentAmount,
            groupCurrency,
            paymentRecipientName,
          })}
          onConfirm={handleConfirmation}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={error}
        />
      )}
    </div>
  );
};
export default ConfirmSettlementPayment;
