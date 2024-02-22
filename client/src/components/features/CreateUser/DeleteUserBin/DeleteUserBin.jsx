// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

// Hooks
import useDeleteResource from "../../../../hooks/useDeleteResource";

// Components
import ConfirmationModal from "../../../common/ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./DeleteUserBin.module.css";

/**
 * Component for rendering a delete icon and confirmation modal for deleting a user.
 *
 * @param {Object} props - The component props.
 * @param {string} props.userId - The ID of the user to be deleted.
 * @param {string} props.userName - The name of the user to be deleted.
 * @param {Function} props.incrementRerenderTrigger - Function to increment the rerender trigger.
 * @param {boolean} props.rerenderTrigger - rerenderTrigger variable from parent component.
 * @returns {JSX.Element} React component.
 */
const DeleteUserBin = ({
  userId,
  userName,
  incrementRerenderTrigger,
  rerenderTrigger,
}) => {
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  // Get hook to delete user
  const { deleteResource, error: hookError } = useDeleteResource(
    "users",
    userId,
    null
  );

  // Local state for hook error
  const [localError, setLocalError] = useState(null);
  useEffect(() => {
    setLocalError(hookError);
  }, [hookError]);

  // Effect to trigger rerender when deletion is successful
  useEffect(() => {
    if (deletionSuccess && rerenderTrigger) {
      incrementRerenderTrigger();
      setDeletionSuccess(false);
    }
  }, [deletionSuccess, incrementRerenderTrigger, rerenderTrigger]);

  const handleDelete = async () => {
    try {
      await deleteResource();
      setDeletionSuccess(true);
    } catch (error) {
      setLocalError(error);
    }
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.link}
        onClick={handleShowConfirmation}
        role='button'>
        <DeleteIcon />
      </span>
      {isConfirmationVisible && (
        <ConfirmationModal
          message={`Are you sure you want to delete ${userName}?`}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={localError}
        />
      )}
    </div>
  );
};

export default DeleteUserBin;
