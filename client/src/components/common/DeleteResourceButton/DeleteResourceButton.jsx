// DONE adding only meaningful necessary comments

import React, { useState } from "react";
import axios from "axios";
import styles from "./DeleteResourceButton.module.css";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";

// Get API URL from environment variables
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Reusable button component to delete a resource of a given type and navigate to route upon deletion
 *
 * @param {string} props.resourceId  The unique identifier of the resource.
 * @param {string} props.resourceType - The type of the resource (e.g., "expenses").
 * @param {string} props.route - The route to navigate to after successful deletion (default is to instant split man application page).
 */
const DeleteResourceButton = ({
  resourceId,
  resourceType,
  route = "/instant-split",
}) => {
  const navigate = useNavigate();
  // Set error State to display error message
  const [error, setError] = useState(null);

  const resourceTypeName = resourceType.slice(0, -1); // Remove the last character ('s')

  // Handle delete request and appropriate errors message if applicable
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${resourceType}/${resourceId}`
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        navigate(route);
      }
    } catch (error) {
      if (error.response && error.response.status === StatusCodes.BAD_REQUEST) {
        setError(error.response.data.message);
      } else {
        setError(`An error occurred while deleting the ${resourceType}.`);
      }
    }
  };

  // Render button and error message in case of an error
  return (
    <div>
      <button className={styles.button} onClick={handleDelete}>
        delete {resourceTypeName}
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default DeleteResourceButton;
