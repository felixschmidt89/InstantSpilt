// React and Third-Party Libraries
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Components
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./CreateUserForm.module.css";
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";

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

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // On form submission: Provide groupCode for authentication, post unique user within group, clear form & trigger a parent component refresh
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError(null);
    // Validate group name
    if (!userName.trim()) {
      setError("Oops! User name can't be empty.");
      return;
    }
    if (userName.length > 50) {
      setError("Oops! User name can't exceed 50 characters.");
      return;
    }

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
      // Render conflict status message if there is already a group member with same name
      if (error.response && error.response.status === 409) {
        setError(error.response.data.message);
      } else {
        devLog("Error creating user.", error);
        setError(genericErrorMessage);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add user</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type='text'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='user name'
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
      <ErrorDisplay error={error} remWidth={20} />
    </div>
  );
};

export default CreateUserForm;
