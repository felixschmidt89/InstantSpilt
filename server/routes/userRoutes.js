import express from 'express';
import {
  createUser,
  listAllUsers,
  listAllUsersByGroupId,
} from '../controllers/userController.js';
import developmentOnly from '../middleware/developmentOnly.js';
import validateGroupId from '../middleware/validateGroupId.js';
import validateRequestBody from '../middleware/validateRequestBody.js';

const router = express.Router();

// Create new user
const createUserRequiredProperties = ['userName'];
router.post(
  '/',
  validateRequestBody(createUserRequiredProperties),
  validateGroupId,
  createUser,
);

// Change user name

// List users by groupId
router.get('/', listAllUsersByGroupId);

// List all users
router.get('/', developmentOnly, listAllUsers);

export default router;
