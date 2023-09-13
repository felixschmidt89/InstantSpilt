import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupID: {
      type: String,
      unique: true, // Ensure groupID is globally unique
      required: true,
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
