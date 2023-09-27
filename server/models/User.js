import { Schema, model } from 'mongoose';
import Expense from '../models/Expense.js'; // Import the Expense model

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, 'The name of the user is required but missing.'],
    },
    groupCode: {
      type: String,
      required: [
        true,
        'The user cannot be created because no groupCode has been provided.',
      ],
    },
  },
  { timestamps: true },
);

// Define a virtual property for total expenses paid
userSchema.virtual('totalExpensesPaid').get(async function () {
  const userId = this._id; // Get the user's ObjectId

  try {
    // Calculate the total expenses paid by the user
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

    return totalExpensesPaid[0] ? totalExpensesPaid[0].total : 0;
  } catch (error) {
    console.error('Error calculating expenses paid by user:', error);
    throw error;
  }
});

// Make sure to call `toObject()` to include virtuals when converting to JSON
userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupCode: 1 }, { unique: true });

const User = model('User', userSchema);

export default User;
