import express from 'express';
import { createExpense } from '../controllers/expenseController.js';

const router = express.Router();

// Create a new expense
router.post('/', createExpense);
// Delete an expense
// router.delete('/', deleteExpense);
// Update an expense
// router.update('/', updateExpense);
export default router;
