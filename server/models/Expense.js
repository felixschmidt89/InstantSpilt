import { Schema, model } from 'mongoose';

const expensesSchema = new Schema(
  {
    expenseName: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    payer: { type: Schema.Types.ObjectId, ref: 'User' },
    beneficiaries: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    groupId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Expense = model('Expense', expensesSchema);

export default Expenses;
