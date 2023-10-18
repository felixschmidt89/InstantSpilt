// DONE adding only meaningful necessary comments

/**
 * Removes the 'activeGroupCode' from the storedGroupCodes array from local storage (and the whole array if it is empty then)
 *
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */

const removeActiveGroupCodeFromStoredGroupCodesHelper = (groupCode) => {
  try {
    // Get the storedGroupCodes array from local storage
    const storedGroupCodes =
      JSON.parse(localStorage.getItem("storedGroupCodes")) || [];

    // Find the index of the activeGroupCode in the array
    const index = storedGroupCodes.findIndex((code) => code === groupCode);

    if (index !== -1) {
      // Remove the activeGroupCode from the array
      storedGroupCodes.splice(index, 1);

      if (storedGroupCodes.length === 0) {
        // If the array is empty, delete the property from local storage
        localStorage.removeItem("storedGroupCodes");
      } else {
        // Update the storedGroupCodes in local storage
        localStorage.setItem(
          "storedGroupCodes",
          JSON.stringify(storedGroupCodes)
        );
      }
    }

    return true;
  } catch (error) {
    console.error("Error removing groupCode from storedGroupCodes:", error);
    return false;
  }
};

export default removeActiveGroupCodeFromStoredGroupCodesHelper;
