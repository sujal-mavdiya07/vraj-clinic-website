"use client"; // This is required for interactive buttons in Next.js

import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  // 1. The "Memory" - Tracks what the patient types
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    symptoms: "",
  });

  // Tracks if the form is loading, successful, or failed
  const [status, setStatus] = useState("idle"); 

  // 2. The "Typing Tracker" - Updates memory when user types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. The "Sender" - Fires data to your API when button is clicked
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stops the page from refreshing
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", date: "", symptoms: "" }); // Clear form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact & Book an Appointment</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ready to start your journey to natural health? Reach out to us or schedule your consultation with Dr. Shruti Vanpariya today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Side: Clinic Information */}
        <div className="bg-teal-50 rounded-2xl p-8 h-full border border-teal-100">
          <h2 className="text-2xl font-bold text-teal-800 mb-6">Clinic Information</h2>
          <div className="space-y-6 text-gray-700">
            <p className="flex items-center"><span className="text-2xl mr-4">📍</span> Amrut Nagar Main Rd, Keshod, Gujarat 362220</p>
            <p className="flex items-center"><span className="text-2xl mr-4">📞</span> +91 6354380556</p>
            <p className="flex items-center"><span className="text-2xl mr-4">✉️</span> vanapariyashruti111@gmail.com</p>
            
            <div className="pt-6 mt-6 border-t border-teal-200">
              <h3 className="font-semibold text-teal-800 mb-2">Clinic Hours</h3>
              <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
              <p className="text-red-500 font-medium mt-1">Sunday: Half Day</p>
            </div>
            
            {/* REAL GOOGLE MAP */}
            <div className="mt-8 w-full h-64 rounded-xl overflow-hidden shadow-inner border border-gray-200 relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.606418675771!2d70.24574807526398!3d21.295561480421387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd51007723527f%3A0x633ef99041137d55!2sVraj%20homoeopathic%20clinic!5e1!3m2!1sen!2sin!4v1772897650670!5m2!1sen!2sin" 
                className="w-full h-full border-0 absolute inset-0" 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
            
          </div>
        </div>

        {/* Right Side: Appointment Form UI */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request an Appointment</h2>
          
          {/* Show Success Message if status is "success" */}
          {status === "success" ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200 text-center">
              <h3 className="text-xl font-bold mb-2">Request Sent Successfully!</h3>
              <p>Thank you. The clinic will contact you shortly to confirm your appointment time.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-teal-600 font-semibold hover:underline">
                Book another appointment
              </button>
            </div>
          ) : (
            // Otherwise, show the form
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" id="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900" placeholder="Your Name" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900" placeholder="+91 00000 00000" />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input required type="date" id="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900" />
                </div>
              </div>
              
              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">Briefly describe your symptoms</label>
                <textarea required id="symptoms" rows={4} value={formData.symptoms} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900" placeholder="How can Dr. Shruti help you?"></textarea>
              </div>
              
              {status === "error" && (
                <p className="text-red-500 text-sm font-medium">Something went wrong. Please check your terminal.</p>
              )}

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-700 transition-colors mt-4 shadow-md text-lg disabled:bg-gray-400"
              >
                {status === "submitting" ? "Sending..." : "Submit Request"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}