import express from 'express';
import { check } from 'express-validator';
import {
  createExpense,
  listAllExpensesByGroupCode,
  listAllExpenses,
  deleteAllExpenses,
  getExpenseInfo,
  deleteExpense,
  updateExpense,
  getExpensesTotalByGroupCode,
} from '../controllers/expenseController.js';
import { expenseValidator } from '../validators/expenseValidator.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';

const router = express.Router();

// Create an expense
router.post('/', expenseValidator, createExpense);

// Update an expense
router.put('/:expenseId', expenseValidator, updateExpense);

// Get expense info by id
router.get('/:expenseId', getExpenseInfo);

// Delete expense
router.delete('/:expenseId', deleteExpense);

// Get all expenses by GroupCode
router.get('/byGroupCode/:groupCode', listAllExpensesByGroupCode);

// Get total expenses by GroupCode
router.get('/totalExpenses/:groupCode', getExpensesTotalByGroupCode);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all expenses
router.get('/debug/all', developmentOnlyMiddleware, listAllExpenses);

// Delete all expenses
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllExpenses);

export default router;
