import Expense from '../models/Expense.js';
import obtainUserIdByUserNameAndGroupCodeHelper from './obtainUserIdByUserNameAndGroupCodeHelper.js';

async function calculateExpensesBenefittedByUserHelper(groupCode, userName) {
  try {
    const userId = await obtainUserIdByUserNameAndGroupCodeHelper(
      groupCode,
      userName,
    );

    // Use the aggregate framework to calculate the total expenses benefited
    const totalExpensesBenefitted = await Expense.aggregate([
      {
        $match: { expenseBeneficiaries: userId },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $divide: ['$expenseAmount', { $size: '$expenseBeneficiaries' }],
            },
          },
        },
      },
    ]);

    const result = totalExpensesBenefitted[0]
      ? totalExpensesBenefitted[0].total
      : 0;

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error calculating expenses benefited by user:', error);
    throw error;
  }
}

export default calculateExpensesBenefittedByUserHelper;
