import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: [true, 'The name of the user is required but missing.'],
    },

    userExpensesSettled: {
      type: Boolean,
      default: true,
    },
    balance: { type: Number, default: 0 },

    groupCode: {
      type: String,
      required: [
        true,
        'The user cannot be created because no groupCode has been provided.',
      ],
    },
  },

  { timestamps: true },
);

// Ensure users are unique within a group using schema-level validation
userSchema.index({ userName: 1, groupCode: 1 }, { unique: true });

const User = model('User', userSchema);

export default User;
