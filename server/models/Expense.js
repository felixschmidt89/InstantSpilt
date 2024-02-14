import { Schema, model } from 'mongoose';

const expenseSchema = new Schema(
  {
    expenseDescription: {
      type: String,
      trim: true,
      required: [true, 'expense description missing'],
      minlength: [1, 'expense description must be at least 1 characters'],
      maxlength: [100, 'expense description must not exceed 100 characters'],
    },
    expenseAmount: {
      type: Number,
      required: [true, 'expense amount missing'],
      min: [0.01, 'expense amount must be at least 0.01'],
      max: [99999.99, 'expense amount must not exceed 99999.99.'],
    },
    expenseAmountPerBeneficiary: {
      type: Number,
      required: [true, 'expense amount missing'],
    },
    expensePayer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Invalid expense payer ID'],
    },
    expenseBeneficiaries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Invalid expense beneficiary ID'],
      },
    ],
    groupCode: {
      type: String,
      required: [true, 'Missing groupCode'],
    },
  },
  {
    timestamps: true,
  },
);

const Expense = model('Expense', expenseSchema);

export default Expense;
