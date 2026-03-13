"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutSection() {
  const [doctorImage, setDoctorImage] = useState('/dr-shruti.jpg'); 

  useEffect(() => {
    const fetchDoctorImage = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.doctorProfileUrl) {
            setDoctorImage(data.doctorProfileUrl);
          }
        }
      } catch (error) {
        console.error("Could not load dynamic doctor profile image");
      }
    };
    fetchDoctorImage();
  }, []);

  return (
    <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative background blob */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-40"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">

        {/* Left Side: Doctor's Image (Slides in from Left) */}
        <motion.div 
          className="md:w-1/2 w-full flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative group">
            {/* Animated glowing ring */}
            <div className="absolute inset-0 bg-teal-400 rounded-full blur-xl opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700"></div>
            
            <motion.div 
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white group-hover:border-teal-50 transition-colors duration-500"
            >
              <img
                src={doctorImage} 
                alt="Dr. Shruti Vanpariya"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Text Content (Slides in from Right) */}
        <motion.div 
          className="md:w-1/2 w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Meet Dr. Shruti Vanpariya
          </h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
            <p>
              At Vraj Homeopathic Clinic, Dr. Shruti is dedicated to providing compassionate, individualized care. She believes in treating the whole person—mind, body, and spirit—to achieve lasting health and vitality without harsh side effects.
            </p>
            <p>
              With a deep understanding of natural homeopathic remedies, she specializes in chronic conditions, women's health, and pediatric care, ensuring every patient receives a completely tailored treatment plan.
            </p>
          </div>
          
          <Link href="/about" className="group inline-flex items-center gap-3 text-teal-600 font-bold hover:text-teal-800 transition-colors text-lg">
            Read Full Profile
            <motion.span 
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              &rarr;
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}