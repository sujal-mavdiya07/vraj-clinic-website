import mongoose, { Schema, models } from 'mongoose';

const SettingsSchema = new Schema({
  doctorProfileUrl: { 
    type: String, 
    default: '/doctor.jpg' // Default fallback image if she hasn't uploaded one yet
  },
});

// Use the existing model if it's already compiled, otherwise create a new one
const Settings = models.Settings || mongoose.model('Settings', SettingsSchema);

export default Settings;