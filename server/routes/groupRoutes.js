import express from 'express';
import {
  createGroup,
  changeGroupName,
  listAllGroups,
  deleteAllGroups,
} from '../controllers/groupController.js';
import developmentOnly from '../middleware/developmentOnly.js';
import validateGroupId from '../middleware/validateGroupId.js';
import validateRequestBody from '../middleware/validateRequestBody.js';

const router = express.Router();

// Create a new group
const createGroupRequiredProperties = ['groupName'];
router.post(
  '/',
  validateRequestBody(createGroupRequiredProperties),
  createGroup,
);
// Update group name
const changeGroupNameRequiredProperties = ['groupName'];
router.patch(
  '/',
  validateGroupId,
  validateRequestBody(changeGroupNameRequiredProperties),
  changeGroupName,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

// List all groups
router.get('/', developmentOnly, listAllGroups);
// Delete all groups
router.delete('/', developmentOnly, deleteAllGroups);

export default router;
