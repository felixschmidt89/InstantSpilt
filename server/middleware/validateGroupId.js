import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group.js';

const validateGroupId = async (req, res, next) => {
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
    if (process.env.NODE_ENV === 'development') {
      console.error('Error validating provided group ID existence:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

export default validateGroupId;
