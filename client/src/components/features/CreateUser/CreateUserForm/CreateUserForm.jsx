// React and Third-Party Libraries
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

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
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./CreateUserForm.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for creating a new user within a group.
 *
 * @param {Object} props - The properties of the component.
 * @param {function} props.incrementRerenderTrigger - Function to trigger rerender in parent component.
 * @returns {JSX.Element} React component. */
const CreateUserForm = ({ incrementRerenderTrigger, groupCode }) => {
  const inputRef = useRef(null);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${apiUrl}/users`, {
        userName,
        groupCode,
      });
      devLog("User created:", response);
      setUserName("");
      // Increment rerenderTrigger in parent component to rerender user list
      incrementRerenderTrigger();
      setError("");
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error creating user.", error);
        displayErrorModal();
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>add group member</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='member name'
          className={styles.inputField}
          ref={inputRef}
          autoFocus
        />
        <FormSubmitButton
          fontSize={1.6}
          add={true}
          marginLeft='0.1'
          transformScale={1.3}
          translateX={0.2}
          translateY={0.15}
        />
      </form>
      <ErrorModal
        error={error}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default CreateUserForm;
