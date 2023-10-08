import { StatusCodes } from 'http-status-codes';

/**
 * Sends an validation error response with a default message in JSON format.
 *
 * @param {object} res - The response object.
 */
const sendInternalErrorHelper = (res) => {
    res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        message: 'Validation failed',
        errors: Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        })),
      });

export default sendInternalErrorHelper;

