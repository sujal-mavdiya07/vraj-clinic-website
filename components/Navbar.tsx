"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to close menu when a link is clicked on mobile
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-teal-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" onClick={closeMenu} className="flex-shrink-0 flex items-center gap-4 group">
              
              {/* THE CIRCULAR, MASKED LOGO IMAGE */}
              <div className="relative flex-shrink-0">
                <img 
                  src="/logo.png" 
                  alt="Vraj Homeopathy Logo" 
                  className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300 group-hover:border-teal-100" 
                />
              </div>
              
              {/* THE TEXT */}
              <span className="font-extrabold text-2xl text-white tracking-tight group-hover:scale-105 transition-transform duration-300 hidden sm:block">
                Vraj <span className="text-teal-400">Homeopathy</span>
              </span>
              
            </Link>
          </div>

          {/* Desktop Navigation Links (Hidden on phones) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="relative group text-teal-50 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Home
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/about" className="relative group text-teal-50 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              About Doctor
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/services" className="relative group text-teal-50 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Treatments
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/blog" className="relative group text-teal-50 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
              Blog
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link href="/contact" className="ml-4 bg-teal-400 text-teal-950 px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_20px_rgba(45,212,191,0.5)] hover:-translate-y-1 hover:bg-teal-300 transition-all duration-300">
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburger Button (Hidden on Desktop) */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-50 hover:text-white hover:bg-teal-800 focus:outline-none transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon changes based on whether menu is open or closed */}
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-teal-800 border-t border-teal-700 shadow-xl">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col">
            <Link href="/" onClick={closeMenu} className="text-teal-50 hover:bg-teal-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" onClick={closeMenu} className="text-teal-50 hover:bg-teal-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors">
              About Doctor
            </Link>
            <Link href="/services" onClick={closeMenu} className="text-teal-50 hover:bg-teal-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors">
              Treatments
            </Link>
            <Link href="/blog" onClick={closeMenu} className="text-teal-50 hover:bg-teal-700 hover:text-white block px-3 py-3 rounded-md text-base font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" onClick={closeMenu} className="mt-4 bg-teal-400 text-teal-950 text-center block px-3 py-3 rounded-md text-base font-bold shadow-md hover:bg-teal-300 transition-colors">
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}