import mongoose from 'mongoose';
import app from './app.js';
import cron from 'node-cron';
import purgeInactiveGroups from './scripts/dataPurge/purgeInactiveGroups.js';
// import seedDemoData from './scripts/DataSeeder/seedDemoData.js';

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

// Active scripts
// Schedule the inactive group data purge based on the environment
const cronSchedule = NODE_ENV === 'development' ? '0 10 * * *' : '0 3 * * *';
cron.schedule(
  cronSchedule,
  () => {
    console.log(
      `Running purgeInactiveGroups at ${
        NODE_ENV === 'development' ? '10 am' : '3 am'
      }...`,
    );
    purgeInactiveGroups();
  },
  {
    timezone: 'Europe/Paris',
  },
);

// Inactive scripts
// seedDemoData('EMEESOY4');

// Define the port
const port = PORT || 3000;

// Start the express server
app.listen(port, () =>
  console.log(`App is running on port ${port} in ${NODE_ENV} environment`),
);
