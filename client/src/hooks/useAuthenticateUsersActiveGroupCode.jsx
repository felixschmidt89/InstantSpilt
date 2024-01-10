// React and Third-Party Libraries
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Constants and Utils
import {
  removeActiveGroupCodeFromLocalStorage,
  removeActiveGroupCodeFromStoredGroupCodes,
} from "../utils/localStorageUtils";

// Hooks
import useValidateGroupExistence from "./useValidateGroupCodeExistence";

/**
 * Custom hook to authenticate the active group code of a user.
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
  const [groupExists] = useValidateGroupExistence(groupCode);

  // If not, delete it from LocalStorage and navigate to homepage
  useEffect(() => {
    if (groupExists === false) {
      removeActiveGroupCodeFromStoredGroupCodes(groupCode);
      removeActiveGroupCodeFromLocalStorage();
      navigate("/homepage/");
    }
  }, [navigate, groupCode, groupExists]);
};

export default useAuthenticateUsersActiveGroupCode;
