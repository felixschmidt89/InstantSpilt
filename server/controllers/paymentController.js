import { StatusCodes } from 'http-status-codes';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

export const createPayment = async (req, res) => {
  try {
    const { userName, groupCode, paymentAmount, paymentRecipientName } =
      req.body;

    const paymentMaker = await User.findOne({ userName, groupCode });

    const paymentRecipient = await User.findOne({
      userName: { $eq: paymentRecipientName },
      groupCode,
    });

    const newPayment = new Payment({
      paymentMaker: paymentMaker._id,
      paymentRecipient: paymentRecipient.id,
      groupCode,
      paymentAmount,
    });

    const payment = await newPayment.save();

    await paymentRecipient.updateTotalPaymentsReceived();
    await paymentMaker.updateTotalPaymentsMadeAmount();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { payment },
      message: 'Payment created successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error creating expense:', error);
    sendInternalErrorHelper(res);
  }
};

export const deletePayment = async (req, res) => {};
