import Expense from '../models/Expense';

async function calculateExpensesPaidByUserHelper(groupCode, userName) {
  try {
    const expensesPaidByUser = await Expense.find({ expensePayer: userId });

    const totalExpensesPaid = expensesPaidByUser.reduce(
      (total, expense) => total + expense.expenseAmount,
      0
    );

    return totalExpensesPaid;
  } catch (error) {
    console.error('Error calculating expenses paid by user:', error);
    throw error;
  }
}

export default calculateExpensesPaidByUser;