import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupCode,
  changeUserName,
  deleteUser,
  deleteAllUsers,
} from '../controllers/userController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import { validateUserNamePropertyPresenceMiddleware } from '../middleware/validateRequestBodyMiddleware.js';
import { checkUserNameMatchMiddleware } from '../middleware/validatePropertyMatchMiddleware.js';
import validateGroupCodeMiddleware from '../middleware/validateGroupCodeMiddleware.js';

const router = express.Router();

// Create new user
router.post('/', validateUserNamePropertyPresenceMiddleware, createUser);

// Change user name
router.patch(
  '/',
  validateGroupCodeMiddleware,
  checkUserNameMatchMiddleware,
  changeUserName,
);

// Delete user
router.delete('/', validateGroupCodeMiddleware, deleteUser);

// List users by groupCode
router.get(
  '/byGroupCode/:groupCode',
  validateGroupCodeMiddleware,
  listAllUsersByGroupCode,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all users
router.get('/debug/all', developmentOnlyMiddleware, listAllUsers);
// Delete all users
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllUsers);

export default router;
