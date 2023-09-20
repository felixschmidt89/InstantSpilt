import express from 'express';
import {
  createGroup,
  updateGroupName,
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
const updateGroupNameRequiredProperties = ['groupId', 'groupName'];
router.patch(
  '/',
  validateGroupId,
  validateRequestBody(updateGroupNameRequiredProperties),
  updateGroupName,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

// List all groups
router.get('/', developmentOnly, listAllGroups);
// Delete all groups
router.delete('/', developmentOnly, deleteAllGroups);

export default router;
