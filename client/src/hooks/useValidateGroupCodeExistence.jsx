import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { devLog } from "../utils/errorUtils";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

function useValidateGroupExistence({ groupCode, limited = false }) {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

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
          setStatusCode(StatusCodes.TOO_MANY_REQUESTS);
          devLog(`Too many limited validation requests from this IP address.`);
        } else {
          devLog("Error validating group code:", error);
          setError("An error occurred. Please try again later.");
          setStatusCode(null);
        }
      }
    };

    validateGroup();
  }, [groupCode, limited]);

  return [groupExists, error, statusCode];
}

export default useValidateGroupExistence;
