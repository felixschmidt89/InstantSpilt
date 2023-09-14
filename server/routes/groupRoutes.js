import express from 'express';
import {
  createGroup,
  updateGroupName,
  listAllGroups,
  deleteAllGroups,
} from '../controllers/groupController.js';
import { developmentOnly } from '../middleware/developmentOnly.js';
import { validateGroupExistence } from '../middleware/validateGroupExistence.js';

const router = express.Router();

// Create a new group
router.post('/', createGroup);
// Update group name by groupID
router.patch('/:groupId', validateGroupExistence, updateGroupName);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all groups
router.get('/', developmentOnly, listAllGroups);
// Delete all groups
router.delete('/', developmentOnly, deleteAllGroups);

export default router;
