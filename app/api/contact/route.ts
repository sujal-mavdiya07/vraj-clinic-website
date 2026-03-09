import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    console.log("Data received from form:", body); // This helps you debug!

    // Create the new appointment in MongoDB
    const newAppointment = await Contact.create({
      name: body.name,
      phone: body.phone,
      date: body.date,
      symptoms: body.symptoms || "None provided",
    });

    return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });
  } catch (error) {
    console.error("API Error saving appointment:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    // Fetch all appointments, newest first
    const appointments = await Contact.find({}).sort({ createdAt: -1 }); 
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("API Error fetching appointments:", error);
    return NextResponse.json([], { status: 500 });
  }
}