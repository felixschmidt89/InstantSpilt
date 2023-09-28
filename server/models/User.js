import { Schema, model } from 'mongoose';
import Expense from './Expense.js'; // Import the Expense model

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
    totalPaymentsMadeAmount: {
      type: Number,
      default: 0,
    },
    totalPaymentsReceivedAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Enable virtual properties to be included in JSON output
    toObject: { virtuals: true }, // Enable virtual properties to be included in object representations
  },
);

// Virtual properties
userSchema.virtual('userBalance').get(function () {
  return (
    this.totalExpensesPaidAmount +
    this.totalPaymentsMadeAmount -
    this.totalExpenseBenefittedAmount -
    this.totalPaymentsReceivedAmount
  );
});
userSchema.virtual('expensesSettled').get(function () {
  return this.get('userBalance') === 0;
});

const User = model('User', userSchema);

// Calculate and update the totalExpensesPaidAmount of the user
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
      { _id: userId },
      {
        $set: {
          totalExpensesPaidAmount: totalExpensesPaid[0].total || 0,
        },
      },
    );
  } catch (error) {
    console.error(
      'Error calculating and updating total expensesPaidAmount:',
      error,
    );
    throw error;
  }
};

// Calculate and update the totalExpenseBenefittedAmount of the user
userSchema.methods.updateTotalExpenseBenefitted = async function () {
  const userId = this._id;

  try {
    // Calculate the total expense benefitted from by the user
    const totalExpenseBenefitted = await Expense.aggregate([
      {
        $match: {
          expenseBeneficiaries: userId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$expenseAmountPerBeneficiary' },
        },
      },
    ]);
    // Update the totalExpenseBenefittedAmount field
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          totalExpenseBenefittedAmount: totalExpenseBenefitted[0].total || 0,
        },
      },
    );
  } catch (error) {
    console.error(
      'Error calculating and updating total benefittedExpensesAmount:',
      error,
    );
    throw error;
  }
};

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupCode: 1 }, { unique: true });

export default User;
