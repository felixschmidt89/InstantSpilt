import express from 'express';

import {
  createPayment,
  listAllPayments,
  deleteAllPayments,
  getPaymentInfo,
  deletePayment,
} from '../controllers/paymentController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';

const router = express.Router();

// Create payment
router.post('/', createPayment);

// Get payment info by id
router.get('/:paymentId', getPaymentInfo);

// Delete payment
router.delete('/:paymentId', deletePayment);

// router.post('/', deletePayment);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
//List all payments
router.get('/debug/all', developmentOnlyMiddleware, listAllPayments);

//Delete all payments
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllPayments);

export default router;
