import { useRef } from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { EVENTS, SCHOOL } from "../data/content";
import { gsap, useGsap } from "../lib/gsap";

const Tape = ({ className = "" }) => (
  <span className={`absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 bg-[#efe1c4]/80 shadow-sm ${className}`} aria-hidden="true" />
);

const Poster = ({ e, i }) => {
  const base =
    "e-poster group relative flex aspect-[3/4] flex-col justify-between overflow-hidden p-7 shadow-[0_30px_50px_-30px_rgba(43,35,29,.6)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0";
  if (e.color === "ultra")
    return (
      <article className={`${base} -rotate-2 bg-ultra text-paper`} data-testid={`event-${e.id}`}>
        <svg className="pointer-events-none absolute inset-x-0 top-[38%] w-full opacity-40" viewBox="0 0 300 100" fill="none" aria-hidden="true">
          {[10, 28, 46, 64, 82].map((y) => <path key={y} d={`M0 ${y} H300`} stroke="#F6EEE4" strokeWidth="1.2" />)}
          {[[60, 64], [110, 46], [160, 82], [210, 28], [250, 55]].map(([x, y]) => (
            <g key={x} className="transition-transform duration-500 group-hover:-translate-y-2">
              <ellipse cx={x} cy={y} rx="9" ry="6.5" transform={`rotate(-20 ${x} ${y})`} fill="#E3A33A" />
              <path d={`M${x + 8} ${y - 2} V ${y - 42}`} stroke="#E3A33A" strokeWidth="2.5" />
            </g>
          ))}
        </svg>
        <p className="eyebrow text-paper/70">{e.type}</p>
        <div>
          <h3 className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-[400] italic leading-[0.92]">{e.title}</h3>
          <p className="mt-4 max-w-[17rem] text-[15px] text-paper/80">{e.text}</p>
        </div>
      </article>
    );
  return (
      <article className={`${base} rotate-[1.5deg] bg-paper-light text-ink md:mt-16`} data-testid={`event-${e.id}`}>
        <Tape />
        <svg className="pointer-events-none absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]" viewBox="0 0 300 400" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path className="rough" d="M6 8 C 100 2 200 12 294 6 C 298 120 290 280 296 394 C 200 398 100 390 4 396 C 8 280 2 120 6 8Z" stroke="#D9472B" strokeWidth="5" />
        </svg>
        <p className="eyebrow relative text-cad">{e.type}</p>
        <div className="relative">
          <span className="mb-4 block h-16 w-16 rounded-full bg-ochre transition-transform duration-500 group-hover:scale-125" aria-hidden="true" />
          <h3 className="font-display text-[clamp(2.2rem,3.6vw,3.1rem)] font-[450] leading-[0.95]">{e.title}</h3>
          <p className="mt-4 max-w-[17rem] text-[15px] text-ink-soft">{e.text}</p>
        </div>
      </article>
  );
};

export const Events = () => {
  const root = useRef(null);
  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(q(".e-poster"), {
        y: 120, rotate: (i) => [-10, 8][i], autoAlpha: 0, duration: 1.2, stagger: 0.12, ease: "expo.out", clearProps: "transform",
        scrollTrigger: { trigger: q(".e-grid")[0], start: "top 80%" },
      });
    });
    return () => mm.revert();
  });

  return (
    <section id="etkinlikler" ref={root} className="relative overflow-hidden py-24 lg:py-36" data-testid="events-section">
      <div className="wrap">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cad" data-reveal>Atölyeden</p>
            <h2 className="mt-4 font-display display-lg font-[380] text-ink" data-split>
              Sahnede ve <em className="soft-italic text-cad">sergide.</em>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-ink-soft" data-reveal>
              Yıl boyunca çalışılan her şey bir gün sahneye çıkar. Güncel duyurular ve etkinlik tarihleri için bizi
              Instagram'da takip edin.
            </p>
            <a
              href={SCHOOL.instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-medium text-ink hover:border-cad hover:text-cad"
              data-reveal
            >
              <Instagram size={17} /> {SCHOOL.instagram}
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        <div className="e-grid mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-2 md:gap-14 lg:mt-20">
          {EVENTS.map((e, i) => (
            <Poster key={e.id} e={e} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
