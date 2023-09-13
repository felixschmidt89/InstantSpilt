import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import Group from '../models/Group.js';

// Define customAlphabet for groupId generation
const nanoid = customAlphabet('ACDEFGHIJKLMNOPQRSTUVWXYZ346789');

/**
 * Creates a new group with a globally unique group ID excluding those numbers and uppercase letters that are easily confused
 */
export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body;
    const groupId = nanoid(6); // Generate the unique group Id
    const group = await Group.create({ groupname, groupId });

    res.status(StatusCodes.CREATED).json({ message: 'Group created', group });
  } catch (error) {
    console.error('Error creating group:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

export const updateGroupName = async (req, res) => {
  try {
    const { groupId, groupname } = req.body;

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $set: { groupname } },
      { new: true }, // Return the updated document
    );

    res
      .status(StatusCodes.OK)
      .json({ message: 'Group name updated successfully.', updatedGroup });
  } catch (error) {
    console.error('Error updating group name:', error);
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
    console.error('Error listing all groups:', error);
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
    console.error('Error deleting all groups:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};
