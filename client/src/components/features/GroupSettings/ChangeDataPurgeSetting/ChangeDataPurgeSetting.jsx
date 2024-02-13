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
 * @param {boolean} props.isOnboarding - Flag indicating whether the component is used in the onboarding process.
 * @returns {JSX.Element} React component.
 */
const ChangeDataPurgeSetting = ({
  groupCode,
  inactiveDataPurge,
  isOnboarding,
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
      {inactiveDataPurge ? (
        <p className={styles.explanation}>
          InstantSplit permanently deletes inactive groups and their data
          (users, expenses & payments) after {INACTIVE_DAYS} days of group
          inactivity. If you wish to keep your group and data, please opt out:
        </p>
      ) : (
        <p className={styles.explanation}>
          Automatic data purge after {INACTIVE_DAYS} days of group inactivity is{" "}
          <strong>currently deactivated.</strong>
          <br />
          If you wish to reactivate data purging for your group and its
          associated data, please opt back in:
        </p>
      )}
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
