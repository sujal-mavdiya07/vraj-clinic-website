import mongoose, { Schema, models } from 'mongoose';

const blogSchema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString() },
  imageUrl: { type: String, default: "/blog-placeholder.jpg" },
});

// This tells Mongoose to look for the "blogs" collection in your database
const Blog = models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;