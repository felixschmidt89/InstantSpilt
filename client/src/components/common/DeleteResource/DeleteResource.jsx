// React and Third-Party Libraries
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  // Use hook to
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const { deleteResource, error: hookError } = useDeleteResource(
    resourceType,
    resourceId,
    navigateOnDelete ? route : null
  );

  // State for hook error
  const [localError, setLocalError] = useState(null);
  useEffect(() => {
    if (hookError) {
      // Transform error message to match translation key format
      const transformedError = `delete-resource-error-${hookError
        .toLowerCase()
        .replace(/[^\w\s]|_/g, "")
        .replaceAll(" ", "-")}`;
      setLocalError(transformedError);
      setLocalError(transformedError);
    } else {
      setLocalError(null);
    }
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
          variant='outlined'
          type='submit'
          endIcon={<DeleteIcon />}>
          {t("delete-resource-delete-copy")}
        </Button>
      ) : (
        <span
          className={styles.link}
          onClick={handleShowConfirmation}
          role='button'>
          {t("delete-resource-delete-copy")}
        </span>
      )}

      {isConfirmationVisible && (
        <ConfirmationModal
          message={t("delete-resource-confirmation-message")}
          onConfirm={handleDelete}
          onCancel={handleHideConfirmation}
          isVisible={isConfirmationVisible}
          error={t(localError)}
        />
      )}
    </div>
  );
};

export default DeleteResource;
