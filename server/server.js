import mongoose from 'mongoose';
import app from './app.js';
import cron from 'node-cron';
import purgeInactiveGroups from './scripts/dataPurge/purgeInactiveGroups.js';
// import seedTestData from './scripts/TestData/dataSeeder.js';

// Deconstruct environment variables
const { DB_USER, DB_PASS, DB_HOST, DB_NAME, PORT, NODE_ENV } = process.env;

// Construct Mongoose database
const db = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;

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

// Scripts
// Schedule the inactive group data purge to run at 3 am CET daily
cron.schedule(
  '0 3 * * *',
  () => {
    console.log('Running purgeInactiveGroups at 3 am CET...');
    purgeInactiveGroups();
  },
  {
    timezone: 'Europe/Paris',
  },
);

// Seed production group with proper test data
// seedTestData('43GKFH7U');

// Define the port
const port = PORT || 3000;

// Start the express server
app.listen(port, () =>
  console.log(`App is running on port ${port} in ${NODE_ENV} environment`),
);
