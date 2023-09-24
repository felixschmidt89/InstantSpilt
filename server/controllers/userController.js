import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupCodeHelper from '../helpers/obtainGroupObjectIdByGroupCodeHelper.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

// TODO: Add duplicate error handling
export const createUser = async (req, res) => {
  try {
    const { userName, groupCode } = req.body;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);
    const user = await User.create({ userName, groupCode, groupObjectId });
    res.status(StatusCodes.CREATED).json({ message: 'User created', user });
  } catch (error) {
    logDevErrorHelper('Error creating user:', error);
    sendInternalErrorHelper(res);
  }
};

export const listAllUsersByGroupCode = async (req, res) => {
  try {
    const groupCode = req.params.groupCode;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);
    const users = await User.find({ groupObjectId });
    res.status(StatusCodes.OK).json({ message: 'Userlist', users });
  } catch (error) {
    logDevErrorHelper('Error listing group members by groupCode', error);
    sendInternalErrorHelper(res);
  }
};

export const listAllUsersByGroupObjectId = async (req, res) => {
  try {
    const { groupObjectId } = req.params;
    const users = await User.find({ groupObjectId });
    res.status(StatusCodes.OK).json({ message: 'Userlist', users });
  } catch (error) {
    logDevErrorHelper('Error listing group members by groupObjectId', error);
    sendInternalErrorHelper(res);
  }
};

export const changeUserName = async (req, res) => {
  try {
    const { activeGroupObjectId, userName, newUserName } = req.body;

    const groupObjectId = activeGroupObjectId;

    const updatedUser = await User.findOneAndUpdate(
      { userName, groupObjectId },
      { $set: { userName: newUserName } },
      { new: true },
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        message: 'User name updated successfully.',
        updatedUser: updatedUser,
      },
    });
  } catch (error) {
    logDevErrorHelper('Error updating user name', error);
    sendInternalErrorHelper(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    logDevErrorHelper('Error listing users', error);
    sendInternalErrorHelper(res);
  }
};
