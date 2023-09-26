import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupCode: {
      type: String,
      required: [
        true,
        'The group can not be created, because no groupCode has been provided.',
      ],
    },
    groupName: {
      type: String,
      trim: true,
      required: [true, 'The name of the group is required but missing.'],
    },
    groupExpensesSettled: {
      type: Boolean,
      default: true,
    },
  },

  { timestamps: true },
);

const Group = model('Group', groupSchema);

export default Group;
