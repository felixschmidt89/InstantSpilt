import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
  {
    groupID: {
      type: String,
      unique: true, // Ensure groupID is unique
      required: true,
    },
    groupname: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

const Group = mongoose.model('Group', groupSchema);

export default Group;
