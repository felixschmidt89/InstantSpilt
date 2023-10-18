// DONE adding only meaningful necessary comments

/**
 * Removes the 'activeGroupCode' property from local storage.
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */
const removeViewStateFromLocalStorageHelper = () => {
  try {
    localStorage.removeItem("viewState");
    return true;
  } catch (error) {
    console.error("Error removing viewState from local storage:", error);
    return false;
  }
};

export default removeViewStateFromLocalStorageHelper;
