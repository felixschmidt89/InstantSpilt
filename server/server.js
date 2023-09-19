import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

// Construct Mongoose database
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

// Define Mongoose connection options
const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL parser
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
};

// Connect to MongoDB using Mongoose
mongoose
  .connect(db, mongooseOptions)
  .then(() => {
    console.log('Database connected! 😃');
  })
  .catch((error) => {
    console.log(error.message);
    console.log('🤨');
  });

// Define the port
const port = process.env.PORT || 3000;

// Start the express server
app.listen(port, () =>
  console.log(
    `App is running on port ${port} in ${process.env.NODE_ENV} environment`,
  ),
);
