import { useRef } from "react";
import { GraduationCap, Users, Sparkles, Building2, CalendarClock, Gift } from "lucide-react";
import { FEATURES, LESSONS } from "../data/content";
import { gsap, useGsap } from "../lib/gsap";

const ICONS = { GraduationCap, Users, Sparkles, Building2, CalendarClock, Gift };
const COLORS = ["#E3A33A", "#D9472B", "#C93D78", "#2A44B8", "#5D8A6B", "#D9472B"];

export const WhyUs = () => {
  const root = useRef(null);

  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      q(".f-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".f-in"), {
          y: 40, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
      gsap.fromTo(q(".w-photo"), { clipPath: "inset(0% 0% 100% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut",
        scrollTrigger: { trigger: q(".w-photo")[0], start: "top 80%" },
      });
    });
    return () => mm.revert();
  });

  return (
    <section id="neden" ref={root} className="relative bg-paper-light py-24 lg:py-36" data-testid="whyus-section">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-cad" data-reveal>Eğitim Yaklaşımımız</p>
            <h2 className="mt-4 font-display display-lg font-[380] text-ink" data-split>
              Neden <em className="soft-italic text-cad">SANATÖLYE?</em>
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink-soft" data-reveal>
              Çocuğunuzun sanatla tanışacağı sıcak, güvenli ve ilham veren bir yuva. Sanatı bir yük değil, bir keşif
              olarak öğretiyoruz.
            </p>
            <div className="relative mt-10 hidden max-w-md lg:block">
              <div className="w-photo mask-brush aspect-[5/4] overflow-hidden">
                <img
                  src={LESSONS[1].image.replace("w=1200", "w=800")}
                  alt="Gitar dersinde bir öğrenci"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="absolute -bottom-6 right-4 rotate-[-4deg] font-hand text-2xl text-ink-soft">
                her çocuğa kendi temposunda
              </p>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            const c = COLORS[i];
            return (
              <li
                key={f.title}
                className="f-row group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-ink/15 py-8 last:border-b sm:grid-cols-[4.5rem_1fr_auto] sm:gap-x-8 sm:py-10"
                data-testid={`feature-card-${i}`}
              >
                <span className="f-in font-display text-[2.6rem] italic leading-none text-ink/25 transition-colors duration-500 group-hover:text-[var(--c)]" style={{ "--c": c }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="f-in">
                  <h3 className="relative inline-block font-display text-[1.7rem] font-[420] leading-tight text-ink sm:text-[2rem]">
                    {f.title}
                    <svg className="absolute -bottom-1 left-0 h-2.5 w-full" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 6 C 50 1 150 9 198 3" fill="none" stroke={c} strokeWidth="5" strokeLinecap="round" pathLength="1" strokeDasharray="1" className="transition-[stroke-dashoffset] duration-700 [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0]" />
                    </svg>
                  </h3>
                  <p className="mt-2 max-w-lg text-ink-soft">{f.text}</p>
                </div>
                <span
                  className="f-in relative col-start-2 hidden h-14 w-14 place-items-center rounded-full border border-ink/15 text-ink/60 transition-all duration-500 group-hover:rotate-[-12deg] group-hover:border-transparent group-hover:text-paper sm:col-start-3 sm:row-start-1 sm:grid"
                  style={{ "--c": c }}
                >
                  <span className="absolute h-14 w-14 scale-0 rounded-full bg-[var(--c)] transition-transform duration-500 group-hover:scale-100" />
                  <Icon size={22} strokeWidth={1.6} className="relative" />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
