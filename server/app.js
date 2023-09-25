import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import groupRouter from './routes/groupRouter.js';
import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';

// Create an express application
const app = express();

// Destructure environment variables
const { NODE_ENV, API_BASEURL } = process.env;

// Load environment variables based on NODE_ENV
if (NODE_ENV === 'production') {
  dotenv.config({ path: '../config.prod.env' });
} else {
  dotenv.config({ path: '../config.dev.env' });
}

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// MIDDLEWARES
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use(`${API_BASEURL}/groups`, groupRouter);
app.use(`${API_BASEURL}/users`, userRouter);
app.use(`${API_BASEURL}/expenses`, expenseRouter);

export default app;
