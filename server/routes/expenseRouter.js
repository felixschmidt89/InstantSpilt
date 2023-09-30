import express from 'express';
import {
  createExpense,
  listAllExpensesByGroupCode,
  listAllExpenses,
  deleteAllExpenses,
  getExpenseInfo,
  deleteExpense,
} from '../controllers/expenseController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';

const router = express.Router();

// Create a expense
router.post('/', createExpense);

// Get expense info by id
router.get('/:expenseId', getExpenseInfo);

// Delete expense
router.delete('/:expenseId', deleteExpense);
// Update an expense
// router.update('/', updateExpense);

// Get expenses by GroupCode
router.get('/byGroupCode/:groupCode', listAllExpensesByGroupCode);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all expenses
router.get('/debug/all', developmentOnlyMiddleware, listAllExpenses);

// Delete all expenses
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllExpenses);

export default router;
