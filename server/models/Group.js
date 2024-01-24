import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    groupCode: {
      type: String,
      required: [true, 'Missing groupCode'],
      index: true,
    },
    groupName: {
      type: String,
      trim: true,
      required: [true, 'Missing group name.'],
      minlength: [1, 'The group name must be at least 1 characters long.'],
      maxlength: [50, 'The group name cannot exceed 50 characters.'],
      index: true,
    },
    initialGroupName: {
      type: String,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// Define a method to update the lastActive property (needed for data purge)
groupSchema.methods.setLastActive = async function () {
  try {
    this.lastActive = new Date();
    await this.save();
  } catch (error) {
    console.error('Error setting lastActive:', error);
    throw error;
  }
};

groupSchema.methods.setInitialGroupName = async function () {
  try {
    console.log('Setting initialGroupName for group:', this.groupName);
    this.initialGroupName = this.groupName;
    await this.save();
    console.log('InitialGroupName set successfully.');
  } catch (error) {
    console.error('Error setting initialGroupName:', error);
    throw error;
  }
};

const Group = model('Group', groupSchema);

export default Group;
