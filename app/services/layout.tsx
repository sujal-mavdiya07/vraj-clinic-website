import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Homeopathic Treatments & Services",
  description: "Explore our specialized homeopathic treatments for chronic diseases, women's health, pediatric care, skin conditions, and respiratory issues at Vraj Homeopathy in Ahmedabad.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}