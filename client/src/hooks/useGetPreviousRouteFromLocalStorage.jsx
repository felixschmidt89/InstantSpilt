// React and Third-Party Libraries
import { useEffect, useState } from "react";

// Constants and Utils
import { getRouteFromLocalStorage } from "../utils/localStorageUtils";

/**
 * Custom hook to get previousRoute from localStorage.
 * @param {string} [key="previousRoute"] - The key under which the previousRoute is stored in localStorage. Defaults to "previousRoute". For further nested pages, use "nestedPreviousRoute" as key.
 *  @returns {[string, boolean]} The retrieved previousRoute and a boolean indicating whether the retrieval was successful.
 */
const useGetPreviousRouteFromLocalStorage = (key = "previousRoute") => {
  const [previousRoute, setPreviousRoute] = useState("");
  const [isRetrieved, setIsRetrieved] = useState(false);

  useEffect(() => {
    const retrievedRoute = getRouteFromLocalStorage(key);
    if (retrievedRoute !== null) {
      setPreviousRoute(retrievedRoute);
    }
    setPreviousRoute("No previous route stored.");
    setIsRetrieved(true);
  }, [key]);

  return { previousRoute, isRetrieved };
};

export default useGetPreviousRouteFromLocalStorage;
