import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
