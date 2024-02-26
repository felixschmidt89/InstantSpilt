import { StatusCodes } from 'http-status-codes';

/**
 * Utility function to log messages or errors in development environment only.
 *
 * @param {string} [message="devLog"] - message to be logged.
 * @param {*} [data] - optional data to be logged. If an error object is provided, it will be logged as an error.
 * @returns {void}
 */
export const devLog = (message = 'devLog', data = undefined) => {
  if (process.env.NODE_ENV === 'development') {
    if (data !== undefined) {
      if (data instanceof Error) {
        console.error(message, data);
      } else {
        console.log(message, data);
      }
    }
  }
};

/**
 * Logs the original error for internal debugging purposes with the custom prefix.
 * Creates a user-friendly error with a customizable message and attaches the original error.
 *
 * @param {Error} originalError - The original error.
 * @param {string} logPrefix - The custom log prefix.
 * @param {string} userFriendlyMessage - The user-friendly error message.
 * @returns {object} An object containing log information.
 */
export const errorLog = (
  originalError,
  logPrefix = 'Original error:',
  userFriendlyMessage = 'Failed to handle the request.',
) => {
  // Log the original error for internal debugging purposes with the custom prefix
  console.error(`${logPrefix} ${originalError}`);

  // Return an object containing log information
  return {
    logPrefix,
    userFriendlyMessage,
    originalError,
  };
};

/**
 * Sends an internal server error response with a default message in JSON format.
 *
 */
export const sendInternalError = (res, error) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    message: 'Internal server error. Please try again later.',
  });
};

/**
 * Handles validation errors and sends an appropriate response to the client.
 *
 * @param {Object} res - Express response object.
 * @param {Error} error - The validation error object.
 * @returns {Object} JSON response with validation error details.
 */
export const sendValidationError = (res, error) => {
  if (error.name === 'ValidationError') {
    // Handle all validation errors using Object.values
    const validationErrors = Object.values(error.errors).map(
      (error) => error.message,
    );
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      status: 'error',
      message: 'Validation error',
      errors: validationErrors,
    });
  }
};
