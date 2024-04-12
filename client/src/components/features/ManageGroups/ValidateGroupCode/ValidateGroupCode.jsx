// React and Third-Party Libraries
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

// Constants and Utils
import { submitOnEnterClick } from "../../../../utils/formUtils";
import { sendFormSubmitButtonStyles } from "../../../../constants/stylesConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";
import FriendlyCaptcha from "../../../common/FriendlyCaptcha/FriendlyCaptcha";

// Styles
import styles from "./ValidateGroupCode.module.css";

/**
 * React component for validating a group code.
 * @param {Object} props - Component props.
 * @param {boolean} [props.isExistingUser=false] - Flag to render different header and placeholder dependant on user.
 * @returns {JSX.Element} React component.
 */
const ValidateGroupCode = ({ isExistingUser = false }) => {
  const { t } = useTranslation();
  const groupCode = localStorage.getItem("activeGroupCode");
  const [friendlyCaptchaIsVerified, setFriendlyCaptchaIsVerified] =
    useState(false);
  const [toBeValidatedGroupCode, setToBeValidatedGroupCode] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!toBeValidatedGroupCode.trim()) {
      setError("missing groupcode");
      displayErrorModal();
    } else {
      navigate(`/groupCode-validator/${toBeValidatedGroupCode}`);
    }
  };

  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  return (
    <div className={styles.container}>
      <h2>
        {isExistingUser
          ? t("validate-groupcode-join-group-copy")
          : t("validate-groupcode-enter-groupcode-copy")}
      </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          placeholder={
            isExistingUser
              ? t("validate-groupcode-enter-groupcode-copy")
              : "L54N21ST4N1L17T"
          }
          value={toBeValidatedGroupCode}
          onChange={(e) => setToBeValidatedGroupCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* For new users: only render submit button, if FriendlyCaptcha is verified*/}
        {(friendlyCaptchaIsVerified || groupCode) && (
          <FormSubmitButton {...sendFormSubmitButtonStyles} />
        )}
        {/* For new users: render FriendlyCaptcha*/}
        {!groupCode && (
          <FriendlyCaptcha
            sitekey={import.meta.env.VITE_FRIENDLY_CAPTCHA_SITEKEY}
            secret={import.meta.env.VITE_FRIENDLY_CAPTCHA_SECRET}
            setFriendlyCaptchaIsVerified={setFriendlyCaptchaIsVerified}
          />
        )}
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default ValidateGroupCode;
