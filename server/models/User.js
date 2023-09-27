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
    totalExpensesPaidAmount: {
      type: Number,
      default: 0,
    },
    totalExpenseBenefittedAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtual properties in JSON serialization
    toObject: { virtuals: true }, // Include virtual properties when converting to JavaScript objects
  },
);

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupCode: 1 }, { unique: true });

// Function to calculate and update the totalExpensesPaidAmount
userSchema.methods.updateTotalExpensesPaid = async function () {
  const userId = this._id;

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

    // Update the totalExpensesAmount field
    await User.findOneAndUpdate(
      { _id: this._id },
      {
        $set: {
          totalExpensesPaidAmount: totalExpensesPaid[0]
            ? totalExpensesPaid[0].total
            : 0,
        },
      },
    );

    // Save the updated user document
    await this.save();
  } catch (error) {
    console.error('Error calculating and updating total expenses:', error);
    throw error;
  }
};

const User = model('User', userSchema);

export default User;
