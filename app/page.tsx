import CTA from "@/components/CTA";
import Expertise from "@/components/Expertise";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Samenwerking from "@/components/Samenwerking";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-white">
      <Navbar />

      <main>
        <Hero />
        <Expertise />
        <Process />
        <Samenwerking />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}