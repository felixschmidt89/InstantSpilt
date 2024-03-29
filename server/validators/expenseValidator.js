import { check } from 'express-validator';

export const expenseValidator = [
  check('expenseDescription').trim().isLength({ min: 1, max: 100 }),
  check('expenseAmount').isFloat({ max: 99999.99 }),
  check('expenseAmountPerBeneficiary').isNumeric(),
  check('expensePayer').isMongoId(),
  check('expenseBeneficiaries.*').isMongoId(),
  check('groupCode').isLength({ min: 6 }),
];
