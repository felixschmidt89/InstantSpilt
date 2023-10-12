import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinaryConfig.js';
import { StatusCodes } from 'http-status-codes';
import { uploadImage } from '../controllers/fileController.js';

const router = express.Router();

// Configure the storage settings for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for storing uploaded files
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on the original filename and the current timestamp
    const ext = file.mimetype.split('/')[1];
    const originalNameExtension = file.originalname.split('.')[0];
    cb(null, `${originalNameExtension}-${Date.now()}.${ext}`);
  },
});

// Set up multer middleware with storage, file size limits, and file type filter (image files only)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB in bytes
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Oops! Only image files are allowed!'), false);
    }
  },
});

// Handle file uploads using Multer and Cloudinary
router.post('/', upload.single('file'), uploadImage);

export default router;
