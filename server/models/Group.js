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
      minlength: [1, 'The group name must be at least 1 characters long.'],
      maxlength: [50, 'The group name cannot exceed 50 characters.'],
    },
  },

  { timestamps: true },
);

const Group = model('Group', groupSchema);

export default Group;
