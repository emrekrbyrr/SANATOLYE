import "@/App.css";
import { useEffect, useRef } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { ArtTour } from "@/components/tour/ArtTour";
import { WhyUs } from "@/components/WhyUs";
import { AppShowcase } from "@/components/AppShowcase";
import { Events } from "@/components/Events";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SvgDefs } from "@/components/art/SvgDefs";
import { PaintCursor } from "@/components/art/PaintCursor";
import { CoursePage } from "@/components/course/CoursePage";
import { courseBySlug } from "@/data/courses";
import { scrollToId } from "@/hooks/useSmoothScroll";
import { gsap, ScrollTrigger, SplitText, useGsap } from "@/lib/gsap";

// Tiny path router: "/silivri-piyano-kursu" → course page, anything else → home.
const currentCourse = () =>
  typeof window === "undefined" ? null : courseBySlug(window.location.pathname.replace(/^\/+|\/+$/g, ""));

/** Page-wide scroll reveals for simple [data-reveal] blocks and [data-split] headings. */
const useGlobalReveals = (ref) =>
  useGsap(ref, () => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      const splits = gsap.utils.toArray("[data-split]").map((el) =>
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.1,
              stagger: 0.09,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 85%" },
            }),
        })
      );
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      return () => splits.forEach((s) => s.revert());
    });

    // fonts change line lengths → recompute pinned sections once they are in
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  });

function App() {
  const ref = useRef(null);
  const course = currentCourse();
  useGlobalReveals(ref);

  // Arriving at "/#galeri" from a course page: jump to that section once the page is laid out.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (course || !id) return undefined;
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToId(id);
    }, 350);
    return () => clearTimeout(t);
  }, [course]);

  return (
    <div ref={ref} className="App paper-grain" data-testid="app-root">
      <SvgDefs />
      <a href={course ? "#main" : "#hakkimizda"} className="sr-only z-[100] rounded bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main">
        {course ? (
          <CoursePage course={course} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <About />
            <ArtTour />
            <WhyUs />
            <AppShowcase />
            <Events />
            <Gallery />
            <Testimonials />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
      <PaintCursor />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
