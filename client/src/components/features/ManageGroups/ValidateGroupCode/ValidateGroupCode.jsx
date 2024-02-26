// React and Third-Party Libraries
import React, { useState } from "react";
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

const ValidateGroupCode = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
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

  // Submit on enter button click
  const handleKeyDown = (e) => {
    submitOnEnterClick(e, handleFormSubmit);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleFormSubmit}>
        <input
          className={styles.inputField}
          type='text'
          placeholder='enter groupCode'
          value={toBeValidatedGroupCode}
          onChange={(e) => setToBeValidatedGroupCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FormSubmitButton
          fontSize={1.6}
          submit={true}
          marginLeft='0.1'
          transformScale={1.3}
          translateX={0.3}
          translateY={0.1}
        />
        {/* Add FriendlyCaptcha for new users*/}
        {!groupCode && (
          <FriendlyCaptcha
            sitekey={import.meta.env.VITE_FRIENDLY_CAPTCHA_SITEKEY}
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
