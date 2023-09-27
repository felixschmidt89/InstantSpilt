import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

export const createUser = async (req, res) => {
  try {
    const { userName, groupCode } = req.body;
    const user = await User.create({ userName, groupCode });
    const userJson = user.toJSON();
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { userJson },
      message: 'User created successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error creating user:', error);
    sendInternalErrorHelper(res);
  }
};

export const listAllUsersByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;
    const users = await User.find({ groupCode });
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      data: { users },
      message: 'User list retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing group members by groupCode', error);
    sendInternalErrorHelper(res);
  }
};

export const changeUserName = async (req, res) => {
  try {
    const { groupCode, userName, newUserName } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { userName, groupCode },
      { $set: { userName: newUserName } },
      { new: true, runValidators: true },
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { updatedUser },
      message: 'User name updated successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error updating user name', error);
    sendInternalErrorHelper(res);
  }
};

// TODO: Add check to disallow deleting user if user has open payments
export const deleteUser = async (req, res) => {
  try {
    const { groupCode, userName } = req.body;

    await User.findOneAndDelete({
      userName,
      groupCode,
    });

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    logDevErrorHelper('Error updating user name', error);
    sendInternalErrorHelper(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      data: { users },
      message: 'Users retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing users', error);
    sendInternalErrorHelper(res);
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany();
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All users deleted successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error deleting all users:', error);
    sendInternalErrorHelper(res);
  }
};
