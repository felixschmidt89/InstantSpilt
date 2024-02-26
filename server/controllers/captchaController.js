import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { sendInternalError } from '../utils/errorUtils';

export const verifyCaptcha = async (req, res) => {
  try {
    const { solution, secret } = req.body;

    const response = await axios.post(
      'https://api.friendlycaptcha.com/api/v1/siteverify',
      {
        solution,
        secret,
      },
    );
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
