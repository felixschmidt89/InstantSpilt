// React and Third-Party Libraries
import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../utils/errorUtils";

// API URL
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

/**
 * Custom hook for validating the existence of a groupCode in the database.
 *
 * @param {string} groupCode - The groupCode to validate.
 * @param {string} [validationType="continuous"] - The type of validation to perform ("continuous" or "limited").
 * @returns {Object} - An object containing groupExists state, error state, and isValidated state.
 * @property {boolean|null} groupExists - Indicates whether the group code exists.
 * @property {string|null} error - An error message in case of an error during validation.
 * @property {boolean} isValidated - Indicates whether the validation has been completed.
 */
function useValidateGroupExistence(groupCode, validationType = "continuous") {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const validateGroup = async () => {
      try {
        devLog(`Validating groupCode ${groupCode} in database`);
        const endpoint =
          validationType === "limited"
            ? `${apiUrl}/groups/${groupCode}/limited-validate-existence`
            : `${apiUrl}/groups/${groupCode}/continuous-validate-existence`;

        const response = await axios.get(endpoint);

        if (response.data.exists === true) {
          setGroupExists(true);
          setIsValidated(true);
          devLog(`Groupcode ${groupCode} exists.`);
        } else {
          setGroupExists(false);
          setError(t("validate-groupcode-error-groupcode-does-not-exist"));
          setIsValidated(true);
          devLog(`Groupcode ${groupCode} does not exist.`);
        }
      } catch (error) {
        if (
          validationType === "limited" &&
          error.response &&
          error.response.status === StatusCodes.TOO_MANY_REQUESTS
        ) {
          setError(t("validate-groupcode-error-too-many-requests"));
          devLog("Too many validation requests from this IP address.", error);
        } else {
          devLog("Error validating group code:", error);
          setError(t("generic-error-message"));
        }
      }
    };

    validateGroup();
  }, [groupCode, validationType]);

  return { groupExists, error, isValidated };
}

export default useValidateGroupExistence;
