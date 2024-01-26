// React and Third-Party Libraries
import React, { useState, useRef } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { genericErrorMessage } from "../../../../constants/errorConstants";
import { INACTIVE_DAYS } from "../../../../constants/dataConstants";

// Components
import ErrorDisplay from "../../../common/ErrorDisplay/ErrorDisplay";
import FormSubmitButton from "../../../common/FormSubmitButton/FormSubmitButton";

// Styles
import styles from "./ChangeDataPurgeSetting.module.css";

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
const ChangeDataPurgeSetting = ({ groupCode, inactiveDataPurge }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(inactiveDataPurge);
  const checkboxRef = useRef(null);

  devLog("inactiveDataPurge is activated:", inactiveDataPurge);

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
      navigate("/instant-split");
    } catch (error) {
      if (error.response) {
        if (error.response.status === StatusCodes.BAD_REQUEST) {
          setError(error.response.data.errors[0].message);
        } else {
          setError(genericErrorMessage);
          devLog("Error updating inactive group data purge setting:", error);
        }
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
          Automatic data purge after {INACTIVE_DAYS} days of group inactivity is
          currently deactivated. <br />
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
          translateX={0.1}
          translateY={0.2}
        />
      </form>
      <ErrorDisplay error={error} />
    </div>
  );
};

export default ChangeDataPurgeSetting;