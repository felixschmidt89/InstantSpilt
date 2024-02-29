// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import { submitOnEnterClick } from "../../../../utils/formUtils";

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
 * @returns {JSX.Element} React component.
 */
const ValidateGroupCode = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const [friendlyCaptchaIsVerified, setFriendlyCaptchaIsVerified] =
    useState(false);
  const [toBeValidatedGroupCode, setToBeValidatedGroupCode] = useState("");
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
      <h2>join group</h2>

      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          placeholder='X4NST4NTSL17T'
          value={toBeValidatedGroupCode}
          onChange={(e) => setToBeValidatedGroupCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {/* For new users: only render submit button, if FriendlyCaptcha is verified*/}
        {(friendlyCaptchaIsVerified || groupCode) && (
          <FormSubmitButton
            fontSize={1.6}
            submit={true}
            marginLeft='0.1'
            transformScale={1.3}
            translateX={0.3}
            translateY={0.1}
          />
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
