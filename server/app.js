import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Create an express application
const app = express();

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
// app.use('/api/v1/tbd', tbdRouter);

// Route configuration

export default app;
