import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-teal-50 via-white to-teal-50 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Vraj Homeopathic Clinic</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Experience personalized homeopathic care with Dr. Shruti Vanpariya. We treat the root cause of your illness, not just the symptoms, providing safe, effective, and natural treatments for all ages.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/contact" className="bg-teal-600 text-white text-center hover:bg-teal-500 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1">
              Book Appointment
            </Link>
            <Link href="/about" className="bg-white text-teal-700 text-center border-2 border-teal-100 hover:border-teal-300 hover:bg-teal-50 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:-translate-y-1">
              Meet Dr. Shruti
            </Link>
          </div>
        </div>

        {/* Right Side: Image with floating animation */}
        <div className="md:w-1/2 w-full relative group">
          <div className="absolute inset-0 bg-teal-200 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="relative bg-white border-4 border-white rounded-3xl shadow-2xl w-full h-96 flex items-center justify-center overflow-hidden hover:-translate-y-2 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1000" 
              alt="Vraj Homeopathic Clinic Environment" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}