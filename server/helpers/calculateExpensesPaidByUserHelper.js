import Expense from '../models/Expense.js';
import obtainUserIdByUserNameAndGroupCodeHelper from './obtainUserIdByUserNameAndGroupCodeHelper.js';

async function calculateExpensesPaidByUserHelper(groupCode, userName) {
  try {
    const userId = await obtainUserIdByUserNameAndGroupCodeHelper(
      groupCode,
      userName,
    );

    const totalExpensesPaid = await Expense.aggregate([
      {
        $match: { expensePayer: userId },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$expenseAmount' },
        },
      },
    ]);

    // Extract the total from the aggregation result
    const totalPaid =
      totalExpensesPaid.length > 0 ? totalExpensesPaid[0].total : 0;

    console.log(totalPaid);
    return totalPaid;
  } catch (error) {
    console.error('Error calculating expenses paid by user:', error);
    throw error;
  }
}

export default calculateExpensesPaidByUserHelper;
