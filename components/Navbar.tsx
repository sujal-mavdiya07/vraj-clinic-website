"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // This "listens" to the user's scroll position to trigger the shrink/glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out border-b ${
        isScrolled 
          ? 'bg-teal-900/85 backdrop-blur-lg border-teal-700/50 shadow-xl' 
          : 'bg-teal-800 border-transparent shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Dynamic height based on scroll state */}
        <div className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
          isScrolled ? 'h-16' : 'h-24'
        }`}>
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" onClick={closeMenu} className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Vraj Homeopathy Logo" 
                  className={`rounded-full object-cover border-2 border-white/90 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    isScrolled ? 'h-10 w-10' : 'h-12 w-12 sm:h-14 sm:w-14'
                  }`} 
                />
              </div>
              
              <span className={`font-extrabold text-white tracking-tight transition-all duration-500 group-hover:scale-105 origin-left ${
                isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
              }`}>
                Vraj <span className="text-teal-400 drop-shadow-sm">Homeopathy</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {/* Animated Underline Links */}
            {['Home', 'About', 'Services', 'Blog'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="relative group text-slate-100 hover:text-white font-semibold transition-colors py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
              </Link>
            ))}
            
            <div className="flex items-center gap-4 pl-4 border-l border-teal-700/50">
              <Link 
                href="/contact#booking-section" 
                className="text-teal-50 hover:text-white font-bold transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(204,253,246,0.5)]"
              >
                Online Consult
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-teal-900 px-6 py-2.5 rounded-full font-black tracking-wide hover:bg-teal-50 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_14px_0_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.3)]"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button (Animated Hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative group"
              aria-label="Toggle menu"
            >
              <span className={`block h-1 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'w-8 rotate-45 translate-y-2.5 bg-teal-300' : 'w-8 group-hover:bg-teal-200'}`}></span>
              <span className={`block h-1 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'w-8 opacity-0' : 'w-6 group-hover:w-8 group-hover:bg-teal-200'}`}></span>
              <span className={`block h-1 bg-white rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'w-8 -rotate-45 -translate-y-2.5 bg-teal-300' : 'w-8 group-hover:bg-teal-200'}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu (Floating Glass Card) */}
        <div 
          className={`md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-teal-900/95 backdrop-blur-xl border border-teal-700/50 rounded-2xl shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] transform origin-top ${
            isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex flex-col space-y-3">
            {['Home', 'About', 'Services', 'Blog'].map((item, i) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                onClick={closeMenu} 
                className="px-4 py-3 text-white hover:bg-teal-800/50 hover:text-teal-200 rounded-xl font-semibold transition-all duration-200"
              >
                {item}
              </Link>
            ))}
            
            <div className="pt-4 pb-2 mt-2 border-t border-teal-800/50 space-y-3">
              <Link 
                href="/contact#booking-section" 
                onClick={closeMenu} 
                className="block w-full text-center bg-teal-800/50 text-white border border-teal-600/50 px-4 py-3.5 rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-sm"
              >
                Online Consult
              </Link>
              <Link 
                href="/contact" 
                onClick={closeMenu} 
                className="block w-full text-center bg-white text-teal-900 px-4 py-3.5 rounded-xl font-black hover:bg-teal-50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}