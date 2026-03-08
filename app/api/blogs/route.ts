import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET: This sends the blogs from MongoDB to your website
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ _id: -1 }); // Newest first
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json({ message: "Error fetching blogs" }, { status: 500 });
  }
}

// POST: This saves new blogs from your Admin Panel into MongoDB
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const newBlog = await Blog.create(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Blog Save Error:", error);
    return NextResponse.json({ message: "Error creating blog" }, { status: 500 });
  }
}