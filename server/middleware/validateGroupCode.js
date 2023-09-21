import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group.js';

const validateGroupCode = async (req, res, next) => {
  try {
    const groupCode = req.params.groupCode || req.body.groupCode;

    if (!groupCode) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'GroupCode not provided' });
    }

    if (!(await Group.exists({ groupCode: groupCode }))) {
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

export default validateGroupCode;
