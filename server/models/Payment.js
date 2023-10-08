import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    paymentAmount: {
      type: Number,
      required: [true, 'Missing expense amount'],
      max: [9999.99, 'The payment amount may not exceed 9999.99.'],
    },
    paymentMaker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing ID of the person who made the payment'],
    },
    paymentRecipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Missing ID of the person who received the payment'],
    },
    groupCode: {
      type: String,
      required: [true, 'Missing groupCode'],
    },
  },
  { timestamps: true },
);

const Payment = model('Payment', paymentSchema);

export default Payment;
