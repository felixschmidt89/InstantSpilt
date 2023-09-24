import { Schema, model } from 'mongoose';

const expenseSchema = new Schema(
  {
    expenseName: {
      type: String,
      required: [true, 'The name of the expense is required but missing.'],
    },
    expenseAmount: {
      type: Number,
      required: [true, 'The amount of the expense is required but missing.'],
    },
    expensePayer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'The name of the person who paid the expense is required but missing.',
      ],
    },
    expenseBeneficiaries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [
          true,
          'The names of the persons who benefited from the expense are required but missing.',
        ],
      },
    ],
    groupCode: {
      type: String,
      required: [
        true,
        'The expense can not be created, because no groupCode has been provided.',
      ],
    },
    groupObjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: [
        true,
        'The expense can not be created, because no groupObjectId has been provided.',
      ],
    },
  },
  { timestamps: true },
);

const Expense = model('Expense', expenseSchema);

export default Expense;
