import React, { useState } from "react";
import axios from "axios";
import styles from "./DeleteResourceButton.module.css";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import { devLog } from "../../../utils/errorUtils";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Reusable button component to delete a resource of a given type and navigate to route upon deletion
 *
 * @param {string} props.resourceId  The unique identifier of the resource.
 * @param {string} props.resourceType - The type of the resource (e.g., "expenses").
 * @param {string} props.route - The route to navigate to after successful deletion (default: instant split main application).
 */
const DeleteResourceButton = ({
  resourceId,
  resourceType,
  route = "/instant-split",
}) => {
  const navigate = useNavigate();
  // Set error State to display error message
  const [error, setError] = useState(null);

  // Remove the last character ('s')
  const resourceTypeName = resourceType.slice(0, -1);

  // Handle delete request and appropriate errors message if applicable
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${resourceType}/${resourceId}`
      );

      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(
          `Resource (${resourceTypeName} ${resourceId}) has been deleted.`
        );
        navigate(route);
      }
    } catch (error) {
      if (error.response && error.response.status === StatusCodes.BAD_REQUEST) {
        setError(error.response.data.message);
      } else {
        devLog(
          `Error deleting resource (${resourceType} ${resourceId}):`,
          error
        );
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
      <ErrorDisplay error={error} />
    </div>
  );
};

export default DeleteResourceButton;
