import { Schema, model } from 'mongoose';

const expenseSchema = new Schema(
  {
    expenseName: {
      type: String,
      required: true,
    },
    expenseAmount: {
      type: Number,
      required: true,
    },
    expensePayer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expenseBeneficiaries: [
      { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    groupCode: {
      type: String,
      required: true,
    },
    linkedGroup: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  { timestamps: true },
);

const Expense = model('Expense', expenseSchema);

export default Expense;
