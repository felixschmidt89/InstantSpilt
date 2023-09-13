import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group.js';

export const validateGroupExistence = async (req, res, next) => {
  try {
    const groupId = req.params.groupId || req.body.groupId;

    if (!groupId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Group ID not provided' });
    }

    if (!(await Group.exists({ groupId: groupId }))) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Group not found' });
    }

    next();
  } catch (error) {
    console.error('Error checking group existence:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};
