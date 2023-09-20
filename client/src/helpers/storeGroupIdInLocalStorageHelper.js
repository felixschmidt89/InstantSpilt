import setGroupIdToCurrentlyActive from './setGroupIdToCurrentlyActiveHelper';

/**
 * Adds groupId to local storage if it doesn't already exist and sets it to currently active groupId
 *
 * @param {string} groupId - The groupId to add to local storage.
 * @returns {boolean} - Returns true if groupId has been added to local storage, false in case of an error.
 */
const storeGroupIdInLocalStorage = (groupId) => {
  try {
    let storedGroupIds =
      JSON.parse(localStorage.getItem('storedGroupIds')) || [];

    if (!storedGroupIds.includes(groupId)) {
      storedGroupIds.push(groupId);
      localStorage.setItem('storedGroupIds', JSON.stringify(storedGroupIds));
      setGroupIdToCurrentlyActive(groupId);
    }
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error storing groupId locally:', error);
    }
    return false;
  }
};

export default storeGroupIdInLocalStorage;
