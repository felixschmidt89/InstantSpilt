import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupCode: {
      type: String,
      required: [
        true,
        'Missing groupCode',
      ],
    },
    groupName: {
      type: String,
      trim: true,
      required: [true, 'Missing group name.'],
      minlength: [1, 'The group name must be at least 1 characters long.'],
      maxlength: [50, 'The group name cannot exceed 50 characters.'],
    },
  },

  { timestamps: true },
);

const Group = model('Group', groupSchema);

export default Group;
