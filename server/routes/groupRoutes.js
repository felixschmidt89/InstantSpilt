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

router.get('/list', listAllGroups);
router.delete('/delete', deleteAllGroups);
router.post('/create', createGroup);
router.patch('/update/name/', validateGroupExistence, updateGroupName);

router.get('/list', developmentOnly, listAllGroups);
router.delete('/delete', developmentOnly, deleteAllGroups);

export default router;
