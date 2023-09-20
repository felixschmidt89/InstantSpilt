import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupId,
  changeUserName,
} from '../controllers/userController.js';
import developmentOnly from '../middleware/developmentOnly.js';
import { validateUserNamePropertyPresence } from '../middleware/validateRequestBody.js';
import { checkUserNameMatch } from '../middleware/validatePropertyMatch.js';
import validateGroupId from '../middleware/validateGroupId.js';

const router = express.Router();

// Create new user
router.post('/', validateGroupId, validateUserNamePropertyPresence, createUser);

// Change user name
router.patch('/', validateGroupId, checkUserNameMatch, changeUserName);

// List users by groupId
router.get('/byGroupId/:groupId', validateGroupId, listAllUsersByGroupId);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all users
router.get('/debug/all', developmentOnly, listAllUsers);

export default router;
