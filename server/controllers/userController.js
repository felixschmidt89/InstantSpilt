import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import Expense from '../models/Expense.js';
import Payment from '../models/Payment.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

export const createUser = async (req, res) => {
  try {
    const { userName, groupCode } = req.body;

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
      data: { user },
      message: 'User created successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error creating user:', error);
    sendInternalErrorHelper(res);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { user },
      message: 'User info retrieved successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error retrieving user info', error);
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

export const listExpensesAndPaymentsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [expenses, payments] = await Promise.all([
      Expense.find({
        $or: [{ expensePayer: userId }, { expenseBeneficiaries: userId }],
      }),
      Payment.find({
        $or: [{ paymentMaker: userId }, { paymentRecipient: userId }],
      }),
    ]);

    const userExpensesAndPayments = [...expenses, ...payments];
    userExpensesAndPayments.sort((a, b) => a.createdAt - b.createdAt);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        results: userExpensesAndPayments.length,
        expenseCount: expenses.length,
        paymentCount: payments.length,
        userExpensesAndPayments,
      },
      message: 'All user expenses and payments retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing user expenses and payments', error);
    sendInternalErrorHelper(res);
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

    await User.deleteOne({ _id: userToDelete._id });

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    logDevErrorHelper('Error deleting user', error);
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

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: users.length,
      data: { users },
      message: 'All users retrieved successfully',
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
