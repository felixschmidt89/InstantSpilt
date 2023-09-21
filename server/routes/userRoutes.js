import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupCode,
  changeUserName,
} from '../controllers/userController.js';
import developmentOnly from '../middleware/developmentOnly.js';
import { validateUserNamePropertyPresence } from '../middleware/validateRequestBody.js';
import { checkUserNameMatch } from '../middleware/validatePropertyMatch.js';
import validateGroupCode from '../middleware/validateGroupCode.js';

const router = express.Router();

// Create new user
router.post(
  '/',
  validateGroupCode,
  validateUserNamePropertyPresence,
  createUser,
);

// Change user name
router.patch('/', validateGroupCode, checkUserNameMatch, changeUserName);

// List users by groupCode
router.get(
  '/byGroupCode/:groupCode',
  validateGroupCode,
  listAllUsersByGroupCode,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all users
router.get('/debug/all', developmentOnly, listAllUsers);

export default router;
