import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

function useValidateGroupExistence({ groupCode }) {
  const [groupExists, setGroupExists] = useState(null);

  useEffect(() => {
    const validateGroup = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/groups/${groupCode}/validate-existence`
        );
        console.log(response.data.data);
        if (response.data.data === false) {
          setGroupExists(false);
        } else {
          setGroupExists(true);
        }
      } catch (error) {
        console.error("Error validating group code:", error);
        setGroupExists(false); // In case of error, set groupExistence to false to prevent possible other issues.
      }
    };

    validateGroup();
  }, [groupCode]);

  return groupExists;
}

export default useValidateGroupExistence;
