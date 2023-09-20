import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupId,
} from '../controllers/userController.js';
import developmentOnly from '../middleware/developmentOnly.js';

const router = express.Router();

// Create new user
router.post('/', createUser);

// Change user name
router.patch;

// List users by groupId
router.get('/', listAllUsersByGroupId);

// List all users
router.get('/', developmentOnly, listAllUsers);

export default router;
