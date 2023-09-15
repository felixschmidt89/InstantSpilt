import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupId: {
      type: String,
      required: true, // ensure that no group can be created wo/ groupID as it is the key value in the application
    },
    groupname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
);

const Group = model('Group', groupSchema);

export default Group;
