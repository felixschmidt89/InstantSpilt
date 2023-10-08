import { validationResult } from 'express-validator';
import Payment from '../models/Payment.js';
import { StatusCodes } from 'http-status-codes';

// Middleware to handle payment validation errors, will return error messages specified in the payment Schema
const handlePaymentValidationErrorsMiddleware = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  // Use schema-specific error messages
  if (!errors.isEmpty()) {
    const schemaValidationMessages = paymentSchema
      .path('paymentAmount')
      .validators.map((validator) => validator.options.message);

    const paymentMakerMessages = paymentSchema
      .path('paymentMaker')
      .validators.map((validator) => validator.options.message);

    const paymentRecipientMessages = paymentSchema
      .path('paymentRecipient')
      .validators.map((validator) => validator.options.message);

    const groupCodeMessages = paymentSchema
      .path('groupCode')
      .validators.map((validator) => validator.options.message);

    // Iterate through validation errors and update error messages based on field
    errors.array().forEach((error) => {
      switch (error.param) {
        case 'paymentAmount':
          error.msg = schemaValidationMessages.join('. ');
          break;
        case 'paymentMaker':
          error.msg = paymentMakerMessages.join('. ');
          break;
        case 'paymentRecipient':
          error.msg = paymentRecipientMessages.join('. ');
          break;
        case 'groupCode':
          error.msg = groupCodeMessages.join('. ');
          break;
        default:
          break;
      }
    });

    // Return response with validation errors and schema-specific messages
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  // If no validation errors, proceed to the next middleware
  next();
};

export default handlePaymentValidationErrorsMiddleware;
