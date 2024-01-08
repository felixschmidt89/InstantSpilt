import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import { setLastActive } from '../utils/databaseUtils.js';
import { errorLog, sendInternalError } from '../utils/errorUtils.js';

export const createUser = async (req, res) => {
  try {
    const { userName, groupCode } = req.body;
    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    // Check if a user with the same name and group code already exists
    const existingUser = await User.findOne({ userName, groupCode });

    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message:
          'Oops! This name is already taken in this group. Please pick another one.',
      });
    }

    const user = await User.create({ userName, groupCode });
    res.status(StatusCodes.CREATED).json({
      status: 'success',
      user,
      message: 'User created successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error creating user:',
      'Failed to create user. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const groupCode = user.groupCode;

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    res.status(StatusCodes.OK).json({
      status: 'success',
      user,
      message: 'User info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving user info:',
      'Failed to retrieve user information. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const changeUserName = async (req, res) => {
  try {
    const { groupCode, userName, newUserName } = req.body;
    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    const updatedUser = await User.findOneAndUpdate(
      { userName, groupCode },
      { $set: { userName: newUserName } },
      { new: true, runValidators: true },
    );

    res.status(StatusCodes.OK).json({
      status: 'success',
      updatedUser,
      message: 'User name updated successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error updating user name:',
      'Failed to update user name. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const listExpensesAndPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [expenses, payments] = await Promise.all([
      Expense.find({
        $or: [{ expensePayer: userId }, { expenseBeneficiaries: userId }],
      })
        .populate('expensePayer', 'userName')
        .populate('expenseBeneficiaries', 'userName'),
      Payment.find({
        $or: [{ paymentMaker: userId }, { paymentRecipient: userId }],
      })
        .populate('paymentMaker', 'userName')
        .populate('paymentRecipient', 'userName'),
    ]);

    const userExpensesAndPayments = [...expenses, ...payments];
    userExpensesAndPayments.sort((a, b) => a.createdAt - b.createdAt);

    res.status(StatusCodes.OK).json({
      status: 'success',
      results: userExpensesAndPayments.length,
      expenseCount: expenses.length,
      paymentCount: payments.length,
      userExpensesAndPayments,
      message: 'All user expenses and payments retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing user expenses and payments:',
      'Failed to list user expenses and payments. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user has associated transactions
    const [expenses, payments] = await Promise.all([
      Expense.find({
        $or: [{ expensePayer: userId }, { expenseBeneficiaries: userId }],
      }),
      Payment.find({
        $or: [{ paymentMaker: userId }, { paymentRecipient: userId }],
      }),
    ]);

    // Disallow deleting the user if there are associated transactions
    if (expenses.length > 0 || payments.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message:
          "Can't delete the user because of associated transactions. Please remove the user from all of them first.",
      });
    }

    const userToDelete = await User.findOne({
      _id: userId,
    });

    const groupCode = userToDelete.groupCode;
    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    await User.deleteOne({ _id: userToDelete._id });

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting user:',
      'Failed to delete user. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const listAllUsersByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;
    // Set the lastActive property of the group to now
    setLastActive(groupCode);
    const users = await User.find({ groupCode });

    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      users,
      message: 'User list retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing group members by groupCode:',
      'Failed to list group members. Please try again later.',
    );
    sendInternalError(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      users,
      message: 'All users retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing all users:',
      'Failed to list all users. Please try again later.',
    );
    sendInternalError(res);
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
    errorLog(
      error,
      'Error deleting all users:',
      'Failed to delete all users. Please try again later.',
    );
    sendInternalError(res);
  }
};
