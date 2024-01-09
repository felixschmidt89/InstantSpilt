import React, { useState } from "react";
import axios from "axios";
import styles from "./DeleteResourceText.module.css";
import { StatusCodes } from "http-status-codes";
import { devLog } from "../../../utils/errorUtils";

// Get API URL from environment variables
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Reusable text component to delete a resource of a given type and navigate to route upon deletion
 *
 * @param {string} props.resourceId  The unique identifier of the resource.
 * @param {string} props.resourceType - The type of the resource (e.g., "expenses").
 * @param {string} props.route - The route to navigate to after successful deletion (default is to instant split man application page).
 */
const DeleteResourceText = ({ resourceId, resourceType, handleRerender }) => {
  // Set error State to display error message
  const [error, setError] = useState(null);

  // Handle delete request and appropriate errors message if applicable
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${resourceType}/${resourceId}`
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Resource (${resourceType} ${resourceId}) has been deleted.`);
        handleRerender();
        devLog("Page rerender has been triggered.");
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

  // Render button and error message in case of an error
  return (
    <div>
      <a className={styles.link} onClick={handleDelete} href='#'>
        delete
      </a>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default DeleteResourceText;
