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
  },
  { timestamps: true },
);

const File = model('File', fileSchema);

export default File;
