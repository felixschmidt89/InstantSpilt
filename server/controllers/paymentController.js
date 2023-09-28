import { StatusCodes } from 'http-status-codes';
import Payment from '../models/Payment.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';
import obtainUserIdByUserNameAndGroupCodeHelper from '../helpers/obtainUserIdByUserNameAndGroupCodeHelper.js';

export const createPayment = async (req, res) => {
  try {
    const { userName, groupCode, paymentAmount, paymentRecipientName } =
      req.body;
    const [paymentMaker, paymentRecipient] = await Promise.all([
      obtainUserIdByUserNameAndGroupCodeHelper(groupCode, userName),
      obtainUserIdByUserNameAndGroupCodeHelper(groupCode, paymentRecipientName),
    ]);

    const newPayment = new Payment({
      paymentMaker,
      paymentRecipient,
      groupCode,
      paymentAmount,
    });

    const payment = await newPayment.save();

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
