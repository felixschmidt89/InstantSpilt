import { check } from 'express-validator';

const createExpenseValidation = [
  check('expenseName')
    .trim()
    .isLength({ min: 1, max: 100 })
  check('expenseAmount')
    .isFloat({ max: 9999.99 })
  check('expenseAmountPerBeneficiary')
    .isNumeric()
  check('expensePayer')
    .isMongoId()
  check('expenseBeneficiaries.*')
    .isMongoId()
  check('groupCode')
    .notEmpty()
];


// 

import { check } from 'express-validator';

const createExpenseValidation = [
  check('expenseName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Expense name must be between 1 and 100 characters.'),

  check('expenseAmount')
    .isFloat({ max: 9999.99 })
    .withMessage('Expense amount must be a number up to 9999.99.'),

  check('expenseAmountPerBeneficiary')
    .isNumeric()
    .withMessage('Expense amount per beneficiary must be a number.'),

  check('expensePayer')
    .isMongoId()
    .withMessage('Invalid expense payer ID.'),

  check('expenseBeneficiaries')
    .isArray({ min: 1 })
    .withMessage('At least one beneficiary is required.')
    .custom((value) => {
      // Custom validation function to check if all values in the array are valid MongoDB IDs
      if (!Array.isArray(value)) {
        return false;
      }
      return value.every((item) => typeof item === 'string' && /^[0-9a-fA-F]{24}$/.test(item));
    })
    .withMessage('Invalid expense beneficiary ID(s).'),

  check('groupCode')
    .notEmpty()
    .withMessage('Group code is required.'),
];

export default createExpenseValidation;
