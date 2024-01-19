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

// Components

// Styles
import styles from "./CreateGroupForm.module.css";
import FormSubmitButton from "../../../../common/FormSubmitButton/FormSubmitButton";
import ErrorDisplay from "../../../../common/ErrorDisplay/ErrorDisplay";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering a form to create a new group, validating group name and rendering group name validation errors.
 *
 * @returns {JSX.Element} React component. */
const CreateGroupForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(null);

  // Autofocus input field on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError(null);
    // Validate group name
    if (!groupName.trim()) {
      setError("Oops! Group name can't be empty.");
      return;
    }
    if (groupName.length > 50) {
      setError("Oops! Group name can't exceed 50 characters.");
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
      devLog("Error creating group:", error);
      setError(genericErrorMessage);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        className={styles.inputField}
        type='text'
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder='group name'
        ref={inputRef}
        autoFocus
      />
      <FormSubmitButton
        fontSize={1.6}
        add={true}
        marginLeft='0.1'
        transformScale={1.3}
        translateX={0.2}
        translateY={0.1}
      />
      <ErrorDisplay error={error} remWidth={30} />
    </form>
  );
};

export default CreateGroupForm;
