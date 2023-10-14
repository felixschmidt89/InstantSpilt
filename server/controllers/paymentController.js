import { StatusCodes } from 'http-status-codes';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import sendInternalErrorHelper from '../utils/sendInternalErrorHelper.js';
import logDevErrorHelper from '../utils/logDevErrorHelper.js';
import Expense from '../models/Expense.js';

export const createPayment = async (req, res) => {
  try {
    const { userName, groupCode, paymentAmount, paymentRecipientName } =
      req.body;

    const paymentMaker = await User.findOne({ userName, groupCode });

    const paymentRecipient = await User.findOne({
      userName: { $eq: paymentRecipientName },
      groupCode,
    });

    if (
      paymentMaker &&
      paymentRecipient &&
      paymentMaker._id.equals(paymentRecipient._id)
    ) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'fail',
        message: 'Oops! Payer and recipient can not be the same person.',
      });
    }

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
    if (error.name === 'ValidationError') {
      // Handle validation errors (client errors)
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Validation failed',
        errors: Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        })),
      });
    } else {
      logDevErrorHelper('Error creating expense:', error);
      sendInternalErrorHelper(res);
    }
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const { userName, groupCode, paymentAmount, paymentRecipientName } =
      req.body;

    const paymentMaker = await User.findOne({ userName, groupCode });

    const paymentRecipient = await User.findOne({
      userName: { $eq: paymentRecipientName },
      groupCode,
    });

    if (
      paymentMaker &&
      paymentRecipient &&
      paymentMaker._id.equals(paymentRecipient._id)
    ) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'fail',
        message: 'Oops! Payer and recipient can not be the same person.',
      });
    }

    const updatedPaymentData = {
      paymentMaker: paymentMaker._id,
      paymentRecipient: paymentRecipient.id,
      groupCode,
      paymentAmount,
    };

    const updatedPayment = await Expense.findByIdAndUpdate(
      expenseId,
      updatedExpenseData,
      { new: true },
    );

    await paymentRecipient.updateTotalPaymentsReceived();
    await paymentMaker.updateTotalPaymentsMadeAmount();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { payment },
      message: 'Payment created successfully',
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors (client errors)
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Validation failed',
        errors: Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        })),
      });
    } else {
      logDevErrorHelper('Error creating expense:', error);
      sendInternalErrorHelper(res);
    }
  }
};

export const getPaymentInfo = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId)
      .populate('paymentMaker', 'userName')
      .populate('paymentRecipient', 'userName');

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { payment },
      message: 'Payment info retrieved successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error retrieving payment info', error);
    sendInternalErrorHelper(res);
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const paymentToDelete = await Payment.findById(paymentId)
      .populate('paymentRecipient')
      .populate('paymentMaker');

    console.log(paymentToDelete);

    const { paymentRecipient, paymentMaker } = paymentToDelete;

    await Payment.deleteOne({ _id: paymentToDelete._id });

    await paymentRecipient.updateTotalPaymentsReceived();
    await paymentMaker.updateTotalPaymentsMadeAmount();
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    logDevErrorHelper('Error deleting payment:', error);
    sendInternalErrorHelper(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: payments.length,
      data: { payments },
      message: 'Payments retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing all payments', error);
    sendInternalErrorHelper(res);
  }
};

export const deleteAllPayments = async (req, res) => {
  try {
    await Payment.deleteMany();
    await User.updateMany(
      {},
      { totalPaymentsMadeAmount: 0, totalPaymentsReceivedAmount: 0 },
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All payments deleted successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error deleting all payments:', error);
    sendInternalErrorHelper(res);
  }
};
