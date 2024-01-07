import { StatusCodes } from 'http-status-codes';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import Expense from '../models/Expense.js';
import { setLastActive } from '../utils/databaseUtils.js';
import { errorLog, sendInternalError } from '../utils/errorUtils.js';

export const createPayment = async (req, res) => {
  try {
    const { paymentMakerName, groupCode, paymentAmount, paymentRecipientName } =
      req.body;

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    const paymentMaker = await User.findOne({
      userName: { $eq: paymentMakerName },
      groupCode,
    });

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
      errorLog(
        error,
        'Error creating expense:',
        'Failed to create expense. Please try again later.',
      );
      sendInternalError(res);
    }
  }
};

export const updatePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const { paymentMakerName, groupCode, paymentAmount, paymentRecipientName } =
      req.body;

    // Set the lastActive property of the group to now
    setLastActive(groupCode);

    const paymentMaker = await User.findOne({
      userName: { $eq: paymentMakerName },
      groupCode,
    });

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
      paymentRecipient: paymentRecipient._id,
      groupCode,
      paymentAmount,
    };

    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      updatedPaymentData,
      { new: true },
    );

    await paymentRecipient.updateTotalPaymentsReceived();
    await paymentMaker.updateTotalPaymentsMadeAmount();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { payment: updatedPayment },
      message: 'Payment updated successfully',
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
      errorLog(
        error,
        'Error updating payment:',
        'Failed to update payment. Please try again later.',
      );
      sendInternalError(res);
    }
  }
};

export const getPaymentInfo = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId)
      .populate('paymentMaker', 'userName')
      .populate('paymentRecipient', 'userName');

    // Set the lastActive property of the group to now
    const groupCode = payment.groupCode;
    setLastActive(groupCode);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { payment },
      message: 'Payment info retrieved successfully.',
    });
  } catch (error) {
    errorLog(
      error,
      'Error retrieving payment info',
      'Failed to retrieve payment information. Please try again later.',
    );
    sendInternalError(res);
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const paymentToDelete = await Payment.findById(paymentId)
      .populate('paymentRecipient')
      .populate('paymentMaker');

    // Set the lastActive property of the group to now
    const groupCode = paymentToDelete.groupCode;
    setLastActive(groupCode);

    const { paymentRecipient, paymentMaker } = paymentToDelete;

    await Payment.deleteOne({ _id: paymentToDelete._id });

    await paymentRecipient.updateTotalPaymentsReceived();
    await paymentMaker.updateTotalPaymentsMadeAmount();
    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    errorLog(
      error,
      'Error deleting payment:',
      'Failed to delete payment. Please try again later.',
    );
    sendInternalError(res);
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
    errorLog(
      error,
      'Error listing all payments',
      'Failed to list payments. Please try again later.',
    );
    sendInternalError(res);
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
    errorLog(
      error,
      'Error deleting all payments:',
      'Failed to delete all payments. Please try again later.',
    );
    sendInternalError(res);
  }
};
