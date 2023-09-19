import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import groupRoutes from './routes/groupRoutes.js';
import { developmentApiBaseUrl } from './config/config.development.js';
import { productionApiBaseUrl } from './config/config.production.js';

// Create an express application
const app = express();

// Choose the appropriate apiBaseUrl based on the environment
const apiBaseUrl =
  process.env.NODE_ENV === 'production'
    ? productionApiBaseUrl
    : developmentApiBaseUrl;

// Parse request bodies as JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ROUTES
app.use(`${apiBaseUrl}/groups`, groupRoutes);

export default app;
