import express from 'express';
import {
  createGroup,
  changeGroupName,
  listAllGroups,
  deleteAllGroups,
  listGroupNamesByStoredGroupCodes,
  listExpensesAndPaymentsByGroup,
} from '../controllers/groupController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import validateGroupCodeMiddleware from '../middleware/validateGroupCodeMiddleware.js';
import { validateGroupNamePropertyPresenceMiddleware } from '../middleware/validateRequestBodyMiddleware.js';

const router = express.Router();

// Create a new group
router.post('/', createGroup);
// Update group name
router.patch('/', validateGroupCodeMiddleware, changeGroupName);

// List group names of locally stored groups (by groupCode)
router.get('/StoredGroupNames', listGroupNamesByStoredGroupCodes);

// Lists all expenses and payments of a group
router.get('/:groupCode/expenses-and-payments', listExpensesAndPaymentsByGroup);

// Add more routes for other group-related functionality

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all groups
router.get('/debug/all', developmentOnlyMiddleware, listAllGroups);
// Delete all groups
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllGroups);

export default router;
