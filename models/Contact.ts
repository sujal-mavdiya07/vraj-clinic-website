import mongoose, { Schema, models } from 'mongoose';

// 1. Define the Blueprint (Schema)
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  date: {
    type: String,
    required: [true, 'Preferred date is required'],
  },
  symptoms: {
    type: String,
    required: [true, 'Symptoms description is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 2. Create the Model (or use the existing one if Next.js hot-reloads)
const Contact = models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;