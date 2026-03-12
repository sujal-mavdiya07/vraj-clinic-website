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
    default: "Vraj Homeopathic Clinic | Dr. Shruti Vanpariya | Keshod",
    template: "%s | Vraj Homeopathy", 
  },
  
  // 2. The Description (The short paragraph under the Google Search link)
  description: "Expert homeopathic care in Keshod, Junagadh by Dr. Shruti Vanpariya. Natural, holistic, and personalized treatments for chronic diseases and complete well-being.",
  
  // 3. Hyper-Local Keywords (Maximized for Keshod & Junagadh)
  keywords: [
    "Best homeopathic doctor in Keshod", 
    "Homeopathic clinic Keshod", 
    "Vraj Homeopathic Clinic Keshod", 
    "Dr. Shruti Vanpariya", 
    "Homeopathy Junagadh", 
    "Best homeopath in Junagadh district", 
    "Top homeopathy clinic near me Keshod", 
    "Natural medicine Keshod", 
    "Holistic healing Junagadh",
    "Chronic disease treatment homeopathy Keshod",
    "PCOS treatment homeopathy Keshod",
    "Skin disease homeopathy doctor Junagadh",
    "Pediatric homeopath Keshod",
    "Women's health homeopathy Keshod",
    "Hair fall treatment homeopathy Gujarat",
    "Allergy treatment homeopathy Saurashtra",
    "Classical homeopathy Junagadh",
    "Safe natural treatments Keshod",
    "Immunity booster homeopathy",
    "Keshod medical clinic homeopathy"
  ],
  
  // 4. Agency Credit for NexusNode
  authors: [{ name: "NexusNode" }],

  // ==========================================
  // GOOGLE VERIFICATION 
  // ==========================================
  verification: {
    google: "JHaN36YSXoqe9AATAe8fElsHr2vaXv1BU3sL0Dri5fU",
  },
  
  // 5. OpenGraph (What shows up when shared on WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "Vraj Homeopathic Clinic | Keshod & Junagadh",
    description: "Expert homeopathic care in Keshod, Junagadh. Natural, holistic, and personalized treatments.",
    url: "https://drshrutivanpariya.in", 
    siteName: "Vraj Homeopathy",
    images: [
      {
        url: "/clinic-view.jpg", 
        width: 1200,
        height: 630,
        alt: "Vraj Homeopathic Clinic in Keshod",
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