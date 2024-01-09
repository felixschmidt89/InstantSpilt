import { useState, useEffect } from "react";

/**
 * Custom hook for triggering component rerender.
 *
 * @returns {Object} - An object containing the groupCode, rerender trigger state, and a function to toggle rerender.
 */
const useTriggerRerender = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const [rerenderTrigger, setRerenderTrigger] = useState(1);

  const toggleRerender = () => {
    setRerenderTrigger((prevValue) => prevValue + 1);
  };

  useEffect(() => {}, [groupCode, rerenderTrigger]);

  return {
    groupCode,
    rerenderTrigger,
    toggleRerender,
  };
};

export default useTriggerRerender;
