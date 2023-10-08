import { Schema, model } from 'mongoose';

const expenseSchema = new Schema(
  {
    expenseName: {
      type: String,
      trim: true,
      required: [true, 'Missing expense description.'],
      minlength: [
        1,
        'The expense description must be at least 1 characters long.',
      ],
      maxlength: [100, 'The expense description cannot exceed 100 characters.'],
    },
    expenseAmount: {
      type: Number,
      required: [true, 'Missing expense amount'],
      max: [9999.99, 'The expense amount may not exceed 9999.99.'],
    },
    expenseAmountPerBeneficiary: {
      type: Number,
      required: [true, 'Missing expense amount'],
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
