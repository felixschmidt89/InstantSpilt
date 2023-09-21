import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentPayer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentPayee: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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

const Payment = model('Payment', paymentSchema);

export default Payment;
