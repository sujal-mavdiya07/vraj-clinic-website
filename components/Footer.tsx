import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-8 relative overflow-hidden border-t border-slate-800">
      {/* Subtle Premium Background Glow */}
      <div className="absolute top-[-10%] left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          
          {/* Column 1: Clinic Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-white tracking-tight">
              Vraj <span className="text-teal-400 drop-shadow-sm">Homeopathy</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg font-medium">
              Expert homeopathic care with Dr. Shruti Vanpariya. Natural, holistic, and personalized treatments for your complete well-being.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              {['Home', 'Meet Dr. Shruti', 'Treatments', 'Health Blog', 'Book Appointment'].map((item, index) => {
                const routes = ['/', '/about', '/services', '/blog', '/contact'];
                return (
                  <li key={index}>
                    <Link href={routes[index]} className="group flex items-center hover:text-teal-300 transition-colors">
                      <span className="h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-4 group-hover:mr-2"></span>
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact Info (SVGs Replaced Emojis) */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 font-medium">
              <li className="flex items-start gap-3 hover:text-teal-100 transition-colors group">
                <svg className="w-6 h-6 text-teal-500 group-hover:text-teal-300 flex-shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Amrut Nagar Main Rd, Keshod, Gujarat 362220</span>
              </li>
              <li className="flex items-center gap-3 hover:text-teal-100 transition-colors group">
                <svg className="w-5 h-5 text-teal-500 group-hover:text-teal-300 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span>+91 6354380556</span>
              </li>
              <li className="flex items-center gap-3 hover:text-teal-100 transition-colors group">
                <svg className="w-5 h-5 text-teal-500 group-hover:text-teal-300 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>vrajhomeopathicclinic@gmail.com</span>
              </li>
              <li className="pt-4 mt-2 border-t border-slate-800">
                <span className="block text-teal-400 font-bold mb-1 tracking-wide">Opening Hours:</span>
                Mon - Sat: 10:00 AM - 8:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Cyber Security & Legal Warning Panel */}
        <div className="mb-8 p-5 bg-slate-900/50 border border-slate-800 rounded-xl flex items-start gap-4 text-slate-400 shadow-inner">
          <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <div>
            <h5 className="text-slate-300 font-bold text-sm mb-1 tracking-wide uppercase">Security & Legal Notice</h5>
            <p className="text-xs leading-relaxed font-medium">
              Any unauthorized access, data scraping, or malicious activity on this platform is strictly prohibited. Network traffic is actively monitored. Violations, including spam or attempts to breach patient confidentiality, will be permanently logged and immediately reported to cybercrime authorities for legal prosecution. Infrastructure security is continuously monitored and enforced by <span className="text-teal-500 font-bold">NexusNode</span>.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Agency Credit */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Vraj Homeopathic Clinic. All rights reserved.</p>
          <p className="mt-4 md:mt-0 flex items-center gap-2 text-sm">
            Engineered & Secured by 
            <span className="text-teal-500 font-black tracking-wider hover:text-teal-300 hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.6)] transition-all cursor-pointer">
              NexusNode
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
}