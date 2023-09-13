import { StatusCodes } from 'http-status-codes';
import { customAlphabet } from 'nanoid';
import Group from '../models/Group.js';

// Define customAlphabet for groupID generation, excluding those numbers and uppercase letters that are easily confused
const nanoid = customAlphabet('ACDEFGHIJKLMNOPQRSTUVWXYZ346789');

/**
 * Creates a new group with a unique group ID
 */
export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body;
    const groupID = nanoid(6); // Generate a unique short identifier
    const group = await Group.create({ groupname, groupID });

    res.status(StatusCodes.CREATED).json({ message: 'Group created', group });
  } catch (error) {
    console.error('Error creating group:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};
