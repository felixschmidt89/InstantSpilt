// DONE adding only meaningful necessary comments

import logDevErrorHelper from "../../../server/helpers/logDevErrorHelper";
/**
 * Sets groupCode as currently active in local storage.
 *
 * @param {string} groupCode - The groupCode to set active
 * @returns {boolean} - Returns true if groupCode has been set active, false in case of an error.
 */
const setGroupCodeToCurrentlyActiveHelper = (groupCode) => {
  try {
    localStorage.setItem("activeGroupCode", groupCode);
    return true;
  } catch (error) {
    logDevErrorHelper("Error setting groupCode to active", error);
    return false;
  }
};

export default setGroupCodeToCurrentlyActiveHelper;
