import { StatusCodes } from 'http-status-codes';
import Expense from '../models/Expense.js';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupCodeHelper from '../helpers/obtainGroupObjectIdByGroupCodeHelper.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

export const createExpense = async (req, res) => {
  const {
    userName,
    groupObjectId,
    groupCode,
    expenseName,
    expenseAmount,
    expenseBeneficiariesNames,
  } = req.body;

  try {
    const expensePayer = await User.findOne({ userName, groupObjectId });

    if (!expensePayer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Expense payer not found.' });
    }

    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      groupObjectId,
    });

    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const newExpense = new Expense({
      expenseName,
      expenseAmount,
      groupCode,
      groupObjectId,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: beneficiaryIds,
    });

    const expense = await newExpense.save();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { expense },
      message: 'Expense created successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error updating user name:', error);
    sendInternalErrorHelper(res);
  }
};

export const listAllExpensesByGroupCode = async (req, res) => {
  try {
    const groupCode = req.params.groupCode;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);
    const expenses = await Expense.find({ groupObjectId });
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { expenses },
      message: 'Group expenses',
    });
  } catch (error) {
    logDevErrorHelper('Error listing expenses', error);
    sendInternalError(res);
  }
};
