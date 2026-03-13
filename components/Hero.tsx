"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
  // --- Animation Configurations ---
  // Added ": Variants" right here 👇
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  // Added ": Variants" right here 👇
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text Content */}
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight"
          >
            Welcome to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 inline-block relative">
              Vraj Homeopathic Clinic
              {/* Animated underline effect */}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                className="absolute bottom-1 left-0 h-1 bg-teal-400 rounded-full opacity-30"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg"
          >
            Experience personalized homeopathic care with Dr. Shruti Vanpariya. We treat the root cause of your illness, not just the symptoms, providing safe, effective, and natural treatments for all ages.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link href="/contact" className="group relative inline-flex items-center justify-center bg-teal-600 text-white px-8 py-3.5 rounded-full font-semibold overflow-hidden shadow-lg hover:shadow-teal-500/30 transition-all">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
              <span className="relative flex items-center gap-2">
                Book Appointment
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </Link>
            <Link href="/about" className="group inline-flex items-center justify-center bg-white text-teal-700 border-2 border-teal-100 hover:border-teal-300 hover:bg-teal-50 px-8 py-3.5 rounded-full font-semibold transition-all duration-300">
              Meet Dr. Shruti
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Image with floating & reveal animation */}
        <motion.div 
          className="md:w-1/2 w-full relative group"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          {/* Animated Background Glow */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 bg-teal-200 rounded-3xl blur-2xl group-hover:bg-teal-300 transition-colors duration-500"
          ></motion.div>

          {/* Main Floating Image */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative bg-white border-4 border-white rounded-3xl shadow-2xl w-full h-96 flex items-center justify-center overflow-hidden"
          >
            <motion.img 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000" 
              alt="Vraj Homeopathic Clinic Environment" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}