import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';

// This function ONLY runs when the frontend sends a POST request
export async function POST(request: Request) {
  try {
    // 1. Unpack the data sent from the frontend form
    const body = await request.json();
    const { name, phone, date, symptoms } = body;

    // 2. Open the secure connection to your MongoDB Atlas database
    await connectToDatabase();

    // 3. Create a new entry using the exact rules from our Schema
    const newAppointment = new Contact({
      name,
      phone,
      date,
      symptoms,
    });

    // 4. Save the entry permanently into the database
    await newAppointment.save();

    // 5. Send a "Success" message back to the frontend
    return NextResponse.json(
      { message: "Appointment request saved successfully!" }, 
      { status: 201 }
    );

  } catch (error) {
    // If anything goes wrong, log the error and tell the frontend it failed
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Failed to save appointment request." }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all contacts, newest first
    const contacts = await Contact.find({}).sort({ _id: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}