import { StatusCodes } from "http-status-codes";
import { genericErrorMessage } from "../constants/errorConstants";

/**
 * Utility function to log messages and/or errors in the development environment only.
 *
 * @param {string} [message="devLog"] - Message to be logged.
 * @param {*} [data] - Optional data to be logged. If an error object is provided, it will be logged as an error.
 * @returns {void}
 */
export const devLog = (message = "devLog", data) => {
  if (process.env.NODE_ENV === "development") {
    if (data !== undefined) {
      if (data instanceof Error) {
        console.error(message, data);
      } else {
        console.log(message, data);
      }
    } else {
      console.log(message);
    }
  }
};

/**
 * Handles API errors and triggers the display of the error modal.
 *
 * @param {Error} error - The error object.
 * @param {Function} setError - State setter function for updating error state.
 * @param {Function} displayErrorModal - Function to display the error modal.
 *
 * @throws {Error} Throws an error if the provided error object is falsy.
 *
 * @statusCodes Handled HTTP status codes:
 * - UNPROCESSABLE_ENTITY (422): Sets error message based on the first validation error.
 * - CONFLICT (409): Sets error message based on the conflict message.
 * - BAD_REQUEST (400): Sets error message based on the first error's message in case of bad request.
 */
export const handleApiErrorsAndTriggerErrorModal = (
  error,
  setError,
  displayErrorModal
) => {
  if (!error) {
    throw new Error("Invalid error object provided.");
  }

  if (error.response) {
    devLog("error.response:", error.response);

    let errorMessage = genericErrorMessage;

    if (error.response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
      errorMessage = error.response.data.errors[0] || genericErrorMessage;
    } else if (
      error.response.status === StatusCodes.CONFLICT ||
      error.response.status === StatusCodes.BAD_REQUEST ||
      error.response.status === StatusCodes.NOT_FOUND
    ) {
      errorMessage = error.response.data.message || genericErrorMessage;
    }
    setError(errorMessage);
    displayErrorModal();
  }
};

/**
 * Utility function to handle other errors.
 * @param {Object} error - The error object.
 * @param {function} setError - The function to set the error state.
 * @param {string} [customErrorMessage] - Custom error message to set " Please try again later." is appended automatically.
 * @param {string} [errorType] - Type of the error (e.g., "validation", "authentication").
 */
export const handleOtherErrors = (
  error,
  setError,
  customErrorMessage = "Error. ",
  errorType = "other"
) => {
  // Handle other types of errors
  if (
    !error.response ||
    !error.response.data ||
    !error.response.data.errors ||
    !error.response.data.error
  ) {
    console.error(`${errorType} error:`, error);
    setError(`${customErrorMessage} Please try again later.`);
  }
};
