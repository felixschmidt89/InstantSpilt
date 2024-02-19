/**
 * Validates and processes amount input value.
 *
 * Removes leading and trailing spaces, replaces comma decimal separator with dot,
 * and ensures the input consists of numeric characters with at most one dot.
 *
 * @param {string} inputValue - The input value to be trimmed and validated.
 * @returns {string} The trimmed and validated input value containing only numeric characters with at most one dot or comma.
 */
export const validateAndProcessAmountInput = (inputValue) => {
  const trimmedAndValidatedInput = inputValue
    .trim()
    .replace(/,/g, ".") // Replace comma separator with dot
    .replace(/[^0-9.]|[.](?=.*[.])|[,](?=$)|[,](?=.*[,])/g, "") // Ensure at most one dot
    .replace(/^(\d+(?:\.\d{0,2})?)?.*/g, "$1"); // Ensure not more than 2 decimal places after dot

  return trimmedAndValidatedInput;
};
