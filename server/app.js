import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import groupRouter from './routes/groupRouter.js';
import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import feedbackRouter from './routes/feedbackRouter.js';

// Create an express application
const app = express();

// Access the initial NODE_ENV environment variable
const nodeEnv = process.env.NODE_ENV;

// Load environment variables based on initial NODE_ENV
if (nodeEnv === 'production') {
  dotenv.config({ path: './config.prod.env' });
} else {
  dotenv.config({ path: './config.dev.env' });
}

// Destructure loaded environment variables
const { API_BASEURL, NODE_ENV } = process.env;

// MIDDLEWARES
// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
// Enable GZIP compression to reduce response size for faster loading
app.use(compression());
// Log requests in development
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use(`${API_BASEURL}/groups`, groupRouter);
app.use(`${API_BASEURL}/users`, userRouter);
app.use(`${API_BASEURL}/expenses`, expenseRouter);
app.use(`${API_BASEURL}/payments`, paymentRouter);
app.use(`${API_BASEURL}/feedbacks`, feedbackRouter);

export default app;
