import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupCodeHelper from '../helpers/obtainGroupObjectIdByGroupCodeHelper.js';

// TODO: Add duplicate error handling
export const createUser = async (req, res) => {
  try {
    const { userName, groupCode } = req.body;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);
    const user = await User.create({ userName, groupCode, groupObjectId });
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

export const listAllUsersByGroupCode = async (req, res) => {
  try {
    const groupCode = req.params.groupCode;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);
    const users = await User.find({ groupObjectId });
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

export const listAllUsersByGroupObjectId = async (req, res) => {
  try {
    const { groupObjectId } = req.params;
    const users = await User.find({ groupObjectId });
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

export const changeUserName = async (req, res) => {
  try {
    const { activeGroupObjectId, userName, newUserName } = req.body;

    groupObjectId = activeGroupObjectId;

    const updatedUser = await User.findOneAndUpdate(
      { userName, groupObjectId },
      { $set: { userName: newUserName } },
      { new: true },
    );

    res
      .status(StatusCodes.OK)
      .json({ message: 'User name updated successfully.', updatedUser });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error updating user name:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
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
