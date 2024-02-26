// Third Party Libraries
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

// Constants and Utils
import { devLog, sendInternalError } from '../utils/errorUtils.js';

/**
 * Controller function to verify client Friendly Captcha solution with Friendly Captcha API.
 * @param req - The request object.
 * @param  res - The response object.
 * @returns {Promise<void>} Promise that resolves once the verification is complete.
 */
export const verifyCaptcha = async (req, res) => {
  try {
    devLog('Posting to FriendlyCaptcha.');
    const { solution, secret } = req.body;
    devLog('solution', solution);
    devLog('secret', secret);
    const response = await axios.post(
      'https://api.friendlycaptcha.com/api/v1/siteverify',
      {
        solution,
        secret,
      },
    );

    devLog('response from FriendlyCaptcha', response.data);
    // Extract relevant data from the response
    const { success } = response.data;
    // Check if the captcha was successfully verified
    if (success) {
      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'FriendlyCaptcha verified successfully.',
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        message: 'Failed to verify FriendlyCaptcha.',
      });
    }
  } catch (error) {
    console.error('Error verifying captcha:', error);
    sendInternalError();
  }
};
