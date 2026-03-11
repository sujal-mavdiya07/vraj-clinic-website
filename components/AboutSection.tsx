"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AboutSection() {
  // 1. State to hold the dynamic image URL (with your local file as the default fallback)
  const [doctorImage, setDoctorImage] = useState('/dr-shruti.jpg'); 

  // 2. Fetch the live image URL from the database when the component loads
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
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">

        {/* Left Side: Doctor's Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative group">
            {/* Animated glowing ring */}
            <div className="absolute inset-0 bg-teal-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"></div>
            <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-8 border-white group-hover:border-teal-50 transition-colors duration-500">
              <img
                src={doctorImage} // <--- Now uses the dynamic database image!
                alt="Dr. Shruti Vanpariya"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="md:w-1/2 w-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Meet Dr. Shruti Vanpariya
          </h2>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
            <p>
              At Vraj Homeopathic Clinic, Dr. Shruti is dedicated to providing compassionate, individualized care. She believes in treating the whole person mind, body, and spirit to achieve lasting health and vitality without harsh side effects.
            </p>
            <p>
              With a deep understanding of natural homeopathic remedies, she specializes in chronic conditions, women's health, and pediatric care, ensuring every patient receives a completely tailored treatment plan.
            </p>
          </div>
          <Link href="/about" className="group inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-800 transition-colors text-lg">
            Read Full Profile
            <span aria-hidden="true" className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}