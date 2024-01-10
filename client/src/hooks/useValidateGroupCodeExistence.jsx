// React and Third-Party Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

// Constants and Utils
import { devLog } from "../utils/errorUtils";
import { genericErrorMessage } from "../constants/errorConstants";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for validating the existence of a groupCode in the database.
 *
 * @param {string} groupCode - The groupCode to validate.
 * @param {boolean} [limited=false] - Whether to perform limited validation (limited attempts per IP address).
 * @returns {Array} - An array containing groupExists state and error state.
 * @property {boolean|null} groupExists - Indicates whether the group code exists.
 * @property {string|null} error - An error message in case of an error during validation.
 */
function useValidateGroupExistence(groupCode, limited = false) {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateGroup = async () => {
      try {
        devLog(`Validating code ${groupCode} in database`);
        const endpoint = limited
          ? `${apiUrl}/groups/${groupCode}/limited-validate-existence`
          : `${apiUrl}/groups/${groupCode}/continuous-validate-existence`;

        const response = await axios.get(endpoint);

        if (response.data === false) {
          setGroupExists(false);
          devLog(`Groupcode ${groupCode} does not exist.`);
        } else {
          setGroupExists(true);
          devLog(`Groupcode ${groupCode} does exist.`);
        }
      } catch (error) {
        if (
          limited &&
          error.response &&
          error.response.status === StatusCodes.TOO_MANY_REQUESTS
        ) {
          setError(
            "Too many requests for limited validation. Please try again later."
          );
          devLog(`Too many limited validation requests from this IP address.`);
        } else {
          devLog("Error validating group code:", error);
          setError(genericErrorMessage);
        }
      }
    };

    validateGroup();
  }, [groupCode, limited]);

  return [groupExists, error];
}

export default useValidateGroupExistence;
