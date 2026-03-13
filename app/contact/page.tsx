"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    symptoms: "",
    consultationType: "In-Clinic",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", date: "", symptoms: "", consultationType: "In-Clinic" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus("error");
    }
  };

  // --- Animation Variants ---
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const slideRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">

      {/* Page Header */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          {/* ✨ THE PREMIUM SHEEN EFFECT ✨ */}
          <motion.span
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-teal-300 to-teal-600 bg-[length:200%_auto]"
            animate={{ backgroundPosition: ["0% center", "200% center"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            Contact & Book
          </motion.span>{" "}
          an Appointment
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ready to start your journey to natural health? Reach out to us or schedule your consultation with Dr. Shruti Vanpariya today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left Side: Clinic Information */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={slideLeft}
          className="bg-teal-50 rounded-2xl p-8 h-full border border-teal-100 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold text-teal-800 mb-6">Clinic Information</h2>
          <div className="space-y-6 text-gray-700">

            <motion.p whileHover={{ x: 5 }} className="flex items-start transition-transform cursor-default">
              <svg className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <span>Amrut Nagar Main Rd, Keshod, Gujarat 362220</span>
            </motion.p>
            <motion.p whileHover={{ x: 5 }} className="flex items-center transition-transform cursor-default">
              <svg className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <span>+91 6354380556</span>
            </motion.p>
            <motion.p whileHover={{ x: 5 }} className="flex items-center transition-transform cursor-default">
              <svg className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>vrajhomeopathicclinic@gmail.com</span>
            </motion.p>

            <div className="pt-6 mt-6 border-t border-teal-200">
              <h3 className="font-semibold text-teal-800 mb-2">Clinic Hours</h3>
              <p>Mon - Sat: 9:30 AM - 1:00 PM & 4:00 PM - 8:00 PM</p>
              <p className="text-red-500 font-medium mt-1">Sunday: By Appointment Only</p>
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
              <motion.div 
                className="absolute inset-0 bg-teal-900/10 pointer-events-none"
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

          </div>
        </motion.div>

        {/* Right Side: Appointment Form UI */}
        <motion.div 
          id="booking-section" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={slideRight}
          className="bg-teal-50 rounded-2xl p-8 shadow-xl border border-teal-100 scroll-mt-24 h-full"
        >
          <h2 className="text-2xl font-bold text-teal-800 mb-6">Request an Appointment</h2>

          {status === "success" ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-green-50 text-green-800 p-6 rounded-lg border border-green-200 text-center"
            >
              <h3 className="text-xl font-bold mb-2">Request Sent Successfully!</h3>
              <p>Thank you. The clinic will contact you shortly to confirm your appointment time.</p>
              <button onClick={() => setStatus("idle")} className="mt-4 text-teal-600 font-semibold hover:underline">
                Book another appointment
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label htmlFor="consultationType" className="block text-sm font-bold text-teal-800 mb-1 uppercase tracking-wide">Consultation Type</label>
                <select
                  id="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-teal-50/30 border border-teal-200 rounded-md focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors text-gray-900 font-medium cursor-pointer"
                >
                  <option value="In-Clinic">In-Clinic Visit</option>
                  <option value="Online">Online Consultation</option>
                </select>
              </div>

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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-md hover:bg-teal-700 transition-colors mt-4 shadow-md text-lg disabled:bg-gray-400"
              >
                {status === "submitting" ? "Sending..." : "Submit Request"}
              </motion.button>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}