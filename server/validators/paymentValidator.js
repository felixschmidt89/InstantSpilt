import { check } from 'express-validator';

export const paymentValidator = [
  check('paymentAmount')
    .isNumeric()
    .custom((value) => value <= 9999.99),
  check('paymentMaker').isMongoId(),
  check('paymentRecipient').isMongoId(),
  check('groupCode').isLength({ min: 6 }),
];
