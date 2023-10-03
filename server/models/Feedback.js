import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  requestType: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  groupCode: {
    type: String,
  },
});

const Feedback = model('Feedback', feedbackSchema);

module.exports = Feedback;
