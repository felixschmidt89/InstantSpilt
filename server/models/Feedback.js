import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name must be at least 1 character long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      trim: true,
      maxlength: [50, 'Email cannot exceed 50 characters'],
    },
    messageType: {
      type: String,
    },
    feedback: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [1, 'Message must be at least 1 character long'],
      maxlength: [2500, 'Feedback cannot exceed 1000 characters'],
    },
    groupCode: {
      type: String,
    },
    fileId: {
      type: Schema.Types.ObjectId,
      ref: 'File',
    },
  },
  { timestamps: true },
);

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
