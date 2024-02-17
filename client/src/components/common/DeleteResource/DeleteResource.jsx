// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

// Constants and Utils
import { buttonStyles } from "../../../constants/stylesConstants";

// Hooks
import useDeleteResource from "../../../hooks/useDeleteResource";

// Components
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

// Styles
import styles from "./DeleteResource.module.css";

/**
 * DeleteResource component for handling resource deletion with a confirmation modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.resourceId - The ID of the resource to delete.
 * @param {string} props.resourceType - The type of the resource to delete.
 * @param {string} [props.route="/instant-split"] - The route to navigate to after deletion.
 * @param {boolean} [props.isButton=true] - Determines if the deletion trigger is a button or a link.
 * @param {boolean} [props.navigateOnDelete=true] - Flag to navigate after successful deletion.
 * @param {boolean} [props.showResourceType=true] - Flag to display the resource type in the confirmation message.
 * @param {Function} props.onDeleteResource - Callback function to execute after deletion.
 * @returns {JSX.Element} React component.
 */
const DeleteResource = ({
  resourceId,
  resourceType,
  route = "/instant-split",
  isButton = true,
  navigateOnDelete = true,
  showResourceType = true,
  onDeleteResource,
}) => {
  // Use hook to
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const {
    deleteResource,
    resourceTypeSingular,
    error: hookError,
  } = useDeleteResource(
    resourceType,
    resourceId,
    navigateOnDelete ? route : null
  );

  // State for hook error
  const [localError, setLocalError] = useState(null);
  useEffect(() => {
    setLocalError(hookError);
  }, [hookError]);

  const handleDelete = () => {
    deleteResource();
    onDeleteResource && onDeleteResource(resourceId);
  };

  const handleShowConfirmation = () => {
    setIsConfirmationVisible(true);
  };

  const handleHideConfirmation = () => {
    setIsConfirmationVisible(false);
  };

  return (
    <div className={styles.container}>
      {isButton ? (
        <Button
          onClick={handleShowConfirmation}
          style={buttonStyles}
          color='error'
          variant='contained'
          type='submit'
          endIcon={<DeleteIcon />}>
          delete {showResourceType && resourceTypeSingular}
        </Button>
      ) : (
        <span
          className={styles.link}
          onClick={handleShowConfirmation}
          role='button'>
          delete {showResourceType && resourceTypeSingular}
        </span>
      )}

      {isConfirmationVisible && (
        <ConfirmationModal
          message={`Are you sure you want to delete this ${resourceTypeSingular}?`}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={localError}
        />
      )}
    </div>
  );
};

export default DeleteResource;
