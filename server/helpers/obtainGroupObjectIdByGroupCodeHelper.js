import Group from '../models/Group.js';

/**
 * Obtains the groupObjectId of a group by its groupCode.
 *
 * @param {string} groupCode - The groupCode to search for.
 * @returns {Promise<string>} - The groupObjectId of the group.
 * @throws {Error} if the groupObjectId is not found.
 */

const obtainGroupObjectIdByGroupCodeHelper = async (groupCode) => {
  try {
    const group = await Group.findOne({ groupCode });
    if (!group) {
      throw new Error(`Group with groupCode "${groupCode}" not found`);
    }
    return group._id;
  } catch (error) {
    console.error('Error obtaining group ObjectId:', error);
    throw error;
  }
};

export default obtainGroupObjectIdByGroupCodeHelper;
