import express from 'express';

import { createPayment } from '../controllers/paymentController.js';

const router = express.Router();

// Create a new payment
router.post('/', createPayment);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
//List all payments

//Delete all payments

export default router;
