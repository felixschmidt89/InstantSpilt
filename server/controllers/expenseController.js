import { StatusCodes } from 'http-status-codes';
import Expense from '../models/Expense.js';

export const createExpense = async (req, res) => {
  try {
    const {
      expenseName,
      expenseAmount,
      expensePayer,
      expenseBeneficiaries,
      groupID,
    } = req.body;

    const expense = await Expense.create({
      expenseName,
      expenseAmount,
      expensePayer,
      expenseBeneficiaries,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: 'Expense created', expense });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating expense:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};

// export const updateGroupName = async (req, res) => {
//   try {
//     const { groupId, groupname } = req.body;

//     const updatedGroup = await Group.findByIdAndUpdate(
//       groupId,
//       { $set: { groupname } },
//       { new: true }, // Return the updated document
//     );

//     res
//       .status(StatusCodes.OK)
//       .json({ message: 'Group name updated successfully.', updatedGroup });
//   } catch (error) {
//     console.error('Error updating group name:', error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: 'Internal server error. Please try again later.' });
//   }
// };

// export const listAllGroups = async (req, res) => {
//   try {
//     const groups = await Group.find();
//     res.status(StatusCodes.OK).json({ groups });
//   } catch (error) {
//     console.error('Error listing all groups:', error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: 'Internal server error. Please try again later.' });
//   }
// };

// export const deleteAllGroups = async (req, res) => {
//   try {
//     await Group.deleteMany({});
//     res
//       .status(StatusCodes.OK)
//       .json({ message: 'All groups deleted successfully.' });
//   } catch (error) {
//     console.error('Error deleting all groups:', error);
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: 'Internal server error. Please try again later.' });
//   }
// };
