import logDevErrorHelper from "../../../server/helpers/logDevErrorHelper";

/**
 * Adds groupCode to local storage if it doesn't already exist
 *
 * @param {string} groupCode - The groupCode to add to local storage.
 * @returns {boolean} - Returns true if groupCode has been added to local storage, false in case of an error.
 */
const storeGroupCodesInLocalStorageHelper = (groupCode) => {
  try {
    let storedGroupCodes =
      JSON.parse(localStorage.getItem("storedGroupCodes")) || [];

    if (!storedGroupCodes.includes(groupCode)) {
      storedGroupCodes.push(groupCode);
      localStorage.setItem(
        "storedGroupCodes",
        JSON.stringify(storedGroupCodes)
      );
    }
    return true;
  } catch (error) {
    logDevErrorHelper("Error storing groupCode in local storage:", error);
    return false;
  }
};

export default storeGroupCodesInLocalStorageHelper;
