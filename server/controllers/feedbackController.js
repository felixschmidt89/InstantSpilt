import { StatusCodes } from 'http-status-codes';
import Feedback from '../models/Feedback.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';

// eslint-disable-next-line import/prefer-default-export
export const createFeedback = async (req, res) => {
  try {
    const { name, email, requestType, feedback, groupCode } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      requestType,
      feedback,
      groupCode,
    });

    const savedFeedback = await newFeedback.save();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { savedFeedback },
      message: 'Feedback received successfully - thanks!',
    });
  } catch (error) {
    logDevErrorHelper('Error creating feedback:', error);
    sendInternalErrorHelper(res);
  }
};
