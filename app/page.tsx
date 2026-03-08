import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Services />
      <AboutSection />
    </main>
  );
}