import { StatusCodes } from 'http-status-codes';
import shortid from 'shortid';
import Group from '../models/Group.js';

/**
 * Creates a new group with a unique group ID
 */
export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body;
    const groupID = shortid.generate(); // Generate a unique short identifier

    const group = await Group.create({ groupname, groupID });

    res.status(StatusCodes.CREATED).json(group);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
