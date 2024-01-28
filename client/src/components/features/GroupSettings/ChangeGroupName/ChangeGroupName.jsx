// React and Third-Party Libraries
import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// Styles
import styles from "./ChangeGroupName.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const ChangeGroupName = ({ groupCode, groupName }) => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const storedGroupName = groupName;
  const [newGroupName, setNewGroupName] = useState(storedGroupName);
  const [error, setError] = useState(null);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.patch(`${apiUrl}/groups/${groupCode}`, {
        groupCode,
        groupName: newGroupName,
      });
      devLog("Groupname updated:", response);
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error updating group name:", error);
        displayErrorModal();
      }
    }
  };

  // Add active class on click, so that input does not fall back to appearing inactive
  const handleInputClick = () => {
    inputRef.current.classList.add(styles.active);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>name</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.inputField} ${styles.idleOnMount}`}
          type='text'
          value={newGroupName}
          onClick={handleInputClick}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder={storedGroupName}
          ref={inputRef}
        />
        <FormSubmitButton
          fontSize={1.6}
          submit={true}
          marginLeft='0.1'
          transformScale={1.3}
          translateX={0.3}
          translateY={0.1}
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
export default ChangeGroupName;
