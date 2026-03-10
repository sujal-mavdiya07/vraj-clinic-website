import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. The Title (Shows up in the Google Search tab)
  title: {
    default: "Vraj Homeopathic Clinic | Dr. Shruti Vanpariya | Ahmedabad",
    template: "%s | Vraj Homeopathy", 
  },
  
  // 2. The Description (The short paragraph under the Google Search link)
  description: "Expert homeopathic care in Ahmedabad with Dr. Shruti Vanpariya. Natural, holistic, and personalized treatments for your complete well-being.",
  
  // 3. Keywords (What people are actually typing into Google)
  keywords: [
    "Homeopathic clinic Ahmedabad", 
    "Dr. Shruti Vanpariya", 
    "Best homeopath near me", 
    "Natural medicine Gujarat", 
    "Vraj Homeopathy", 
    "Chronic disease treatment", 
    "PCOS treatment homeopathy"
  ],
  
  // 4. Agency Credit for NexusNode
  authors: [{ name: "NexusNode" }],

  // ==========================================
  // ADD YOUR GOOGLE VERIFICATION HERE
  // ==========================================
  verification: {
    google: "JHaN36YSXoqe9AATAe8fElsHr2vaXv1BU3sL0Dri5fU",
  },
  
  // 5. OpenGraph (What shows up when shared on WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "Vraj Homeopathic Clinic | Ahmedabad",
    description: "Expert homeopathic care in Ahmedabad. Natural, holistic, and personalized treatments.",
    url: "https://drshrutivanpariya.in", // <-- I updated this to your live domain!
    siteName: "Vraj Homeopathy",
    images: [
      {
        url: "/clinic-view.jpg", 
        width: 1200,
        height: 630,
        alt: "Vraj Homeopathic Clinic",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <div className="flex-grow"> 
          {children}
        </div>
        <Footer /> 
      </body>
    </html>
  );
}