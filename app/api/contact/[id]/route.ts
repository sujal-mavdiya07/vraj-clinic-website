import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    // Safely unwrap the ID (Vercel strictness fix!)
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Find and delete the appointment
    const deletedAppointment = await Contact.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Appointment deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}