import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Access initial NODE_ENV environment variable
const nodeEnv = process.env.NODE_ENV;

// Load environment variables based on initial NODE_ENV
if (nodeEnv === 'production') {
  dotenv.config({ path: './config.prod.env' });
} else {
  dotenv.config({ path: './config.dev.env' });
}

// Extract Cloudinary configuration variables
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

try {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Error initializing cloudinary configuration:', error);
  throw error;
}

export default cloudinary;
