import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, 'The name of the user is required but missing.'],
    },
    groupCode: {
      type: String,
      required: [
        true,
        'The user cannot be created because no groupCode has been provided.',
      ],
    },
    groupObjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: [
        true,
        'The user cannot be created because no groupObjectId has been provided.',
      ],
    },
  },
  { timestamps: true },
);

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupObjectId: 1 }, { unique: true });

const User = model('User', userSchema);

export default User;
