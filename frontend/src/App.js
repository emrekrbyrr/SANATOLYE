import "@/App.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Lessons } from "@/components/Lessons";
import { WhyUs } from "@/components/WhyUs";
import { Gallery } from "@/components/Gallery";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

function App() {
  useSmoothScroll();
  return (
    <div className="App" data-testid="app-root">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Lessons />
        <WhyUs />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
