import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  messageType: {
    type: String,
  },
  feedback: {
    type: String,
  },
  groupCode: {
    type: String,
  },
});

const Feedback = model('Feedback', feedbackSchema);

export default Feedback;
