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

const router = express.Router();

// Create new user
router.post('/', validateUserNamePropertyPresence, createUser);

// Change user name
router.patch('/', checkUserNameMatch, changeUserName);

// List users by groupId
router.get('/', listAllUsersByGroupId);

// List all users
router.get('/', developmentOnly, listAllUsers);

export default router;
