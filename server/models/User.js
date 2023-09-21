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
    linkedGroup: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
  },
  { timestamps: true },
);
const User = model('User', userSchema);

export default User;
