// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { FormControlLabel, Switch } from "@mui/material";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";
import { INACTIVE_DAYS } from "../../../../constants/dataConstants";

// Hooks
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";

// Components
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

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
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(inactiveDataPurge);
  const { t } = useTranslation();

  const handleToggleClick = async () => {
    try {
      const updatedIsActive = !isActive;
      setIsActive(updatedIsActive);
      const response = await axios.patch(
        `${apiUrl}/groups/inactiveDataPurge/${groupCode}`,
        {
          groupCode,
          inactiveDataPurge: updatedIsActive,
        }
      );
      devLog("inactiveDataPurge setting updated:", response);
    } catch (error) {
      setError(t("generic-error-message"));
      devLog("Error updating inactive group data purge setting:", error);
      displayErrorModal();
    }
  };
  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  return (
    <>
      {" "}
      <div className={styles.container}>
        <h2 className={styles.header}>
          {t("change-data-purge-setting-header")}
        </h2>
        <div className={styles.box}>
          <p className={styles.explanation}>
            {t("change-data-purge-setting-explanation", {
              days: INACTIVE_DAYS,
            })}
          </p>
          <form onSubmit={handleToggleClick} className={styles.toggle}>
            <FormControlLabel
              value='bottom'
              control={
                <Switch
                  checked={isActive}
                  onChange={handleToggleClick}
                  size='small'
                />
              }
            />
          </form>
        </div>
        <ErrorModal
          error={error}
          onClose={handleCloseErrorModal}
          isVisible={isErrorModalVisible}
        />
      </div>
    </>
  );
};

export default ChangeDataPurgeSetting;
