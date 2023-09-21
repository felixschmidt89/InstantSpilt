import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    groupCode: {
      type: String,
      required: true,
    },
    groupObjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  { timestamps: true },
);

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupObjectId: 1 }, { unique: true });

const User = model('User', userSchema);

export default User;
