// React and Third-Party Libraries
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  getFirstGroupCodeInStoredGroupCodesArray,
  setGroupCodeToCurrentlyActive,
} from "../utils/localStorageUtils";

/**
 * Checks for the presence of an active group code in local storage.
 * If no active group code is found, it pulls the first inactive groupCode from storedGroupCodes array, sets it to active and navigates to the main application.
 *
 * @returns {void}
 */
const useGetActiveGroupCodeOrSetNextInactiveGroupCodeToActiveAndNavigateToMainApplication =
  () => {
    const navigate = useNavigate();

    useEffect(() => {
      const getActiveGroupCodeOrSetNextGroupCodeToActive = () => {
        const groupCode =
          localStorage.getItem("activeGroupCode") ||
          (() => {
            const nextGroupCode = getFirstGroupCodeInStoredGroupCodesArray();
            setGroupCodeToCurrentlyActive(nextGroupCode);
            return nextGroupCode;
          })();
        return groupCode;
      };

      const groupCode = getActiveGroupCodeOrSetNextGroupCodeToActive();
      // Exit early if no activeGroupCode
      if (groupCode === null) {
        return;
      }
      navigate("/instant-split");
    }, [navigate]);
  };
export default useGetActiveGroupCodeOrSetNextInactiveGroupCodeToActiveAndNavigateToMainApplication;
