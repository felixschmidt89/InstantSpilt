import express from 'express';
import {
  createExpense,
  listAllExpensesByGroupCode,
} from '../controllers/expenseController.js';

const router = express.Router();

// Create a new expense
router.post('/', createExpense);
// Delete an expense
// router.delete('/', deleteExpense);
// Update an expense
// router.update('/', updateExpense);

// Get expenses by GroupCode
router.get('/byGroupCode/:groupCode', listAllExpensesByGroupCode);
export default router;
