// React and Third-Party Libraries
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import { genericErrorMessage } from "../../../../../constants/errorConstants";
import { devLog } from "../../../../../utils/errorUtils";
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../../../../utils/localStorageUtils";

// Hooks
import useErrorModalVisibility from "../../../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./CreateGroupForm.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering a form to create a new group, validating group name and rendering group name validation errors.
 *
 *  @param {boolean} isOnboarding - Indicates whether a new InstantSplit user is creating the group
 * @returns {JSX.Element} React component. */
const CreateGroupForm = ({ isOnboarding }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

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
    // Clear previous error
    setError(null);
    // Validate group name
    if (!groupName.trim()) {
      setError("Group name can't be empty.");
      displayErrorModal();

      return;
    }
    if (groupName.length > 50) {
      setError("Group name can't exceed 50 characters.");
      displayErrorModal();

      return;
    }
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
      navigate("/create-users");
    } catch (error) {
      displayErrorModal();
      devLog("Error creating group:", error);
      setError(genericErrorMessage);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <input
        className={styles.inputField}
        type='text'
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder='group name'
        ref={inputRef}
      />
      <FormSubmitButton
        fontSize={1.6}
        add={true}
        marginLeft='0.1'
        transformScale={1.3}
        translateX={0.2}
        translateY={0.15}
      />
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </form>
  );
};

export default CreateGroupForm;
