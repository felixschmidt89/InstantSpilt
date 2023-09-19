/**
 * Adds groupId to local storage if it doesn't already exist.
 *
 * @param {string} groupId - The groupId to add to local storage.
 * @returns {boolean} - Returns true if groupId has been added to local storage, false in case of an error.
 */
const storeGroupIdLocally = (groupId) => {
  try {
    let storedGroupIds = JSON.parse(localStorage.getItem('GroupIds'));

    if (!storedGroupIds) {
      storedGroupIds = [];
    }

    storedGroupIds.push(groupId);
    localStorage.setItem('GroupIds', JSON.stringify(storedGroupIds));

    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error storing groupId locally:', error);
    }
    return false;
  }
};

export default storeGroupIdLocally;
