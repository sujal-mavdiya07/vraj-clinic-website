import { NextResponse } from 'next/server';
// ... keep your existing imports (like MongoDB and Blog model) ...

// THE FIX: Type params as a Promise
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // THE FIX: You must 'await' the params before extracting the id!
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // ... your existing database logic ...
    // Example: const blog = await Blog.findById(id);
    // return NextResponse.json(blog);

  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// (Do the exact same thing if you have a DELETE or PUT function in this file!)
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // ... your existing delete logic ...
    
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}