import { useRef } from "react";
import { CHAPTERS, SCHOOL } from "../data/content";
import { gsap, SplitText, useGsap } from "../lib/gsap";

const MANIFESTO =
  "SANATÖLYE'de çocuklar önce sanatı sever, sonra öğrenir. Müzik ve resim; dört ilkemizle her çocuğun kendi rengini bulmasına eşlik ediyoruz.";

/* chapter doodles — one hand-drawn mark per principle */
const DOODLES = [
  "M10 40 C 20 10 50 10 52 34 C 54 56 24 60 22 40 C 20 26 40 22 42 36", // spiral: keşfet
  "M6 50 C 18 30 30 58 42 34 S 60 20 66 30", // brush: üret
  "M8 44 L 24 20 L 40 40 L 56 14", // zigzag sparkle: paylaş
  "M36 60 V 26 M36 34 C 20 30 14 18 16 8 C 30 10 36 20 36 30 C 38 18 46 10 58 10 C 58 22 50 32 36 34", // sprout: büyü
];

export const About = () => {
  const root = useRef(null);

  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", lg: "(min-width: 1024px)" },
      (ctx) => {
        if (!ctx.conditions.motion) return;
        // words ink in as you read
        const split = SplitText.create(q(".m-text")[0], { type: "words", wordsClass: "m-w" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: q(".m-text")[0], start: "top 78%", end: "bottom 45%", scrub: 0.6 },
          }
        );
        gsap.fromTo(q(".m-swash"), { drawSVG: "0%" }, {
          drawSVG: "100%", ease: "none",
          scrollTrigger: { trigger: q(".m-text")[0], start: "top 70%", end: "bottom 50%", scrub: 0.6 },
        });

        // the path between the four principles draws itself
        gsap.fromTo(q(".c-path"), { drawSVG: "0%" }, {
          drawSVG: "100%", ease: "none",
          scrollTrigger: { trigger: q(".c-wrap")[0], start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
        q(".c-item").forEach((el) => {
          gsap.from(el, {
            y: 60, autoAlpha: 0, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
          gsap.fromTo(el.querySelector(".c-doodle"), { drawSVG: "0%" }, {
            drawSVG: "100%", duration: 1.2, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });
        return () => split.revert();
      }
    );
    return () => mm.revert();
  });

  return (
    <section id="hakkimizda" ref={root} className="relative pb-24 pt-28 lg:pb-36 lg:pt-40" data-testid="about-section">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-cad" data-reveal>Hakkımızda</p>
            <p className="mt-5 max-w-[16rem] font-hand text-[1.7rem] leading-tight text-ink-soft" data-reveal>
              “{SCHOOL.motto}.”
            </p>
          </div>
          <div className="relative lg:col-span-9">
            <p className="m-text font-display text-[clamp(1.75rem,3.6vw,3.3rem)] font-[360] leading-[1.14] tracking-[-0.015em] text-ink">
              {MANIFESTO}
            </p>
            <svg className="pointer-events-none absolute -bottom-8 right-0 w-[min(420px,70%)]" viewBox="0 0 420 40" fill="none" aria-hidden="true">
              <path className="m-swash rough" d="M4 26 C 120 6 260 40 416 14" stroke="#D9472B" strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h2 className="sr-only">Dört ilkemiz</h2>
        <div className="c-wrap relative mt-24 lg:mt-36">
          {/* winding path (desktop) */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1200 520" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <path
              className="c-path"
              d="M40 120 C 200 40 260 300 380 300 S 560 80 700 140 S 860 420 1000 360 S 1160 180 1190 220"
              stroke="#2B231D"
              strokeOpacity=".35"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
          </svg>
          {/* vertical thread (mobile) */}
          <span className="absolute bottom-6 left-[22px] top-6 w-px border-l-2 border-dotted border-ink/25 lg:hidden" aria-hidden="true" />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {CHAPTERS.map((c, i) => (
              <li
                key={c.no}
                className={`c-item relative pl-16 lg:pl-0 ${["lg:mt-0", "lg:mt-44", "lg:mt-10", "lg:mt-52"][i]}`}
                data-testid={`about-chapter-${c.no}`}
              >
                <span
                  className="absolute left-0 top-1 grid h-11 w-11 place-items-center rounded-full font-sans text-sm font-medium text-paper lg:static lg:mb-6"
                  style={{ background: c.color }}
                >
                  {c.no}
                </span>
                <div className="flex items-end gap-3">
                  <h3 className="font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-[420] italic leading-none" style={{ color: c.color }}>
                    {c.title}
                  </h3>
                  <svg className="mb-1 h-12 w-14 shrink-0" viewBox="0 0 70 70" fill="none" aria-hidden="true">
                    <path className="c-doodle" d={DOODLES[i]} stroke={c.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-4 max-w-[19rem] text-[17px] leading-relaxed text-ink-soft">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
