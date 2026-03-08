import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8 border-t-[6px] border-teal-500 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-900 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* Column 1: Clinic Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">
              Vraj <span className="text-teal-400">Homeopathy</span>
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Expert homeopathic care with Dr. Shruti Vanpariya. Natural, holistic, and personalized treatments for your complete well-being.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              {['Home', 'Meet Dr. Shruti', 'Treatments', 'Health Blog', 'Book Appointment'].map((item, index) => {
                const routes = ['/', '/about', '/services', '/blog', '/contact'];
                return (
                  <li key={index}>
                    <Link href={routes[index]} className="group flex items-center hover:text-teal-400 transition-colors">
                      <span className="h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3 hover:text-teal-100 transition-colors">
                <span className="text-xl">📍</span> 
                <span>Amrut Nagar Main Rd, Keshod, Gujarat 362220</span>
              </li>
              <li className="flex items-center gap-3 hover:text-teal-100 transition-colors">
                <span className="text-xl">📞</span> 
                <span>+91 6354380556</span>
              </li>
              <li className="flex items-center gap-3 hover:text-teal-100 transition-colors">
                <span className="text-xl">✉️</span> 
                <span>[Clinic Email Address]</span>
              </li>
              <li className="pt-4 border-t border-gray-800">
                <span className="block text-teal-400 font-bold mb-1">Opening Hours:</span>
                Mon - Sat: 10:00 AM - 8:00 PM
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Agency Credit */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vraj Homeopathic Clinic. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-2 text-sm">
            Designed & Developed by 
            <span className="text-teal-400 font-bold tracking-wider hover:text-teal-300 hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.8)] transition-all cursor-pointer">
              NexusNode
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}