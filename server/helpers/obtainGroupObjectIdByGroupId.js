import Group from '../models/Group.js';

const obtainGroupObjectIdByGroupIdHelper = async (groupId) => {
  try {
    const group = await Group.findOne({ groupId }).exec();
    if (!group) {
      throw new Error(`Group with groupId "${groupId}" not found`);
    }
    return group._id;
  } catch (error) {
    console.error('Error obtaining group ObjectId:', error);
    throw error;
  }
};

export default obtainGroupObjectIdByGroupIdHelper;
