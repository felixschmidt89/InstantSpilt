import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Expense from '../models/Expense.js';

// Middleware to handle expense validation errors, will return error messages specified in the payment Schema
const handleExpenseValidationErrorsMiddleware = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  // Use schema-specific error messages
  if (!errors.isEmpty()) {
    // Get the schema validation messages directly from the Mongoose schema
    const expenseSchema = Expense.schema;

    // Create an object to map field names to their corresponding validation messages
    const fieldMessages = {
      expenseAmount: expenseSchema.path('expenseAmount').options.message,
      expensePayer: expenseSchema.path('expensePayer').options.message,
      expenseBeneficiaries: expenseSchema.path('expenseBeneficiaries').options
        .message,
      groupCode: expenseSchema.path('groupCode').options.message,
    };

    // Iterate through validation errors and update error messages based on field
    errors.array().forEach((error) => {
      if (fieldMessages[error.param]) {
        error.msg = fieldMessages[error.param];
      }
    });

    // Return response with validation errors and schema-specific messages
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Expense validation failed',
      errors: errors.array(),
    });
  }
  next();
};

export default handleExpenseValidationErrorsMiddleware;
