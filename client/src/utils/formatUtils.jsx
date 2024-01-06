/**
 * Converts a number with a comma decimal separator to a dot decimal separator.
 *
 * @param {string} inputValue - The input value with a comma decimal separator.
 * @returns {string} The input value with the comma replaced by a dot.
 */
export const commaToDotDecimalSeparator = (inputValue) => {
  return inputValue.replace(",", ".");
};
