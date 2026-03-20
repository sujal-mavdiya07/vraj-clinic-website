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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // 1. Format the message for WhatsApp
    const message = `🚨 *New Appointment Request*\n\n` +
      `*Patient Name:* ${formData.name}\n` +
      `*Phone Number:* ${formData.phone}\n` +
      `*Requested Date:* ${formData.date}\n` +
      `*Consultation Type:* ${formData.consultationType}\n\n` +
      `*Symptoms / Notes:*\n${formData.symptoms}\n\n` +
      `_Sent securely via Vraj Clinic Website_`;

    // 2. Encode the message for a URL
    const encodedMessage = encodeURIComponent(message);
    
    // 3. The Clinic's exact WhatsApp number
    const clinicNumber = "916354380556"; 

    // 4. Create the WhatsApp link and open it
    const whatsappUrl = `https://wa.me/${clinicNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    // Show success message on the website
    setStatus("success");
    setFormData({ name: "", phone: "", date: "", symptoms: "", consultationType: "In-Clinic" });
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
              <h3 className="text-xl font-bold mb-2">Redirecting to WhatsApp...</h3>
              <p>Please hit "Send" in WhatsApp to confirm your appointment request with Dr. Shruti.</p>
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-bold py-3.5 sm:py-3 px-4 rounded-xl hover:bg-[#128C7E] transition-all mt-6 shadow-lg shadow-[#25D366]/30 text-base sm:text-lg"
              >
                {/* Responsive Custom WhatsApp Icon */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Book via WhatsApp
              </motion.button>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  );
}