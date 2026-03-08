import Link from 'next/link';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Dr. Shruti Vanpariya",
  description: "Read about Dr. Shruti's qualifications, her homeopathic healing philosophy, and her dedication to natural patient care in Gujarat.",
};
export default function AboutDoctorPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Page Header */}
      <div className="bg-teal-900 text-white py-20 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-800 rounded-full blur-[80px] opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Meet <span className="text-teal-400">Dr. Shruti Vanpariya</span>
          </h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Dedicated to restoring your health gently, naturally, and permanently through the power of classical homeopathy.
          </p>
        </div>
      </div>

      {/* 2. Main Biography Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center lg:items-start">
          
          {/* Left: Doctor's Portrait */}
          <div className="w-full lg:w-1/3 flex flex-col items-center">
            <div className="relative group w-72 h-96 md:w-80 md:h-[450px]">
              {/* Animated shadow behind the image */}
              <div className="absolute inset-0 bg-teal-200 rounded-3xl translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500"></div>
              {/* Actual Image */}
              <div className="absolute inset-0 bg-gray-200 rounded-3xl border-4 border-white shadow-xl flex items-center justify-center overflow-hidden z-10 text-center">
                <img 
  src="/dr-shruti.jpg" 
  alt="Dr. Shruti Vanpariya" 
  className="w-full h-full object-cover"
/>
              </div>
            </div>
            
            {/* Credentials Card */}
            <div className="mt-12 bg-teal-50 w-full rounded-2xl p-6 border border-teal-100 text-center shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualifications</h3>
              <p className="text-gray-700 font-medium">B.H.M.S.</p>
              <p className="text-gray-600 text-sm mt-1">(Bachelor of Homeopathic Medicine and Surgery)</p>
              <div className="w-12 h-1 bg-teal-300 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          {/* Right: Written Biography */}
          <div className="w-full lg:w-2/3 space-y-8 text-lg text-gray-700 leading-relaxed">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Journey Dedicated to Healing</h2>
            
            <p className="text-gray-900">
              Welcome to Vraj Homeopathy. I am Dr. Shruti Vanpariya, and my life's passion is helping patients achieve true wellness rather than just temporarily suppressing their symptoms. 
            </p>
            
            <p className="text-gray-900">
              With extensive training in classical homeopathy, I have dedicated my practice to understanding the deep-rooted causes of illness. I firmly believe that every individual is unique, and therefore, their treatment must be uniquely tailored to their specific physical, mental, and emotional constitution.
            </p>

            <div className="bg-white border-l-4 border-teal-500 pl-6 py-2 my-8 italic text-xl text-gray-800 shadow-sm rounded-r-lg">
              "The highest ideal of cure is rapid, gentle and permanent restoration of the health." <br/>
              <span className="text-sm text-gray-500 font-semibold mt-2 block">— Dr. Samuel Hahnemann</span>
            </div>

            <p className="text-gray-900">
              Over the years, I have successfully treated a wide variety of chronic and acute conditions, with a special focus on <strong>women's health, pediatric care, skin disorders, and respiratory issues</strong>. My approach is compassionate and thorough. When you visit my clinic, you are not just a patient file; we take the time to listen to your entire health history to find the exact remedy that will stimulate your body's own natural healing abilities.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Core Values Grid */}
      <div className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">My Approach to Your Health</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Why classical homeopathy is the right choice for long-term vitality.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Root-Cause Healing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">We don't just put a band-aid on symptoms. We investigate the underlying imbalances in your system to cure the illness from its absolute source.</p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Care</h3>
              <p className="text-gray-600 text-sm leading-relaxed">No two patients get the exact same prescription. Your remedy is selected based on your unique personality, genetics, and specific symptom presentation.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 text-center group">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Safe & Natural</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our medicines are highly diluted, making them completely non-toxic, non-addictive, and safe for everyone including infants and pregnant women.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Call To Action Footer */}
      <div className="bg-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to start your journey to natural health?</h2>
          <p className="text-teal-100 mb-8 text-lg">Book a detailed consultation today and take the first step toward a healthier, happier you.</p>
          <Link href="/contact" className="inline-block bg-white text-teal-700 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-teal-50 hover:-translate-y-1 transition-all duration-300">
            Schedule an Appointment
          </Link>
        </div>
      </div>

    </div>
  );
}