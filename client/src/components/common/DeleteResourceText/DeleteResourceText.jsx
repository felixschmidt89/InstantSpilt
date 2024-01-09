// React and Third-Party Libraries
import React, { useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

// Constants and Utils
import { devLog } from "../../../utils/errorUtils";

// Components
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

// Styles
import styles from "./DeleteResourceText.module.css";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Component for displaying a text to delete a resource.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.resourceId - The ID of the resource to delete.
 * @param {string} props.resourceType - The type of the resource to delete.
 * @param {Function} props.handleRerender - Callback function to trigger a page rerender.
 * @returns {JSX.Element} - Rendered component.
 */
const DeleteResourceText = ({ resourceId, resourceType, onDelete }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${resourceType}/${resourceId}`
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Resource (${resourceType} ${resourceId}) has been deleted.`);
        onDelete();
      }
    } catch (error) {
      if (error.response && error.response.status === StatusCodes.BAD_REQUEST) {
        setError(error.response.data.message);
      } else {
        setError(`An error occurred while deleting the ${resourceType}.`);
        devLog(
          `Error deleting resource (${resourceType} ${resourceId}):`,
          error
        );
      }
    }
  };

  return (
    <div>
      <span className={styles.link} onClick={handleDelete} href='#'>
        delete
      </span>
      <ErrorDisplay error={error} />
    </div>
  );
};

export default DeleteResourceText;
