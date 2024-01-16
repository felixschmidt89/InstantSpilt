// React and Third-Party Libraries
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  deleteGroupDataFromLocalStorage,
  removeActiveGroupCodeFromLocalStorage,
  removeActiveGroupCodeFromStoredGroupCodes,
} from "../utils/localStorageUtils";

// Hooks
import useValidateGroupExistence from "./useValidateGroupCodeExistence";

/**
 * Custom hook to authenticate the active group code of a user. Removes invalid activeGroupCode from local storage and navigates to homepage
 *
 * @param {string} groupCode - The groupCode to be authenticated.
 */
const useAuthenticateUsersActiveGroupCode = (groupCode) => {
  const navigate = useNavigate();
  // Check if groupCode is falsy
  if (!groupCode) {
    navigate("/homepage/");
  }
  // Check if groupCode is valid
  const { groupExists } = useValidateGroupExistence(groupCode, "continuous");

  useEffect(() => {
    if (groupExists === false) {
      deleteGroupDataFromLocalStorage(groupCode);
      navigate("/homepage/");
    }
  }, [navigate, groupCode, groupExists]);
};

export default useAuthenticateUsersActiveGroupCode;
