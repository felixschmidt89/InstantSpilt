import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true, // ensure that no group can be created wo/ groupID as it is the key value in the application
    },
    groupName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Group = model('Group', groupSchema);

export default Group;
