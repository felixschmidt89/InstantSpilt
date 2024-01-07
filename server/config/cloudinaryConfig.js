// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

try {
  // Configure Cloudinary using the environment variables
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Error initializing Cloudinary configuration:', error);
  throw error;
}

export default cloudinary;
