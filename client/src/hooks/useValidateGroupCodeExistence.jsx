import { useEffect, useState } from "react";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

function useValidateGroupExistence({ groupCode }) {
  const [groupExists, setGroupExists] = useState(null);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const validateGroup = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/${groupCode}/validate-existence`
        );
        if (response.data.data === false) {
          setGroupExists(false);
        } else {
          setGroupExists(true);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status === StatusCodes.TOO_MANY_REQUESTS
        ) {
          setError("Too many requests. Please try again later.");
          setStatusCode(StatusCodes.TOO_MANY_REQUESTS);
        } else {
          console.error("Error validating group code:", error);
          setError("An error occurred. Please try again later.");
          setStatusCode(null);
        }
      }
    };

    validateGroup();
  }, [groupCode]);

  return [groupExists, error, statusCode];
}

export default useValidateGroupExistence;
