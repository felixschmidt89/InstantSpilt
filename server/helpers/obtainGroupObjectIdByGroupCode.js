import Group from '../models/Group.js';

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
