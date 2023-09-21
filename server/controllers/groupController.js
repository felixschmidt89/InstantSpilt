import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import isGroupCodeUnique from '../helpers/isGroupCodeUniqueHelper.js';
import obtainGroupObjectIdByGroupCodeHelper from '../helpers/obtainGroupObjectIdByGroupCode.js';
import Group from '../models/Group.js';

// Define customAlphabet for groupCode generation (excluding those numbers and uppercase letters that are easily confused)
const nanoid = customAlphabet('ACDEFGHIJKLMNOPQRSTUVWXYZ346789');

/**
 * Creates a new group with a globally unique group ID
 */
export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    let groupCode;
    let isUnique = false;

    // Generate globally unique groupCode
    while (!isUnique) {
      groupCode = nanoid(6);
      isUnique = await isGroupCodeUnique(groupCode);
    }

    const group = await Group.create({ groupName, groupCode });

    res.status(StatusCodes.CREATED).json({ message: 'Group created', group });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating group:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

export const changeGroupName = async (req, res) => {
  try {
    const { groupCode, groupName } = req.body;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);

    const updatedGroup = await Group.findByIdAndUpdate(
      groupObjectId,
      { $set: { groupName } },
      { new: true },
    );

    res
      .status(StatusCodes.OK)
      .json({ message: 'Group name updated successfully.', updatedGroup });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error updating group name:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

export const listAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(StatusCodes.OK).json({ groups });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error listing all groups:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

export const deleteAllGroups = async (req, res) => {
  try {
    await Group.deleteMany({});
    res
      .status(StatusCodes.OK)
      .json({ message: 'All groups deleted successfully.' });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error deleting all groups:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};
