import Group from '../models/Group.js';

/** Checks if groupId is unique in database
 *
 * @param {string} groupId -
 * @returns {Promise<boolean>} - Returns true if groupId is unique, false if it already exists.
 * @throws {Error} - Throws an error if there's an issue with the database or the uniqueness check.
 */

const isGroupIdUnique = async (groupId) => {
  try {
    const existingGroup = await Group.findOne({ groupId: groupId });
    return !existingGroup;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking groupId uniqueness:', error);
    }
    throw new Error(
      'An error occurred while checking groupId uniqueness. Please try again later.',
    );
  }
};

export default isGroupIdUnique;
