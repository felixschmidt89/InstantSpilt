import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

import Expense from '../models/Expense.js';
import User from '../models/User.js';

import { devLog, errorLog, sendInternalError } from '../utils/errorUtils.js';
import { setLastActive } from '../utils/databaseUtils.js';

/** Creates a new expense
 *  Updates totalExpenseAmountPaid by expense payer and totalExpenseBenefittedAmount from by expense beneficiaries
 */
export const createExpense = async (req, res) => {
  try {
    const {
      expensePayer,
      groupCode,
      expenseDescription,
      expenseAmount,
      expenseBeneficiariesNames,
    } = req.body;

    const expensePayerUser = await User.findOne({ expensePayer, groupCode });

    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      groupCode,
    });

    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;

    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const newExpense = new Expense({
      expenseDescription,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayerUser._id,
      expenseBeneficiaries: beneficiaryIds,
    });

    const expense = await newExpense.save();

    // Update total expenses paid by expense payer
    await expensePayerUser.updateTotalExpensesPaid();

    // Update total expenses benefitted from by expense beneficiaries concurrently
    await Promise.all(
      expenseBeneficiaries.map(async (beneficiary) => {
        await beneficiary.updateTotalExpenseBenefitted();
      }),
    );

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { expense },
      message: 'Expense created successfully',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Validation failed',
        errors: Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        })),
      });
    } else {
      errorLog(
        error,
        'Error creating expense:',
        'Failed to create the expense. Please try again later.',
      );
      sendInternalError(res);
    }
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const {
      expensePayer,
      groupCode,
      expenseDescription,
      expenseAmount,
      expenseBeneficiariesNames,
    } = req.body;

    const expensePayerUser = await User.findOne({ expensePayer, groupCode });
    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      groupCode,
    });

    const groupUsers = await User.find({
      groupCode,
    });
    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;
    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const updatedExpenseData = {
      expenseDescription,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayerUser._id,
      expenseBeneficiaries: beneficiaryIds,
    };

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updatedExpenseData,
      { new: true },
    );

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    // Update total expenses benefitted from by expense beneficiaries concurrently
    await Promise.all(
      groupUsers.map(async (userId) => {
        try {
          const user = await User.findById(userId);
          if (!user) {
            // Handle the case where the user is not found
            return;
          }
          // Update total expenses paid by the beneficiary
          await user.updateTotalExpensesPaid();
          // Update total expenses benefitted from by the beneficiary
          await user.updateTotalExpenseBenefitted();
        } catch (error) {}
      }),
    );

    if (!updatedExpense) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Expense not found',
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 'success',
      data: { expense: updatedExpense },
      message: 'Expense updated successfully.',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Validation failed',
        errors: Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        })),
      });
    } else {
      errorLog(
        error,
        'Error updating expense:',
        'Failed to update the expense. Please try again later.',
      );
      sendInternalError(res);
    }
  }
};

export const getExpenseInfo = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId)
      .populate('expensePayer', 'userName')
      .populate('expenseBeneficiaries', 'userName');

    // Set the lastActive property of the group to now
    const groupCode = expense.groupCode;
    devLog('Expense groupCode', groupCode);
    setLastActive(groupCode);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { expense },
      message: 'Expense info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving expense info:',
      'Failed to retrieve the expense info. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expenseToDelete = await Expense.findById(expenseId)
      .populate('expensePayer')
      .populate('expenseBeneficiaries');

    const { expensePayer, expenseBeneficiaries, groupCode } = expenseToDelete;

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    // Delete the expense using the retrieved _id
    await Expense.deleteOne({ _id: expenseToDelete._id });

    // Update total expenses paid by the expense payer
    await expensePayer.updateTotalExpensesPaid();

    // Update total expenses benefitted from by expense beneficiaries concurrently
    await Promise.all(
      expenseBeneficiaries.map(async (beneficiary) => {
        await beneficiary.updateTotalExpenseBenefitted();
      }),
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting expense:',
      'Failed to delete the expense. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const listAllExpensesByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    const expenses = await Expense.find({ groupCode });
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: expenses.length,
      data: { expenses },
      message: 'Group expenses retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing expenses:',
      'Failed to list group expenses. Please try again later.',
    );
    sendInternalError(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: expenses.length,
      data: { expenses },
      message: 'All expenses retrieved successfully',
    });
  } catch (error) {
    errorLog(
      error,
      'Error listing all expenses:',
      'Failed to list all expenses. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const deleteAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany();
    await User.updateMany(
      {},
      { totalExpensesPaidAmount: 0, totalExpenseBenefittedAmount: 0 },
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All expenses deleted successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting all expenses:',
      'Failed to delete all expenses. Please try again later.',
    );
    sendInternalError(res);
  }
};
