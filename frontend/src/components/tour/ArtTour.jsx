import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { BRANCHES, LESSONS } from "../../data/content";
import { gsap, useGsap } from "../../lib/gsap";
import { scrollToId } from "../../hooks/useSmoothScroll";
import { Wobble } from "../art/Wobble";
import { LessonDialog } from "./LessonDialog";

const img = (url, w = 900) => url.replace(/w=\d+/, `w=${w}`).replace("q=85", "q=72");
const byBranch = (b) => LESSONS.filter((l) => l.branch === b);

/* ---------- shared bits ---------- */
const LessonList = ({ branch, onOpen, tone = "dark" }) => (
  <ul className="mt-7 flex flex-wrap gap-2.5">
    {byBranch(branch).map((l) => (
      <li key={l.id}>
        <button
          type="button"
          onClick={() => onOpen(l)}
          className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[15px] transition-colors ${
            tone === "dark"
              ? "border-paper/30 text-paper hover:border-paper hover:bg-paper hover:text-ink"
              : "border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper"
          }`}
          data-testid={`lesson-card-${l.id}`}
        >
          {l.name}
          <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </li>
    ))}
  </ul>
);

const PanelHead = ({ b, tone }) => (
  <>
    <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-paper/70" : "text-ink/60"}`}>
      <span className="font-display text-base italic tracking-normal">{b.no}</span>
      <span className="h-px w-10 bg-current" />
      {b.kicker}
    </p>
    <h3 className="t-big mt-4 font-display text-[clamp(4.2rem,11vw,10.5rem)] font-[380] italic leading-[0.86] tracking-[-0.04em]">
      <Wobble>{b.title}</Wobble>
    </h3>
    <p className="mt-5 font-display text-[clamp(1.25rem,1.8vw,1.6rem)] leading-snug">{b.lead}</p>
    <p className={`mt-3 max-w-md ${tone === "dark" ? "text-paper/75" : "text-ink-soft"}`}>{b.text}</p>
  </>
);

/* =========================== MÜZİK =========================== */
const MusicPanel = ({ onOpen }) => {
  const b = BRANCHES[0];
  const [p1, p2, p3] = byBranch("muzik");
  return (
    <article id="tur-muzik" className="tour-panel t-panel relative overflow-hidden bg-ultra-deep text-paper" aria-labelledby="tur-muzik-h">
      {/* staff lines */}
      <svg className="pointer-events-none absolute inset-x-0 top-[16%] h-[34%] w-full" viewBox="0 0 1400 200" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {[20, 60, 100, 140, 180].map((y) => (
          <path key={y} className="t-draw" d={`M0 ${y} C 400 ${y - 30} 900 ${y + 30} 1400 ${y}`} stroke="#5C76E0" strokeOpacity=".35" strokeWidth="2" />
        ))}
      </svg>
      {/* floating notes */}
      {[
        ["40%", "24%", "#E3A33A", 0],
        ["46%", "14%", "#EE7B5F", 1.2],
        ["58%", "34%", "#F2C878", 2.1],
        ["88%", "20%", "#E77DA8", 0.6],
      ].map(([l, t, c, d], i) => (
        <svg key={i} className="pointer-events-none absolute hidden w-10 animate-bob lg:block" style={{ left: l, top: t, animationDelay: `${d}s`, "--r": `${i % 2 ? 8 : -10}deg` }} viewBox="0 0 30 40" aria-hidden="true">
          <ellipse cx="10" cy="32" rx="9" ry="6.5" transform="rotate(-20 10 32)" fill={c} />
          <path d="M18 30 V4 q 10 5 11 15" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
        </svg>
      ))}

      <div className="wrap relative grid h-full items-center gap-10 pb-[22vh] pt-24 lg:grid-cols-12 lg:pb-[18vh] lg:pt-[calc(var(--nav-h)+8px)]">
        <div className="lg:col-span-5" id="tur-muzik-h">
          <PanelHead b={b} tone="dark" />
          <LessonList branch="muzik" onOpen={onOpen} />
        </div>
        <div className="relative h-[420px] sm:h-[480px] lg:col-span-7 lg:h-[62vh]">
          <figure className="group t-photo absolute right-[4%] top-0 h-[78%] w-[52%] overflow-hidden mask-arch border-[6px] border-paper/90 bg-ultra">
            <img src={img(p1.image)} alt="Piyano çalan bir çocuk" loading="lazy" className="h-full w-full object-cover transition-transform [transition-duration:1200ms] group-hover:scale-105" />
          </figure>
          <figure className="group t-photo absolute bottom-0 left-[4%] h-[46%] w-[40%] -rotate-3 overflow-hidden mask-oval border-[6px] border-paper/90 bg-ultra">
            <img src={img(p2.image, 600)} alt="Gitar çalan bir çocuk" loading="lazy" className="h-full w-full object-cover transition-transform [transition-duration:1200ms] group-hover:scale-105" />
          </figure>
          <figure className="group t-photo absolute bottom-[6%] right-0 h-[30%] w-[26%] rotate-6 overflow-hidden rounded-2xl border-[5px] border-paper/90 bg-ultra">
            <img src={img(p3.image, 500)} alt="Keman" loading="lazy" className="h-full w-full object-cover" />
          </figure>
          <span className="absolute left-[10%] top-[10%] -rotate-6 font-hand text-[2rem] text-ochre-light">do re mi ♪</span>
        </div>
      </div>

      {/* piano along the floor */}
      <svg className="t-piano absolute inset-x-0 bottom-0 h-[16vh] min-h-[90px] w-full" viewBox="0 0 1400 160" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <rect key={i} className="t-key" x={i * 50 + 1} y="0" width="48" height="170" rx="4" fill="#FBF7F1" />
        ))}
        {Array.from({ length: 28 }, (_, i) =>
          [0, 1, 3, 4, 5].includes(i % 7) ? <rect key={`b${i}`} x={i * 50 + 34} y="0" width="30" height="96" rx="3" fill="#16246B" /> : null
        )}
      </svg>
    </article>
  );
};

/* =========================== RESİM =========================== */
const PaintPanel = ({ onOpen }) => {
  const b = BRANCHES[1];
  const [p1, p2] = byBranch("resim");
  return (
    <article id="tur-resim" className="tour-panel t-panel relative overflow-hidden bg-paper text-ink" aria-labelledby="tur-resim-h">
      {/* background strokes */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <path className="t-draw rough-strong" d="M-40 760 C 260 640 420 860 700 740 S 1180 600 1460 700" stroke="#E3A33A" strokeWidth="90" strokeLinecap="round" opacity=".55" />
        <path className="t-draw rough-strong" d="M1330 -40 C 1400 160 1260 260 1420 460" stroke="#2A44B8" strokeWidth="36" strokeLinecap="round" opacity=".5" />
        <path className="t-draw rough" d="M120 120 C 200 60 300 160 380 90" stroke="#C93D78" strokeWidth="14" strokeLinecap="round" opacity=".6" />
      </svg>

      <div className="wrap relative grid h-full items-center gap-10 py-24 lg:grid-cols-12 lg:pt-[calc(var(--nav-h)+8px)]">
        {/* brush-revealed canvas */}
        <div className="relative order-2 lg:order-1 lg:col-span-7">
          <svg className="t-canvas w-full drop-shadow-[0_30px_40px_rgba(43,35,29,.25)]" viewBox="0 0 800 600" role="img" aria-label="Resim yapan çocuklar">
            <defs>
              <mask id="brushMask" maskUnits="userSpaceOnUse">
                <g fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="150" className="rough-strong">
                  <path className="t-mask" d="M40 90 C 260 40 520 140 770 70" />
                  <path className="t-mask" d="M760 230 C 520 190 280 290 30 230" />
                  <path className="t-mask" d="M40 380 C 280 330 520 430 770 370" />
                  <path className="t-mask" d="M770 520 C 520 480 280 570 30 520" />
                </g>
              </mask>
            </defs>
            <rect x="0" y="0" width="800" height="600" fill="#EEE2D2" />
            <image href={img(p1.image, 1100)} x="0" y="0" width="800" height="600" preserveAspectRatio="xMidYMid slice" mask="url(#brushMask)" />
          </svg>
          <figure className="t-photo absolute -bottom-10 -right-2 w-[38%] rotate-[5deg] bg-paper-light p-2.5 pb-9 shadow-xl sm:-right-6">
            <img src={img(p2.image, 500)} alt="Karakalem ve yağlıboya çalışması" loading="lazy" className="aspect-square w-full object-cover" />
            <figcaption className="absolute bottom-1.5 left-3 font-hand text-xl text-ink-soft">atölyeden ✎</figcaption>
          </figure>
          {/* paint palette */}
          <div className="absolute -left-3 -top-8 flex gap-2 rounded-[40px_60px_40px_70px] bg-paper-light p-3 shadow-lg sm:-left-6" aria-hidden="true">
            {["#D9472B", "#E3A33A", "#2A44B8", "#C93D78", "#5D8A6B"].map((c) => (
              <span key={c} className="t-swatch block h-6 w-6 rounded-full sm:h-7 sm:w-7" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5 lg:pl-6" id="tur-resim-h">
          <div className="text-cad">
            <PanelHead b={b} tone="light" />
          </div>
          <LessonList branch="resim" onOpen={onOpen} tone="light" />
        </div>
      </div>
    </article>
  );
};

/* =========================== FİNAL =========================== */
const COLLAGE = [
  { src: LESSONS[0].image, cls: "left-[2%] top-[8%] w-[22%] aspect-[3/4] -rotate-6", alt: "Piyano" },
  { src: LESSONS[5].image, cls: "left-[20%] top-[42%] w-[26%] aspect-[4/3] rotate-3", alt: "Resim atölyesi" },
  { src: LESSONS[2].image, cls: "left-[42%] top-[2%] w-[20%] aspect-[3/4] rotate-2", alt: "Keman" },
  { src: LESSONS[3].image, cls: "left-[56%] top-[44%] w-[22%] aspect-square -rotate-3", alt: "Bateri" },
  { src: LESSONS[6].image, cls: "right-[2%] top-[10%] w-[20%] aspect-[3/4] rotate-6", alt: "Yağlıboya ve karakalem" },
];

const FinalePanel = () => (
  <article className="tour-panel t-panel t-finale relative overflow-hidden bg-paper-deep text-ink" aria-label="Hepsi bir arada">
    <div className="wrap relative flex h-full flex-col justify-center py-24 lg:pt-[calc(var(--nav-h)+8px)]">
      <div className="relative mx-auto h-[300px] w-full max-w-5xl sm:h-[380px] lg:h-[44vh]">
        {COLLAGE.map((c, i) => (
          <figure key={i} className={`t-piece absolute overflow-hidden rounded-xl border-[5px] border-paper-light shadow-[0_24px_40px_-24px_rgba(43,35,29,.6)] ${c.cls}`}>
            <img src={img(c.src, 500)} alt={c.alt} loading="lazy" className="h-full w-full object-cover" />
          </figure>
        ))}
      </div>
      <div className="relative mx-auto mt-10 max-w-3xl text-center">
        <h3 className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] font-[380] leading-[1] tracking-[-0.02em]">
          Müzik ve resim — <em className="soft-italic text-cad">tek çatı altında.</em>
        </h3>
        <button
          type="button"
          onClick={() => scrollToId("iletisim")}
          className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-5 text-[15px] font-medium text-paper transition-colors hover:bg-cad"
        >
          Ücretsiz tanışma dersi
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </article>
);

/* =========================== TOUR =========================== */
export const ArtTour = () => {
  const root = useRef(null);
  const [lesson, setLesson] = useState(null);
  const onOpen = useCallback((l) => setLesson(l), []);
  const onClose = useCallback(() => setLesson(null), []);

  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add(
      {
        desk: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        mob: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        const track = q(".tour-track")[0];
        let containerAnimation;

        if (conditions.desk) {
          const dist = () => track.scrollWidth - window.innerWidth;
          containerAnimation = gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: q(".tour-pin")[0],
              pin: true,
              scrub: 0.8,
              end: () => `+=${dist()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          // progress rail
          gsap.fromTo(q(".tour-rail"), { scaleX: 0 }, {
            scaleX: 1, ease: "none",
            scrollTrigger: { trigger: q(".tour-pin")[0], start: "top top", end: () => `+=${dist()}`, scrub: true },
          });
        }

        // helper: a trigger that works both inside the horizontal track and in normal flow
        const stH = (el, extra = {}) =>
          containerAnimation
            ? { trigger: el, containerAnimation, start: "left 80%", end: "center 40%", ...extra }
            : { trigger: el, start: "top 80%", end: "bottom 40%", ...extra };

        q(".t-panel").forEach((panel, idx) => {
          const p = gsap.utils.selector(panel);
          // the first panel arrives vertically (before the track starts moving)
          const st = (el, extra = {}) =>
            idx === 0 && containerAnimation
              ? { trigger: panel, ...extra, containerAnimation: undefined, start: "top 75%", end: "top 10%" }
              : stH(el, extra);
          const draws = p(".t-draw");
          if (draws.length) gsap.fromTo(draws, { drawSVG: "0%" }, { drawSVG: "100%", stagger: 0.08, ease: "none", scrollTrigger: st(panel, { scrub: 0.8 }) });
          const trails = p(".t-trail");
          if (trails.length) gsap.fromTo(trails, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", stagger: 0.1, ease: "none", scrollTrigger: st(panel, { scrub: 0.8, end: "right 60%" }) });
          const photos = p(".t-photo");
          if (photos.length) gsap.from(photos, { clipPath: "inset(100% 0% 0% 0%)", y: 60, duration: 1.2, stagger: 0.12, ease: "expo.out", scrollTrigger: st(panel, { start: containerAnimation ? "left 55%" : "top 65%" }) });
          const big = p(".t-big");
          if (big.length && containerAnimation) gsap.fromTo(big, { xPercent: 18 }, { xPercent: -6, ease: "none", scrollTrigger: st(panel, { start: "left right", end: "right left", scrub: true }) });
          const masks = p(".t-mask");
          if (masks.length) gsap.fromTo(masks, { drawSVG: "0%" }, { drawSVG: "100%", stagger: 0.25, ease: "power1.inOut", scrollTrigger: st(panel, { scrub: 0.8, start: containerAnimation ? "left 85%" : "top 85%", end: containerAnimation ? "left 15%" : "center 45%" }) });
          const sw = p(".t-swatch");
          if (sw.length) gsap.from(sw, { scale: 0, duration: 0.5, stagger: 0.06, ease: "back.out(3)", scrollTrigger: st(panel, { start: containerAnimation ? "left 50%" : "top 60%" }) });
        });

        // piano keys ripple as the music studio passes by
        const keys = q(".t-key");
        if (keys.length) {
          const kt = gsap.timeline({ scrollTrigger: stH(q(".t-piano")[0], { scrub: 0.5, start: containerAnimation ? "left 90%" : "top bottom", end: containerAnimation ? "right 10%" : "bottom top" }) });
          keys.forEach((k, i) => {
            kt.to(k, { y: 10, fill: ["#E3A33A", "#EE7B5F", "#F2C878", "#E77DA8"][i % 4], duration: 0.3 }, i * 0.18)
              .to(k, { y: 0, fill: "#FBF7F1", duration: 0.5 }, i * 0.18 + 0.3);
          });
        }

        // finale: scattered photos fall into place
        const pieces = q(".t-piece");
        gsap.from(pieces, {
          x: (i) => [-260, -120, 0, 140, 280][i] * (containerAnimation ? 1 : 0.4),
          y: (i) => [-200, 220, -260, 240, -180][i],
          rotate: (i) => [-30, 24, -18, 30, -26][i],
          scale: 0.6,
          autoAlpha: 0,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: stH(q(".t-finale")[0], { scrub: 0.8, start: containerAnimation ? "left 95%" : "top 85%", end: containerAnimation ? "left 15%" : "center 55%" }),
        });
      }
    );
    return () => mm.revert();
  });

  const jump = (id) => {
    const el = document.getElementById(id);
    const pin = root.current?.querySelector(".tour-pin");
    if (!el || !pin) return;
    // inside the pinned horizontal track, convert the panel index into scroll distance
    const panels = Array.from(root.current.querySelectorAll(".t-panel"));
    const idx = panels.indexOf(el);
    const horizontal = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    if (horizontal && idx >= 0) {
      const start = pin.parentElement.classList.contains("pin-spacer")
        ? pin.parentElement.getBoundingClientRect().top + window.scrollY
        : pin.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: start + idx * window.innerWidth + 2, behavior: "smooth" });
    } else {
      scrollToId(id);
    }
  };

  return (
    <section id="dersler" ref={root} className="relative" data-testid="lessons-section">
      <div className="wrap pb-14 pt-24 lg:pt-32">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-cad" data-reveal>Sanat Dallarımız</p>
            <h2 className="mt-4 font-display display-lg font-[380] text-ink" data-split>
              İki atölye, <em className="soft-italic text-ultra">iki ayrı dünya.</em>
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-ink-soft" data-reveal>
              Silivri'deki atölyemizde çocuklar için müzik ve resim kursları. Kaydırdıkça gezin: müzik stüdyosundan
              resim atölyesine. Her dersin detayı için üzerine dokunun.
            </p>
            <div className="mt-5 flex flex-wrap gap-2" data-reveal data-testid="lesson-filters">
              {[
                ["tur-muzik", "Müzik", "bg-ultra"],
                ["tur-resim", "Resim", "bg-cad"],
              ].map(([id, label, bg]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => jump(id)}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink hover:border-ink"
                  data-testid={`lesson-filter-${id.replace("tur-", "")}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${bg}`} /> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tour-pin relative overflow-hidden">
        <div className="tour-track">
          <MusicPanel onOpen={onOpen} />
          <PaintPanel onOpen={onOpen} />
          <FinalePanel />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-1 bg-ink/10 lg:block" aria-hidden="true">
          <div className="tour-rail h-full origin-left bg-ochre" />
        </div>
      </div>

      <LessonDialog lesson={lesson} onClose={onClose} />
    </section>
  );
};
