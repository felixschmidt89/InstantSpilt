import { useState, useEffect } from "react";
import { getRouteFromLocalStorage } from "../utils/localStorageUtils";

/**
 * Custom hook to get previous routes from localStorage.
 * @returns {{ previousRoute: string, nestedPreviousRoute: string, isRetrieved: boolean }} The retrieved previous routes and a boolean indicating whether the retrieval was successful.
 */
const useGetPreviousRoutesFromLocalStorage = () => {
  const [previousRoute, setPreviousRoute] = useState(null);
  const [nestedPreviousRoute, setNestedPreviousRoute] = useState(null);
  const [isRetrieved, setIsRetrieved] = useState(false);

  useEffect(() => {
    const retrievedPreviousRoute = getRouteFromLocalStorage("previousRoute");
    const retrievedNestedPreviousRoute = getRouteFromLocalStorage(
      "nestedPreviousRoute"
    );

    if (retrievedPreviousRoute !== null) {
      setPreviousRoute(retrievedPreviousRoute);
    }

    if (retrievedNestedPreviousRoute !== null) {
      setNestedPreviousRoute(retrievedNestedPreviousRoute);
    }

    setIsRetrieved(true);
  }, []);

  return { previousRoute, nestedPreviousRoute, isRetrieved };
};

export default useGetPreviousRoutesFromLocalStorage;
