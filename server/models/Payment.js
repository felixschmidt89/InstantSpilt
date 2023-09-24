import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
  {
    paymentAmount: {
      type: Number,
      required: [true, 'The amount of the payment is required but missing'],
    },
    paymentMaker: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'The name of the person who made the payment is required but missing.',
      ],
    },
    paymentRecipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [
        true,
        'The name of the person who received the payment is required but missing.',
      ],
    },
    groupCode: {
      type: String,
      required: [
        true,
        'The payment can not be created, because no groupCode has been provided.',
      ],
    },
    groupObjectId: {
      type: Schema.Types.ObjectId,
      ref: 'Group',
      required: [
        true,
        'The payment can not be created, because no groupObjectId has been provided.',
      ],
    },
  },
  { timestamps: true },
);

const Payment = model('Payment', paymentSchema);

export default Payment;
