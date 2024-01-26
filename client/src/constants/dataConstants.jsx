/**
 * Balance threshold for financial calculations.
 * If the absolute value of a balance is less than or equal to this threshold (0.01), it is considered as effectively zero for practical purposes.
 *
 * @constant
 * @type {number}
 */
export const BALANCE_THRESHOLD = 0.01;

/**
 * Number of days without any group activity prior to purging all related group data from db
 *
 * @constant
 * @type {number}
 */
export const INACTIVE_DAYS = 90;
