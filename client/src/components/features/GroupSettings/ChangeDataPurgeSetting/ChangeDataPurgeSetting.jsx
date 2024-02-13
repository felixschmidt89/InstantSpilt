// React and Third-Party Libraries
import React, { useState, useRef } from "react";
import axios from "axios";

// Constants and Utils
import {
  devLog,
  handleApiErrorsAndTriggerErrorModal,
} from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";
import { INACTIVE_DAYS } from "../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./ChangeDataPurgeSetting.module.css";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering group inactivity information and settings.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.groupCode - The group code.
 * @param {boolean} props.inactiveDataPurge - Flag indicating whether data purge is currently active.
 * @returns {JSX.Element} React component.
 */
const ChangeDataPurgeSetting = ({
  groupCode,
  inactiveDataPurge,
  onToggleInactiveDataPurge,
}) => {
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(inactiveDataPurge);
  const checkboxRef = useRef(null);

  devLog("inactiveDataPurge is activated:", inactiveDataPurge);

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.patch(
        `${apiUrl}/groups/inactiveDataPurge/${groupCode}`,
        {
          groupCode,
          inactiveDataPurge: isChecked,
        }
      );
      devLog("inactiveDataPurge setting updated:", response);
      // Add class after click, so checkbox does appears inactive with updated value
      checkboxRef.current.classList.add(styles.idleOnMount);
      onToggleInactiveDataPurge();
    } catch (error) {
      if (error.response) {
        handleApiErrorsAndTriggerErrorModal(error, setError, displayErrorModal);
      } else {
        setError(genericErrorMessage);
        devLog("Error updating inactive group data purge setting:", error);
        displayErrorModal();
      }
    }
  };

  const handleCheckboxChange = () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    // Remove class after click, so that checkbox does not fall back to appearing inactive
    checkboxRef.current.classList.remove(styles.idleOnMount);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>data purge</h2>
      <p
        className={`${styles.status} ${inactiveDataPurge ? styles.disabled : styles.enabled}`}>
        <>{inactiveDataPurge ? "disabled" : "enabled"}</>
      </p>
      <p className={styles.explanation}>
        Deletes group and its associated data (including group members users,
        expenses & payments) after {INACTIVE_DAYS} days of group inactivity.
      </p>
      <form onSubmit={handleFormSubmit}>
        <input
          className={`${styles.select} ${styles.idleOnMount}`}
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          ref={checkboxRef}
        />
        <FormSubmitButton
          fontSize={1.6}
          submit={true}
          marginLeft='0.1'
          transformScale={1.2}
          translateX={0.75}
          translateY={0.2}
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

export default ChangeDataPurgeSetting;
