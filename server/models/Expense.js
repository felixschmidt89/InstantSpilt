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
    expensePayer: { type: Schema.Types.ObjectId, ref: 'User' },
    expenseBeneficiaries: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  },
  { timestamps: true },
);

const Expense = model('Expense', expenseSchema);

export default Expense;
