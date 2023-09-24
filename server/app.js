import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import groupRouter from './routes/groupRouter.js';
import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import dotenv from 'dotenv';
import validateGroupCode from './middleware/validateGroupCode.js';

// Create an express application
const app = express();

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '../config.prod.env' });
} else {
  dotenv.config({ path: '../config.dev.env' });
}

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use(`${process.env.API_BASEURL}/groups`, groupRouter);
app.use(`${process.env.API_BASEURL}/users`, userRouter);
app.use(`${process.env.API_BASEURL}/expenses`, expenseRouter);

export default app;
