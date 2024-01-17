// React and Third-Party Libraries
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Constants and Utils
import {
  setGroupCodeToCurrentlyActive,
  setRouteInLocalStorage,
  storeGroupCodeInLocalStorage,
} from "../../utils/localStorageUtils";
import { devLog } from "../../utils/errorUtils";
import { genericErrorMessage } from "../../constants/errorConstants";

// Components
import HelmetMetaTagsNetlify from "../../components/common/HelmetMetaTagsNetlify/HelmetMetaTagsNetlify";
import PiratePx from "../../components/common/PiratePx/PiratePx";
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";
import ErrorDisplay from "../../components/common/ErrorDisplay/ErrorDisplay";
import FormSubmitButton from "../../components/common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./CreateGroupPage.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const CreateGroupPage = () => {
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

    // Check if group name is empty
    if (!groupName.trim()) {
      setError("Please enter a group name.");
      return;
    }
    if (groupName.length > 50) {
      setError("Group name should not be longer than 50 characters.");
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
      setGroupName("");
      navigate("/create-users");
    } catch (error) {
      devLog("Error creating group:", error);
      setError(genericErrorMessage);
    }
  };

  return (
    <main>
      <HelmetMetaTagsNetlify title='InstantSplit - create group' />
      <PiratePx COUNT_IDENTIFIER={"create-group"} />
      <InAppNavigationBar back={true} backRoute={"/homepage"} />
      <div className={styles.container}>
        <h1>Create a group</h1>
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
        </form>
      </div>
      <ErrorDisplay error={error} />
    </main>
  );
};

export default CreateGroupPage;
