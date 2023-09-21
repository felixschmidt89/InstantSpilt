import setGroupCodeToCurrentlyActive from "./setGroupCodeToCurrentlyActiveHelper";

/**
 * Adds groupCode to local storage if it doesn't already exist and sets it to currently active groupCode
 *
 * @param {string} groupCode - The groupCode to add to local storage.
 * @returns {boolean} - Returns true if groupCode has been added to local storage, false in case of an error.
 */
const storeGroupCodeInLocalStorage = (groupCode) => {
  try {
    let storedGroupCodes =
      JSON.parse(localStorage.getItem("storedGroupCodes")) || [];

    if (!storedGroupCodes.includes(groupCode)) {
      storedGroupCodes.push(groupCode);
      localStorage.setItem(
        "storedGroupCodes",
        JSON.stringify(storedGroupCodes)
      );
      setGroupCodeToCurrentlyActive(groupCode);
    }
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error storing groupCode locally:", error);
    }
    return false;
  }
};

export default storeGroupCodeInLocalStorage;
