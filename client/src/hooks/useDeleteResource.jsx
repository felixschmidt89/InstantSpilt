// React and Third-Party Libraries
import { useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useNavigate } from "react-router-dom";
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// Constants and Utils

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for handling the deletion of a resource.
 *
 * @param {string} resourceType - The singular form of the resource type (e.g., "expense", "payment").
 * @param {string} resourceId - The unique identifier of the resource.
 * @param {string} route - The route to navigate to after successful deletion.
 *
 * @returns {Object} An object containing the deleteResource function and any potential error.
 * @property {Function} deleteResource - The function to trigger the deletion of the resource.
 * @property {string} error - An error message, if any, during the deletion process.
 */
const useDeleteResource = (resourceType, resourceId, route) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const resourceTypeSingular = resourceType.slice(0, -1);

  const deleteResource = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/${resourceType}/${resourceId}`
      );
      if (response.status === StatusCodes.NO_CONTENT) {
        setError(null);
        devLog(`Resource (${resourceType} ${resourceId}) has been deleted.`);
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
        setError(genericErrorMessage);
      }
    }
  };

  return { deleteResource, resourceTypeSingular, error };
};

export default useDeleteResource;
