import mongoose, { Schema, models } from 'mongoose';

const blogSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, default: 'General' },
  readTime: { type: String, default: '5 min' },
}, { 
  timestamps: true 
});

const Blog = models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;