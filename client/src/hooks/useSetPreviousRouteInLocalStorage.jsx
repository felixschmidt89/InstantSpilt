// React and Third-Party Libraries
import { useEffect } from "react";

// Constants and Utils
import { setRouteInLocalStorage } from "../utils/localStorageUtils";

/**
 * Custom hook to set the current route in localStorage for nested navigation.
 * @param {string} [key="previousRoute"] - The key under which the route is stored in localStorage. Defaults to "previousRoute". For further nested page, use "nestedPreviousRoute" as key.
 */
const useSetRouteInLocalStorage = (key = "previousRoute") => {
  useEffect(() => {
    setRouteInLocalStorage(window.location.pathname, key);
  }, [key]);
};

export default useSetRouteInLocalStorage;
