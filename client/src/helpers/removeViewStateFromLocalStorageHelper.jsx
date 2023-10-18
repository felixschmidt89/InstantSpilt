// DONE adding only meaningful necessary comments

/**
 * Removes the 'viewState' property from local storage.
 * @returns {boolean} - Returns true if 'viewState' was successfully removed, false if there was an error.
 */
const removeViewStateFromLocalStorageHelper = () => {
  try {
    if (localStorage.getItem("viewState")) {
      localStorage.removeItem("viewState");
    }
    return true;
  } catch (error) {
    console.error("Error removing viewState from local storage:", error);
    return false;
  }
};

export default removeViewStateFromLocalStorageHelper;
