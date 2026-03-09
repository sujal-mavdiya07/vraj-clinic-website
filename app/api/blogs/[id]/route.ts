import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// 1. GET FUNCTION - Fetches a single blog post to read
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB(); // Connect to MongoDB
    
    // Safely unwrap the URL parameters
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Find the specific blog in the database
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });

  } catch (error) {
    console.error("Error fetching individual blog:", error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

// 2. DELETE FUNCTION - Deletes a blog post from the admin panel
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB(); // Connect to MongoDB
    
    // Safely unwrap the URL parameters
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Delete the specific blog from the database
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found to delete" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}