/**
 * Validates that the input is a non-empty string.
 *
 * @param {*} input - The input to validate.
 * @param {string} paramName - The name of the parameter being validated.
 * @throws {Error} - Throws an error if the input is not a non-empty string.
 */
export const validateString = (input, paramName) => {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error(`Invalid ${paramName} provided`);
  }
};
