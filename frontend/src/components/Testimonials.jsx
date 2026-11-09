import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "../data/content";
import { prefersReducedMotion } from "../lib/gsap";

const COLORS = ["#D9472B", "#2A44B8", "#C93D78"];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    const id = setTimeout(() => setI((n) => (n + 1) % TESTIMONIALS.length), 7000);
    return () => clearTimeout(id);
  }, [i, paused]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 lg:py-36"
      aria-roledescription="carousel"
      aria-label="Veli yorumları"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      data-testid="testimonials-section"
    >
      <span className="pointer-events-none absolute -left-6 top-6 select-none font-display text-[22rem] italic leading-none text-ink/[0.05] sm:text-[30rem]" aria-hidden="true">
        “
      </span>
      <div className="wrap relative grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <p className="eyebrow text-cad" data-reveal>Veliler Ne Diyor?</p>
          <div className="mt-8 flex gap-3 lg:flex-col" role="tablist" aria-label="Yorum seç">
            {TESTIMONIALS.map((x, n) => (
              <button
                key={x.author}
                type="button"
                role="tab"
                aria-selected={n === i}
                onClick={() => setI(n)}
                className={`flex items-center gap-3 rounded-full py-1 pr-3 text-left text-sm transition-colors ${n === i ? "text-ink" : "text-ink/40 hover:text-ink/70"}`}
                data-testid={`testimonial-${n}`}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full font-display text-lg text-paper transition-transform" style={{ background: n === i ? COLORS[n % 3] : "#CDBBA4", transform: n === i ? "scale(1.08)" : "none" }}>
                  {x.author.charAt(0)}
                </span>
                <span className="hidden sm:inline">{x.role}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-[300px] lg:col-span-9" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-[clamp(1.7rem,3.4vw,3rem)] font-[360] leading-[1.18] tracking-[-0.01em] text-ink">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <svg width="48" height="12" viewBox="0 0 48 12" aria-hidden="true">
                  <path d="M2 7 C 14 2 30 10 46 4" fill="none" stroke={COLORS[i % 3]} strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <span>
                  <span className="block font-medium text-ink">{t.author}</span>
                  <span className="text-sm text-ink-mute">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
