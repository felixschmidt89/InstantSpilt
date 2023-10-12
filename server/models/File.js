import { Schema, model } from 'mongoose';

const fileSchema = new Schema(
  {
    filename: {
      type: String,
    },
    path: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    size: {
      type: Number,
    },
    cloudinaryURL: {
      type: String,
    },
  },
  { timestamps: true },
);

const File = model('File', fileSchema);

export default File;
