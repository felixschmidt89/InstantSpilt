import { useState, useEffect } from "react";

/**
 * Custom hook to manage the toggle logic in parent component for inactive data purge setting.
 * @param {boolean} isFetched - Indicates whether the group data has been fetched.
 * @param {object} groupData - The group data containing the inactive data purge setting.
 * returns {{ inactiveDataPurge: boolean, handleToggleInactiveDataPurge: function }} - An object containing the inactive data purge state and a function to toggle it.
 */
const useInactiveDataPurgeToggleLogic = (isFetched, groupData) => {
  const [inactiveDataPurge, setInactiveDataPurge] = useState(true);

  useEffect(() => {
    if (isFetched && groupData) {
      setInactiveDataPurge(groupData.group.inactiveDataPurge);
    }
  }, [isFetched, groupData]);

  const handleToggleInactiveDataPurge = () => {
    setInactiveDataPurge((prevState) => !prevState);
  };

  return { inactiveDataPurge, handleToggleInactiveDataPurge };
};

export default useInactiveDataPurgeToggleLogic;
