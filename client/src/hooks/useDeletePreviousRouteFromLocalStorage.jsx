// React and Third-Party Libraries
import { useEffect } from "react";

// Constants and Utils
import { deleteRouteFromLocalStorage } from "../utils/localStorageUtils";

/**
 * Custom hook to delete nestedRoute keys from localStorage
 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 */
const useDeleteRouteFromLocalStorage = (key = "previousRoute") => {
  useEffect(() => {
    deleteRouteFromLocalStorage(key);
  }, []);
};

export default useDeleteRouteFromLocalStorage;
