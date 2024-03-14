// React and Third-Party Libraries
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "friendly-challenge/widget";

// Constants and Utils
import { devLog } from "../../../../../utils/errorUtils";
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../../../../utils/localStorageUtils";
import { plusFormSubmitButtonStyles } from "../../../../../constants/stylesConstants";

// Hooks
import useErrorModalVisibility from "../../../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../../common/ErrorModal/ErrorModal";
import FriendlyCaptcha from "../../../../common/FriendlyCaptcha/FriendlyCaptcha";

// Styles
import styles from "./CreateGroupForm.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering a form to create a new group, validating group name and rendering group name validation errors. Also renders and validates FriendlyCaptcha for new users.
 *
 *  @param {boolean} isOnboarding - Indicates whether a new InstantSplit user is creating the group
 * @returns {JSX.Element} React component. */
const CreateGroupForm = ({ isOnboarding }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);
  const groupCode = localStorage.getItem("activeGroupCode");
  const [friendlyCaptchaIsVerified, setFriendlyCaptchaIsVerified] =
    useState(false);

  devLog("Onboarding group creation", isOnboarding);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  // Autofocus input field on mount if isOnboarding is true
  useEffect(() => {
    if (isOnboarding) {
      inputRef.current.focus();
    }
  }, [isOnboarding]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/groups`, {
        groupName,
      });
      devLog("Group created:", response);
      const { groupCode } = response.data.group;
      storeGroupCodeInLocalStorage(groupCode);
      setGroupCodeToCurrentlyActive(groupCode);
      // Necessary for appropriate InAppNavigationBar conditional rendering on navigated to route:
      setRouteInLocalStorage(window.location.pathname, "previousRoute");
      navigate("/create-group-members");
    } catch (error) {
      devLog("Error creating group:", error);
      displayErrorModal();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <h2>{t("create-group-header")}</h2>
      <input
        className={styles.inputField}
        type='text'
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder={t("create-group-group-name-placeholder")}
        ref={inputRef}
      />
      {/* For new users: only render submit button, if FriendlyCaptcha is verified*/}
      {(groupCode !== null || friendlyCaptchaIsVerified) && (
        <FormSubmitButton {...plusFormSubmitButtonStyles} />
      )}
      {/* For new users: render FriendlyCaptcha*/}
      {!groupCode && (
        <FriendlyCaptcha
          sitekey={import.meta.env.VITE_FRIENDLY_CAPTCHA_SITEKEY}
          secret={import.meta.env.VITE_FRIENDLY_CAPTCHA_SECRET}
          setFriendlyCaptchaIsVerified={setFriendlyCaptchaIsVerified}
        />
      )}
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </form>
  );
};

export default CreateGroupForm;
