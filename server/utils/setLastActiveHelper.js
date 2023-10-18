import Group from '../models/Group.js';

/**
 * Updates the lastActive property of a group with the specified groupCode.
 * @param {string} groupCode - group to update.
 * @returns {Promise<void>} - promise that resolves when the update is complete.
 * @throws {Error} - Throws an error if there is an issue setting lastActive or if the group is not found.
 */
const setLastActiveHelper = async (groupCode) => {
  try {
    const group = await Group.findOne({ groupCode });
    if (group) {
      await group.setLastActive();
    } else {
      console.error('Group not found.');
    }
  } catch (error) {
    console.error('Error setting lastActive:', error);
    throw error;
  }
};

export default setLastActiveHelper;
