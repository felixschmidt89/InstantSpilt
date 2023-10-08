import { check } from 'express-validator';

export const createExpenseValidator = [
  check('expenseName').trim().isLength({ min: 1, max: 100 }),
  check('expenseAmount').isFloat({ max: 9999.99 }),
  check('expenseAmountPerBeneficiary').isNumeric(),
  check('expensePayer').isMongoId(),
  check('expenseBeneficiaries.*').isMongoId(),
  check('groupCode').isLength({ min: 6 }),
];
