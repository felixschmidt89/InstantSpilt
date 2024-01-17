import { devLog } from "./errorUtils";
/**
 * Removes the 'activeGroupCode' property from local storage.
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */
export const removeActiveGroupCodeFromLocalStorage = () => {
  try {
    if (localStorage.getItem("activeGroupCode")) {
      localStorage.removeItem("activeGroupCode");
    }
    devLog("Active groupCode has been removed from local storage.");
    return true;
  } catch (error) {
    devLog("Error removing activeGroupCode from local storage:", error);
    return false;
  }
};

/**
 * Removes the 'activeGroupCode' from the storedGroupCodes array from local storage (and the whole array if it is empty then)
 *
 * @returns {boolean} - Returns true if 'activeGroupCode' was successfully removed, false if there was an error.
 */

export const removeActiveGroupCodeFromStoredGroupCodes = (groupCode) => {
  try {
    // Get the storedGroupCodes array from local storage
    const storedGroupCodes = JSON.parse(
      localStorage.getItem("storedGroupCodes")
    );

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
    devLog(
      "Active group code has been removed from storedGroupCodes array in local storage."
    );
    return true;
  } catch (error) {
    devLog("Error removing groupCode from storedGroupCodes:", error);
    return false;
  }
};

/**
 * Removes the 'viewState' property from local storage.
 * @returns {boolean} - Returns true if 'viewState' was successfully removed, false if there was an error.
 */
export const removeViewStateFromLocalStorage = () => {
  try {
    if (localStorage.getItem("viewState")) {
      localStorage.removeItem("viewState");
    }
    devLog("ViewState has been removed from local storage.");
    return true;
  } catch (error) {
    devLog("Error removing viewState from local storage:", error);
    return false;
  }
};

/**
 * Sets groupCode as currently active in local storage.
 *
 * @param {string} groupCode - The groupCode to set active
 * @returns {boolean} - Returns true if groupCode has been set active, false in case of an error.
 */
export const setGroupCodeToCurrentlyActive = (groupCode) => {
  try {
    localStorage.setItem("activeGroupCode", groupCode);
    devLog("GroupCode set to active:", groupCode);
    return true;
  } catch (error) {
    devLog("Error setting groupCode to active", error);
    return false;
  }
};

/**
 * Adds groupCode to array of storedGroupCode in local storage if it doesn't already exist
 *
 * @param {string} groupCode - The groupCode to add to storedGroupCodes array
 * @returns {boolean} - Returns true if groupCode has been added to local storage, false in case of an error.
 */
export const storeGroupCodeInLocalStorage = (groupCode) => {
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
    devLog(
      "GroupCode has been added to storedGroupCodes array in local storage:",
      groupCode
    );
    return true;
  } catch (error) {
    devLog("Error storing groupCode in local storage:", error);
    return false;
  }
};

/**
 * Stores the current route in localStorage for nested navigation.
 * @param {string} route - The route to set in localStorage.
 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 * @returns {null}
 */
export const setRouteInLocalStorage = (route, key = "previousRoute") => {
  localStorage.setItem(key, route);
  devLog(`${key} set in local storage:`, route);
  return null;
};

/**
 * Gets the previousRoute from localStorage.
 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 * @returns {string} The retrieved route.
 */
export const getRouteFromLocalStorage = (key = "previousRoute") => {
  const route = localStorage.getItem(key) || `No ${key} stored.`;
  devLog(`${key} retrieved from local storage:`, route);
  return route;
};

/**
 * Deletes the previousRoute from localStorage.

 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 */
export const deleteRouteFromLocalStorage = (key = "previousRoute") => {
  localStorage.removeItem(key);
  devLog(`${key} removed from local storage`);
};

/**
 * Deletes application data from local storage, including viewState, previousRoute, and nestedPreviousRoute.
 */
export const deleteApplicationDataFromLocalStorage = () => {
  removeViewStateFromLocalStorage();
  deleteRouteFromLocalStorage("previousRoute");
  deleteRouteFromLocalStorage("nestedPreviousRoute");
};

/**
 * Deletes data related to the provided group code from local storage:
 * - Deletes activeGroupCode.
 * - Removes activeGroupCode from the storedGroupCodes array.
 * - Deletes storedGroupCodes array if it becomes empty.
 *
 * @param {string} groupCode - The groupCode identifying the group.
 */
export const deleteGroupDataFromLocalStorage = (groupCode) => {
  removeActiveGroupCodeFromStoredGroupCodes(groupCode);
  removeActiveGroupCodeFromLocalStorage();
};
