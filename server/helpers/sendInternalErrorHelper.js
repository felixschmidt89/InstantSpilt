import { StatusCodes } from 'http-status-codes';

/**
 * Sends an internal server error response with a default message in JSON format.
 *
 * @param {object} res - The response object.
 */
const sendInternalErrorHelper = (res) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    message: 'Internal server error. Please try again later.',
  });
};

export default sendInternalErrorHelper;
