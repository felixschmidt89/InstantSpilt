import { StatusCodes } from 'http-status-codes';
import Expense from '../models/Expense.js';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupIdHelper from '../helpers/obtainGroupObjectIdByGroupId.js';

export const createExpense = async (req, res) => {
  const {
    userName,
    groupId,
    expenseName,
    expenseAmount,
    expenseBeneficiariesNames,
  } = req.body;
  const linkedGroup = await obtainGroupObjectIdByGroupIdHelper(groupId);

  try {
    const expensePayer = await User.findOne({ userName, linkedGroup });

    if (!expensePayer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Expense payer not found.' });
    }

    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      linkedGroup,
    });

    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const newExpense = new Expense({
      expenseName,
      expenseAmount,
      groupId,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: beneficiaryIds,
      linkedGroup,
    });

    // Save the expense to the database
    const expense = await newExpense.save();

    return res.status(StatusCodes.CREATED).json(expense);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error updating user name:', error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
};
