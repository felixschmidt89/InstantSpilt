import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentPayer: { type: Schema.Types.ObjectId, ref: 'User' },
    paymentPayee: { type: Schema.Types.ObjectId, ref: 'User' },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
  },
  { timestamps: true },
);

const Payment = model('Payment', paymentSchema);

export default Payment;
