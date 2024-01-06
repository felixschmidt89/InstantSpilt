import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

function useValidateGroupExistence({ groupCode, limited = false }) {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const validateGroup = async () => {
      try {
        const endpoint = limited
          ? `${apiUrl}/groups/${groupCode}/limited-validate-existence`
          : `${apiUrl}/groups/${groupCode}/continuous-validate-existence`;

        const response = await axios.get(endpoint);

        if (response.data.data === false) {
          setGroupExists(false);
        } else {
          setGroupExists(true);
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
        } else {
          console.error("Error validating group code:", error);
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
