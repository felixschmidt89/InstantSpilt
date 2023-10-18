import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import Feedback from '../models/Feedback.js';
import logDevErrorHelper from '../utils/logDevErrorHelper.js';
import sendInternalErrorHelper from '../utils/sendInternalErrorHelper.js';
import setLastActiveHelper from '../utils/setLastActiveHelper.js';
import winstonLogger from '../utils/winstonLogger.js';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

/**
 * Creates a new feedback entry in the database and sends an email notification using nodemailer to the InstantSplit admin.
 * @param {Object} req -
 * @param {Object} res -
 */
export const createFeedback = async (req, res) => {
  try {
    const { name, email, messageType, feedback, groupCode, fileId } = req.body;

    // Set the lastActive property of the group to now
    setLastActiveHelper(groupCode);

    const newFeedback = new Feedback({
      name,
      email,
      messageType,
      feedback,
      groupCode,
      fileId,
    });

    const savedFeedback = await newFeedback.save();

    // Create a transporter using email service's SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.strato.de',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email notification copy
    const mailOptions = {
      from: 'admin@instantsplit.de',
      to: 'felix.schmidt@directbox.com',
      subject: 'New InstantSplit feedback created',
      text: `A new feedback has been created by ${name}.
      
      Type: "${messageType}"

      Text: "${feedback}"

      Groupcode: "${groupCode}"

      FileId: "${fileId || 'No file attached'}"
      `,
    };

    // Log error using winston, else send
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        winstonLogger.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

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
