import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import isGroupCodeUniqueHelper from '../helpers/isGroupCodeUniqueHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';
import Group from '../models/Group.js';

// Define customAlphabet for groupCode generation (excluding those numbers and uppercase letters that are easily confused)
const nanoid = customAlphabet('ACDEFGHIJKLMNOPQRSTUVWXYZ346789');

/**
 * Creates a new group with a globally unique group ID
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    let groupCode;
    let isUnique = false;

    // Generate globally unique groupCode
    while (!isUnique) {
      groupCode = nanoid(6);
      isUnique = await isGroupCodeUniqueHelper(groupCode);
    }

    const group = await Group.create({ groupName, groupCode });

    res.status(StatusCodes.CREATED).json({ message: 'Group created', group });
  } catch (error) {
    logDevErrorHelper('Erorr creating group:', error);
    sendInternalErrorHelper(res);
  }
};

export const changeGroupName = async (req, res) => {
  try {
    const { groupCode, groupName } = req.body;
    const group = await Group.findOneAndUpdate({ groupCode });

    const updatedGroup = await Group.findByIdAndUpdate(
      group._id,
      { $set: { groupName } },
      { new: true },
    );
    res
      .status(StatusCodes.OK)
      .json({ message: 'Group name updated successfully.', updatedGroup });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      logDevErrorHelper('Error updating group name:', error);
      sendInternalErrorHelper(res);
    }
  }
};

export const listGroupNamesByStoredGroupCodes = async (req, res) => {
  try {
    const { storedGroupCodes } = req.query;
    const groupCodesArray = storedGroupCodes.split(',');
    const groups = await Group.find({ groupCode: { $in: groupCodesArray } });
    const groupNames = groups.map((group) => group.groupName);
    res.status(StatusCodes.OK).json({ groupNames });
  } catch (error) {
    logDevErrorHelper('Error listing group names:', error);
    sendInternalErrorHelper(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(StatusCodes.OK).json({ groups });
  } catch (error) {
    logDevErrorHelper('Error listing all groups:', error);
    sendInternalErrorHelper(res);
  }
};

export const deleteAllGroups = async (req, res) => {
  try {
    await Group.deleteMany({});
    res
      .status(StatusCodes.OK)
      .json({ message: 'All groups deleted successfully.' });
  } catch (error) {
    logDevErrorHelper('Error deleting all groups:', error);
    sendInternalErrorHelper(res);
  }
};
