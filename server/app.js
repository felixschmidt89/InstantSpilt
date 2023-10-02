import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import groupRouter from './routes/groupRouter.js';
import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import compression from 'compression';

// Create an express application
const app = express();

// Access the initial NODE_ENV environment variable
const nodeEnv = process.env.NODE_ENV;

// Load environment variables based on initial NODE_ENV
if (nodeEnv === 'production') {
  dotenv.config({ path: '../config.prod.env' });
} else {
  dotenv.config({ path: '../config.dev.env' });
}

// Destructure loaded environment variables
const { API_BASEURL, NODE_ENV } = process.env;

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

app.use(compression());

// MIDDLEWARES
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use(`${API_BASEURL}/groups`, groupRouter);
app.use(`${API_BASEURL}/users`, userRouter);
app.use(`${API_BASEURL}/expenses`, expenseRouter);
app.use(`${API_BASEURL}/payments`, paymentRouter);

export default app;
