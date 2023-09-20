import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupIdHelper from '../helpers/obtainGroupObjectIdByGroupId.js';

export const createUser = async (req, res) => {
  try {
    const { userName, groupId } = req.body;
    const linkedGroup = await obtainGroupObjectIdByGroupIdHelper(groupId);
    const user = await User.create({ userName, groupId, linkedGroup });
    res.status(StatusCodes.CREATED).json({ message: 'User created', user });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating user:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

export const listAllUsersByGroupId = async (req, res) => {
  try {
    const { groupId } = req.body;
    const linkedGroup = await obtainGroupObjectIdByGroupIdHelper(groupId);
    const users = await User.find({ linkedGroup });
    res.status(StatusCodes.OK).json({ message: 'Userlist', users });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error finding users:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

// DEVELOPMENT AND DEBUGGING

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error listing all users:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};
