import { currenciesContent } from "../contents/currenciesContent";

/**
 * Finds the label for a given currency value.
 *
 * @param {string} currencyValue - The value of the currency to find the label for.
 * @returns {string|null} The label of the currency if found, otherwise null.
 */
export const findCurrencyLabel = (currencyValue) => {
  return currenciesContent.find(
    (currencyObj) => currencyObj.value === currencyValue
  )?.label;
};
