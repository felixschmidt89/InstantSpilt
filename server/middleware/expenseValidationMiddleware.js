// Express route for creating an expense
const createExpense = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  // If validation passes, you can proceed to create the expense
  try {
    const expenseData = req.body; // Assuming the request body contains the expense data
    const newExpense = new Expense(expenseData);
    await newExpense.save();

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      message: 'Expense created successfully',
      data: newExpense,
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Failed to create the expense',
      error: error.message,
    });
  }
};

export { createExpenseValidation, createExpense };
