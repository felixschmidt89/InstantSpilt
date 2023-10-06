import express from 'express';
import { checkHealth } from '../controllers/healthController.js';

const router = express.Router();

// Check if server responds
router.get('/check', checkHealth);

export default router;
