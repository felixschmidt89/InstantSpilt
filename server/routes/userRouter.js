import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupCode,
  changeUserName,
  listAllUsersByGroupObjectId,
  deleteUser,
} from '../controllers/userController.js';
import developmentOnly from '../middleware/developmentOnly.js';
import { validateUserNamePropertyPresence } from '../middleware/validateRequestBody.js';
import { checkUserNameMatch } from '../middleware/validatePropertyMatch.js';
import validateGroupObjectId from '../middleware/validateGroupObjectId.js';

const router = express.Router();

// Create new user
router.post('/', validateUserNamePropertyPresence, createUser);

// Change user name
router.patch('/', validateGroupObjectId, checkUserNameMatch, changeUserName);

// Delete user
router.delete('/', validateGroupObjectId, deleteUser);

// List users by groupCode
router.get(
  '/byGroupCode/:groupCode',
  validateGroupObjectId,
  listAllUsersByGroupCode,
);

// List users by groupObjectId
router.get(
  '/byGroupObjectId/:groupObjectId',
  validateGroupObjectId,
  listAllUsersByGroupObjectId,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all users
router.get('/debug/all', developmentOnly, listAllUsers);

export default router;
