import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

// Load environment variables
dotenv.config({ path: '../config.env' });

// Define the port
const port = process.env.PORT || 3000;

// Start the express server
app.listen(port, () => console.log(`App is running on port ${port}...`));

// Construct MongoDB connection string
const db = process.env.DATABASE.replace(
  '<DATABASE_USERNAME>',
  process.env.DATABASE_USERNAME,
)
  .replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD)
  .replace('<DATABASE_NAME>', process.env.DATABASE_NAME);

// Define Mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
};

// Connect to MongoDB using Mongoose
mongoose
  .connect(db, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

export default app;
