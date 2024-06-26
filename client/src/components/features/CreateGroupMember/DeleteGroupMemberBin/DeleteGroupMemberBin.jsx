// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog, handleApiErrors } from "../../../../utils/errorUtils";

// Components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./DeleteGroupMemberBin.module.css";
import useErrorModalVisibility from "../../../../hooks/useErrorModalVisibility";
import ErrorModal from "../../../common/ErrorModal/ErrorModal";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for rendering a delete trash bin and related confirmation modal
 *
 * @param {Object} props - The component props.
 * @param {string} props.userId - The ID of the user to be deleted.
 * @param {string} props.groupMemberName - The name of the group member to be deleted.
 * @param {Function} props.incrementRerenderTrigger - Function to increment the rerender trigger.
 * @param {boolean} props.rerenderTrigger - rerenderTrigger variable from parent component.
 * @returns {JSX.Element} React component.
 */
const DeleteGroupMemberBin = ({
  userId,
  groupMemberName,
  incrementRerenderTrigger,
  rerenderTrigger,
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  // Get error modal visibility logic
  const { isErrorModalVisible, displayErrorModal, handleCloseErrorModal } =
    useErrorModalVisibility();

  // Effect to trigger rerender when deletion is successful
  useEffect(() => {
    if (deletionSuccess && rerenderTrigger) {
      setDeletionSuccess(false);
      incrementRerenderTrigger();
    }
  }, [deletionSuccess, incrementRerenderTrigger, rerenderTrigger]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/users/${userId}`);
      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Group member ${userId} has been deleted.`);
        setDeletionSuccess(true);
        handleHideConfirmation();
      }
    } catch (error) {
      if (error.response) {
        setIsConfirmationVisible(false);
        handleApiErrors(error, setError, "users", displayErrorModal, t);
      } else {
        setIsConfirmationVisible(false);
        setError(t("generic-error-message"));
        devLog(`Error deleting group member ${userId}:`, error);
        displayErrorModal();
      }
    }
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
    setError(null);
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.link}
        onClick={handleShowConfirmation}
        role='button'>
        <MdDelete />
      </span>
      {isConfirmationVisible && (
        <ConfirmationModal
          message={t("delete-group-member-bin-component-confirmation-message", {
            groupMemberName,
          })}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={error}
        />
      )}
      <ErrorModal
        error={t(error)}
        onClose={handleCloseErrorModal}
        isVisible={isErrorModalVisible}
      />
    </div>
  );
};

export default DeleteGroupMemberBin;
