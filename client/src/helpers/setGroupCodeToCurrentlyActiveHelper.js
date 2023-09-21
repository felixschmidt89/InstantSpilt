/**
 * Sets groupCode as currently active in local storage.
 *
 * @param {string} groupCode - The groupCode to set active
 * @returns {boolean} - Returns true if groupCode has been set active, false in case of an error.
 */
const setGroupCodeToCurrentlyActive = (groupCode) => {
  try {
    localStorage.setItem("activeGroupCode", groupCode);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error setting groupCode to active:", error);
    }
    return false;
  }
};

export default setGroupCodeToCurrentlyActive;
