import { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, 'The name of the user is required but missing.'],
    },

    userExpensesSettled: {
      type: Boolean,
      default: true,
    },

    balance: { type: Number, default: 0 },

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

// Define a virtual property for expensesAmountPaid
userSchema.virtual('expensesAmountPaid').get(async function () {
  const userId = this._id;
  const Expense = new model('Expense');

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
});

// Define a virtual property for expensesAmountBenefitted
userSchema.virtual('expensesAmountBenefitted').get(async function () {
  const userId = this._id; // Get the user's ObjectId
  const Expense = mongoose.model('Expense'); // Import the Expense model

  // Calculate the total expenses benefited by the user
  const totalExpensesBenefitted = await Expense.aggregate([
    {
      $match: { expenseBeneficiaries: userId },
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$expenseAmount' },
      },
    },
  ]);

  return totalExpensesBenefitted[0] ? totalExpensesBenefitted[0].total : 0;
});

// Make sure to call `toObject()` to include virtuals when converting to JSON
userSchema.set('toObject', { virtuals: true });

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupCode: 1 }, { unique: true });

const User = model('User', userSchema);

export default User;
