import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Book Appointment",
  description: "Get in touch with Dr. Shruti Vanpariya to schedule your homeopathic consultation. Visit our clinic in Ahmedabad or book your appointment online today.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}