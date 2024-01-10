import { useState, useEffect } from "react";

/**
 * Custom hook for triggering component rerender.
 *
 * @returns {Object} - An object containing the groupCode, rerender trigger state, and a function to increment the rerender trigger.
 * @property {string} groupCode - The groupCode of the group associated with the rerender.
 * @property {number} rerenderTrigger - The state used to trigger a component rerender.
 * @property {function} incrementRerenderTrigger - Function to increment the rerender trigger state, triggering a component rerender.
 */
const useTriggerRerender = () => {
  const groupCode = localStorage.getItem("activeGroupCode");
  const [rerenderTrigger, setRerenderTrigger] = useState(1);

  const incrementRerenderTrigger = () => {
    setRerenderTrigger((prevValue) => prevValue + 1);
  };

  useEffect(() => {}, [groupCode, rerenderTrigger]);

  return {
    groupCode,
    rerenderTrigger,
    incrementRerenderTrigger,
  };
};

export default useTriggerRerender;
