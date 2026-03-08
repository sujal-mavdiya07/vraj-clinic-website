"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    // md:bg-teal-800 is the desktop color, bg-teal-700 is the mobile top bar color
    <nav className="bg-teal-700 md:bg-teal-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center">
            {/* Reduced gap slightly on mobile so it all fits */}
            <Link href="/" onClick={closeMenu} className="flex-shrink-0 flex items-center gap-2 sm:gap-4 group">
              
              <div className="relative flex-shrink-0">
                {/* Slightly smaller image on mobile (h-10 w-10) to save space */}
                <img 
                  src="/logo.png" 
                  alt="Vraj Homeopathy Logo" 
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300 group-hover:border-teal-100" 
                />
              </div>
              
              {/* REMOVED 'hidden sm:block' AND ADDED 'text-lg sm:text-2xl' */}
              <span className="font-extrabold text-lg sm:text-2xl text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
                Vraj <span className="text-teal-400">Homeopathy</span>
              </span>
              
            </Link>
          </div>
          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-white hover:text-teal-200 font-medium transition-colors">Home</Link>
            <Link href="/about" className="text-white hover:text-teal-200 font-medium transition-colors">About</Link>
            <Link href="/services" className="text-white hover:text-teal-200 font-medium transition-colors">Services</Link>
            <Link href="/blog" className="text-white hover:text-teal-200 font-medium transition-colors">Blog</Link>
            <Link href="/contact" className="bg-white text-teal-800 px-6 py-2.5 rounded-full font-bold hover:bg-teal-50 hover:scale-105 transition-all shadow-md">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button (Animated Hamburger) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative"
              aria-label="Toggle menu"
            >
              {/* Top Line */}
              <span className={`block w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              {/* Middle Line */}
              <span className={`block w-8 h-1 bg-white rounded-full transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              {/* Bottom Line */}
              <span className={`block w-8 h-1 bg-white rounded-full transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Smooth Slide Down) */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* CHANGED COLOR HERE: bg-teal-900 strictly for the mobile dropdown */}
        <div className="bg-teal-900 px-4 pt-2 pb-6 space-y-2 shadow-inner border-t border-teal-800">
          <Link href="/" onClick={closeMenu} className="block px-4 py-3 text-white hover:bg-teal-800 rounded-lg font-medium transition-colors">Home</Link>
          <Link href="/about" onClick={closeMenu} className="block px-4 py-3 text-white hover:bg-teal-800 rounded-lg font-medium transition-colors">About</Link>
          <Link href="/services" onClick={closeMenu} className="block px-4 py-3 text-white hover:bg-teal-800 rounded-lg font-medium transition-colors">Services</Link>
          <Link href="/blog" onClick={closeMenu} className="block px-4 py-3 text-white hover:bg-teal-800 rounded-lg font-medium transition-colors">Blog</Link>
          
          <div className="pt-4 pb-2">
            <Link href="/contact" onClick={closeMenu} className="block w-full text-center bg-white text-teal-900 px-4 py-3 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-md">
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}