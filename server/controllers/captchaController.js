import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { devLog, sendInternalError } from '../utils/errorUtils.js';

export const verifyCaptcha = async (req, res) => {
  try {
    const { solution, secret } = req.body;

    // Console logs to monitor implementation
    console.log('Solution:', solution);
    console.log('Secret:', secret);
    const response = await axios.post(
      'https://api.friendlycaptcha.com/api/v1/siteverify',
      {
        solution,
        secret,
      },
    );
    // Console logs to monitor implementation
    console.log(response);
    // Extract relevant data from the response
    const { success } = response.data;

    // Check if the captcha was successfully verified
    if (success) {
      res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Captcha verified successfully.',
      });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        status: 'error',
        message: 'Failed to verify captcha.',
      });
    }
  } catch (error) {
    console.error('Error verifying captcha:', error);
    sendInternalError();
  }
};
