/**
 * Sets groupId as currently active in local storage.
 *
 * @param {string} groupId - The groupId to set active
 * @returns {boolean} - Returns true if groupId has been set active, false in case of an error.
 */
const setGroupIdToCurrentlyActive = (groupId) => {
  try {
    localStorage.setItem('activeGroupId', groupId);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error setting groupId to active:', error);
    }
    return false;
  }
};

export default setGroupIdToCurrentlyActive;
