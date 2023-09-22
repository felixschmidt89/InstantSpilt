import { StatusCodes } from 'http-status-codes';
import Group from '../models/Group.js';

const validateGroupObjectId = async (req, res, next) => {
  try {
    const groupObjectId = req.params.groupObjectId || req.body.groupObjectId;
    console.log(groupObjectId);
    if (!groupObjectId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'GroupObjectId not provided' });
    }

    if (!(await Group.exists({ _id: groupObjectId }))) {
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

export default validateGroupObjectId;
