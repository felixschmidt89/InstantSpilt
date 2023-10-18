// DONE adding only meaningful necessary comments

/**
 * Converts a number with a comma decimal separator to a dot decimal separator.
 *
 * @param {string} inputValue - The input value with a comma decimal separator.
 * @returns {string} The input value with the comma replaced by a dot.
 */
const commaToDotDecimalSeparatorHelper = (inputValue) => {
  return inputValue.replace(",", ".");
};

export default commaToDotDecimalSeparatorHelper;
