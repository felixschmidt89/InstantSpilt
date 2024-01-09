import { useState, useEffect } from "react";

/**
 * Custom hook for managing data refreshing.
 *
 * @returns {Object} - An object containing the groupCode, refresh data state, and a function to toggle data refresh.
 */
const useDataRefresh = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const [refreshData, setRefreshData] = useState(false);

  const toggleDataRefresh = () => {
    setRefreshData((prevRefreshData) => !prevRefreshData);
  };

  useEffect(() => {}, [groupCode, refreshData]);

  return {
    groupCode,
    refreshData,
    toggleDataRefresh,
  };
};

export default useDataRefresh;
