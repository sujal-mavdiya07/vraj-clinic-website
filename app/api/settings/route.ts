import { NextResponse } from 'next/server';
import connectMongo from '@/lib/mongodb'; 

export async function GET() {
  try {
    await connectMongo();
    // Dynamically import to avoid edge case errors in Next.js routing
    const Settings = (await import('@/models/Settings')).default;
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); 
    }
    
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Database GET Error:", error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectMongo();
    const Settings = (await import('@/models/Settings')).default;
    
    const body = await request.json();
    const settings = await Settings.findOneAndUpdate({}, body, { new: true, upsert: true });
    
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Database PUT Error:", error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}