import { useRef, useState } from "react";
import { ArrowRight, ArrowDown, RotateCcw } from "lucide-react";
import { gsap, SplitText, ScrollTrigger, useGsap, prefersReducedMotion } from "../../lib/gsap";
import { scrollToId } from "../../hooks/useSmoothScroll";
import { IntroStage, P } from "./IntroStage";
import { Logo } from "../art/Logo";

const SEEN_KEY = "sanatolye-intro-seen";

const readSeen = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};
const writeSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode — fine */
  }
};

const setIntroFlag = (v) => {
  document.documentElement.dataset.intro = v;
};

export const Hero = () => {
  const root = useRef(null);
  const [run, setRun] = useState(0); // bump to replay the film
  const forceFilm = useRef(false);
  // Decide once per mount (StrictMode runs effects twice in dev; the decision must not flip)
  const decision = useRef(null);
  if (decision.current === null) decision.current = !readSeen();

  useGsap(
    root,
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();
      const playFilm = !reduced && (forceFilm.current || decision.current);

      /* ---------------- final hero reveal ---------------- */
      const split = SplitText.create(q(".h-title")[0], {
        type: "words",
        ignore: ".no-split",
        wordsClass: "h-word",
      });

      const reveal = gsap.timeline({ paused: true });
      reveal
        .fromTo(q(".h-in"), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0)
        .fromTo(
          split.words,
          { yPercent: 70, rotate: 4, autoAlpha: 0 },
          { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1, stagger: 0.045, ease: "expo.out" },
          0.1
        )
        .fromTo(q(".h-underline"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, ease: "power2.inOut" }, 0.75)
        .fromTo(
          q(".h-photo"),
          { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.3, stagger: 0.14, ease: "expo.inOut" },
          0.05
        )
        .fromTo(q(".h-draw"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0.3)
        .fromTo(
          q(".h-pop"),
          { scale: 0, transformOrigin: "50% 50%" },
          { scale: 1, duration: 0.7, stagger: 0.06, ease: "back.out(2)" },
          0.6
        )
        .fromTo(q(".h-note"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1);

      let stopFilm = () => {};
      const showStage = (v) => gsap.set(q(".intro"), { display: v ? "flex" : "none" });

      if (reduced) {
        showStage(false);
        reveal.progress(1);
        setIntroFlag("done");
      } else if (!playFilm) {
        showStage(false);
        setIntroFlag("done");
        reveal.play(0);
      } else {
        writeSeen();
        setIntroFlag("playing");
        showStage(true);
        window.scrollTo(0, 0);
        stopFilm = buildFilm(q, reveal, showStage);
      }

      /* ---------------- parallax while leaving the hero ---------------- */
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(q(".h-par-a"), { yPercent: -14, ease: "none", scrollTrigger: st });
        gsap.to(q(".h-par-b"), { yPercent: 22, rotate: -6, ease: "none", scrollTrigger: st });
        gsap.to(q(".h-par-c"), { yPercent: -30, ease: "none", scrollTrigger: st });
        gsap.to(q(".h-copy"), { yPercent: 10, autoAlpha: 0.3, ease: "none", scrollTrigger: st });
      });

      return () => {
        stopFilm();
        mm.revert();
        setIntroFlag("done");
      };
    },
    [run]
  );

  const replay = () => {
    forceFilm.current = true;
    decision.current = true;
    window.scrollTo(0, 0);
    setRun((r) => r + 1);
  };

  return (
    <section
      id="anasayfa"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-[calc(var(--nav-h)+28px)] lg:pb-10"
      data-testid="hero-section"
    >
      {/* ---------------- decorative paint layer ---------------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="h-par-c absolute -right-28 top-[6%] hidden w-[440px] lg:block" viewBox="-80 -80 160 160">
          <path className="h-pop rough" d={P.blob[0]} transform="scale(1.25)" fill="#E3A33A" opacity=".9" />
          <circle className="h-pop" cx="62" cy="40" r="6" fill="#E3A33A" />
        </svg>
        <svg className="absolute -bottom-6 left-0 hidden w-[56vw] max-w-[820px] md:block" viewBox="0 0 760 180" fill="none">
          {[40, 62, 84, 106, 128].map((y) => (
            <path key={y} className="h-draw" d={`M0 ${y} C 240 ${y - 16} 480 ${y + 16} 760 ${y - 6}`} stroke="#2A44B8" strokeOpacity=".22" strokeWidth="2" />
          ))}
          {[
            [430, 106, "#2A44B8"],
            [520, 74, "#D9472B"],
            [610, 96, "#2A44B8"],
            [700, 62, "#C93D78"],
          ].map(([x, y, c]) => (
            <g key={x} className="h-pop" opacity=".75">
              <ellipse cx={x} cy={y} rx="11" ry="8" transform={`rotate(-20 ${x} ${y})`} fill={c} />
              <path d={`M${x + 10} ${y - 3} V ${y - 58}`} stroke={c} strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      </div>

      {/* ---------------- content ---------------- */}
      <div className="wrap relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="h-copy lg:col-span-7">
          <p className="h-in eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink/70">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-ultra" />
              <span className="h-2 w-2 rounded-full bg-cad" />
            </span>
            Müzik · Resim — Silivri
          </p>

          <h1 className="h-title font-display text-[clamp(2.55rem,5.6vw,5.5rem)] font-[380] leading-[0.98] tracking-[-0.025em] text-ink">
            Her çocuğun içinde keşfedilmeyi bekleyen bir{" "}
            <em className="soft-italic relative inline-block whitespace-nowrap text-cad">
              sanatçı
              <svg className="no-split absolute -bottom-[0.14em] left-0 h-[0.3em] w-full overflow-visible" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                <path className="h-underline rough" d="M4 20 C 70 6 160 4 296 14" fill="none" stroke="#E3A33A" strokeWidth="9" strokeLinecap="round" />
              </svg>
            </em>{" "}
            var.
          </h1>

          <p className="h-in mt-7 max-w-xl text-lg text-ink-soft sm:text-xl">
            Müzik ve resimle hayal gücünü keşfet.
          </p>

          <div className="h-in mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToId("iletisim")}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-5 text-[15px] font-medium text-paper shadow-[0_14px_30px_-12px_rgba(43,35,29,.6)] transition-colors hover:bg-cad"
              data-testid="hero-cta-contact"
            >
              Ücretsiz Tanışma Dersine Katıl
              <span className="grid h-8 w-8 place-items-center rounded-full bg-paper/15 transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} />
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollToId("dersler")}
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-[15px] font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5"
              data-testid="hero-cta-lessons"
            >
              Sanat Dallarımızı Keşfet
            </button>
          </div>
          <p className="h-in mt-5 flex items-center gap-2 font-hand text-2xl text-cad-deep" aria-hidden="true">
            <svg width="38" height="22" viewBox="0 0 38 22" fill="none">
              <path d="M36 4 C 26 18 12 18 3 8 M3 8 l1 9 M3 8 l9 -1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Ücretsiz Deneme Dersi
          </p>
        </div>

        {/* collage */}
        <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5" data-testid="hero-image">
          <svg className="pointer-events-none absolute -left-10 top-[44%] z-0 w-[120%]" viewBox="0 0 600 500" fill="none" aria-hidden="true">
            <path className="h-draw rough" d="M40 380 C 160 250 300 420 420 260 S 560 120 590 160" stroke="#D9472B" strokeWidth="34" strokeLinecap="round" opacity=".9" />
          </svg>

          <div className="h-par-a relative z-10 ml-auto w-[82%]">
            <div className="h-photo mask-blob aspect-[4/5] overflow-hidden bg-paper-deep">
              <img
                src="/images/hero-drummer.jpg"
                alt="Bateri çalan bir çocuk"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            </div>
            <span className="h-note absolute -left-4 top-6 rotate-[-8deg] font-hand text-3xl text-ultra">müzik ♪</span>
          </div>

          <div className="h-par-b absolute -left-2 bottom-[-4%] z-20 w-[44%] sm:left-0">
            <div className="h-photo mask-oval aspect-square overflow-hidden border-[6px] border-paper bg-paper-deep shadow-[0_20px_40px_-20px_rgba(43,35,29,.5)]">
              <img
                src="https://images.unsplash.com/photo-1536221993589-9edbbca2c7fc?auto=format&fit=crop&w=500&q=70"
                alt="Resim yapan çocuklar"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <span className="h-note absolute -left-2 top-[38%] rotate-[-8deg] sm:-left-12 font-hand text-3xl text-cad">resim</span>
          </div>

          <div className="h-par-c absolute -top-8 left-[8%] z-20 w-[30%]">
            <div className="h-photo mask-arch aspect-[3/4] overflow-hidden border-[5px] border-paper bg-paper-deep shadow-[0_20px_40px_-20px_rgba(43,35,29,.5)]">
              <img
                src="https://images.pexels.com/photos/7025567/pexels-photo-7025567.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Atölyede resim yapan çocuklar"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <span className="h-note absolute -left-4 top-[20%] -rotate-12 sm:-left-12 font-hand text-3xl text-ochre-deep">tuval</span>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-4 z-10 hidden items-end justify-between sm:flex">
        <button
          type="button"
          onClick={() => scrollToId("hakkimizda")}
          className="h-in pointer-events-auto flex items-center gap-3 text-sm text-ink/60 hover:text-ink"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-ink/20">
            <ArrowDown size={16} className="animate-floaty" />
          </span>
          Keşfetmeye başla
        </button>
        {!prefersReducedMotion() && (
          <button
            type="button"
            onClick={replay}
            className="h-in pointer-events-auto flex items-center gap-2 text-sm text-ink/50 hover:text-ink"
            data-testid="hero-replay"
          >
            <RotateCcw size={14} /> Açılışı tekrar izle
          </button>
        )}
      </div>

      {/* ---------------- the opening film ---------------- */}
      <div
        className="intro fixed inset-0 z-[80] hidden items-center justify-center bg-paper"
        role="presentation"
        data-testid="hero-intro"
      >
        <IntroStage />
        <div className="s-wordmark pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <span className="s-mark block font-mark text-[clamp(1.9rem,7.6vmin,6.4rem)] font-medium tracking-[0.12em] text-ink">
              SANATÖLYE
            </span>
            <span className="s-sub mt-3 flex items-center justify-center gap-3 font-sans text-[clamp(.6rem,1.7vmin,1rem)] uppercase tracking-[0.42em] text-ink/70">
              <span className="h-px w-8 bg-current" /> Sanat Akademisi <span className="h-px w-8 bg-current" />
            </span>
          </div>
        </div>
        <button
          type="button"
          className="s-skip absolute bottom-6 right-6 flex items-center gap-3 rounded-full border border-ink/20 bg-paper/80 py-2.5 pl-5 pr-3 text-sm font-medium text-ink backdrop-blur hover:border-ink"
          data-testid="hero-skip"
        >
          Geç
          <span className="relative h-1 w-14 overflow-hidden rounded-full bg-ink/10">
            <span className="s-progress absolute inset-y-0 left-0 w-full origin-left scale-x-0 rounded-full bg-cad" />
          </span>
        </button>
        <span className="sr-only">Açılış animasyonu oynatılıyor. Geç düğmesiyle atlayabilirsiniz.</span>
      </div>
    </section>
  );
};

/* =========================================================================
   The opening film — five scenes on one GSAP timeline
   ========================================================================= */
function buildFilm(q, reveal, showStage) {
  const sel = (s) => q(s);
  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } }).timeScale(1.2);

  // initial state
  gsap.set(sel(".s-sweep path, .s-paint path, .s-paint circle:not(.s-petal), .s-staff, .s-clef, .s-wave, .s-enso, .s-drip"), { drawSVG: "0%" });
  gsap.set(sel(".s-dot"), { scale: 0, transformOrigin: "50% 50%" });
  gsap.set(sel(".s-blob, .s-petal, .s-note"), { scale: 0, transformOrigin: "50% 50%" });
  gsap.set(sel(".s-cap"), { autoAlpha: 0, y: 20 });
  gsap.set(sel(".s-hill"), { drawSVG: "0%" });
  gsap.set(sel(".s-piano"), { y: 420, autoAlpha: 0 });
  gsap.set(sel(".s-mark, .s-sub"), { autoAlpha: 0 });
  gsap.set(sel(".s-svg"), { scale: 1, autoAlpha: 1 });

  const markSplit = SplitText.create(sel(".s-mark")[0], { type: "chars" });

  /* Scene 1 — boş tuval */
  tl.addLabel("s1", 0.3)
    .to(sel(".s-dot"), { scale: 1, duration: 0.45, ease: "back.out(3)" }, "s1")
    .to(sel(".s-dot"), { scale: 0, duration: 0.25, ease: "power2.in" }, "s1+=0.55")
    .to(sel(".s-sweep path"), { drawSVG: "100%", duration: 0.8, stagger: 0.04, ease: "power3.inOut" }, "s1+=0.55")
    .to(sel(".s-blob"), { scale: 1, duration: 0.55, stagger: 0.08, ease: "back.out(2.2)" }, "s1+=1.05")
    .to(sel(".s-drip"), { drawSVG: "100%", duration: 0.8, stagger: 0.08, ease: "power1.in" }, "s1+=1.35");

  /* Scene 2 — resim */
  tl.addLabel("s2", "s1+=1.5")
    .to(sel(".s-sweep"), { autoAlpha: 0.18, duration: 0.6 }, "s2")
    .to(sel(".s-blob"), { scale: 0.55, duration: 0.6 }, "s2")
    .to(sel(".s-hill"), { drawSVG: "100%", duration: 0.8, stagger: 0.12 }, "s2")
    .to(sel(".s-sun, .s-spiral"), { drawSVG: "100%", duration: 0.7, stagger: 0.1 }, "s2+=0.15")
    .to(sel(".s-rays path"), { drawSVG: "100%", duration: 0.2, stagger: 0.04 }, "s2+=0.5")
    .to(sel(".s-rays"), { rotate: 30, svgOrigin: "770 232", duration: 2.2, ease: "none" }, "s2+=0.5")
    .to(sel(".s-flower path"), { drawSVG: "100%", duration: 0.4 }, "s2+=0.35")
    .to(sel(".s-petal"), { scale: 1, duration: 0.35, stagger: 0.05, ease: "back.out(3)" }, "s2+=0.6")
    .to(sel(".s-kid path, .s-kid circle"), { drawSVG: "100%", duration: 0.3, stagger: 0.07 }, "s2+=0.5")
    .to(sel(".s-bird"), { drawSVG: "100%", duration: 0.4 }, "s2+=0.8")
    .to(sel(".s-cap-resim"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, "s2+=0.4");

  /* Scene 3 — müzik: the hills straighten into a staff */
  tl.addLabel("s3", "s2+=1.6")
    .to(sel(".s-cap-resim, .s-kid, .s-flower, .s-bird, .s-rays, .s-spiral"), { autoAlpha: 0, y: -16, duration: 0.45, stagger: 0.03 }, "s3")
    .to(sel(".s-sun"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.in(2)" }, "s3")
    .to(sel(".s-blobs"), { autoAlpha: 0.25, duration: 0.5 }, "s3")
    .to(sel(".s-sweep"), { autoAlpha: 0, duration: 0.5 }, "s3")
    .to(sel(".s-hill1"), { morphSVG: P.staff(440), stroke: "#2A44B8", strokeWidth: 5, duration: 0.8 }, "s3+=0.1")
    .to(sel(".s-hill2"), { morphSVG: P.staff(470), stroke: "#2A44B8", strokeWidth: 5, duration: 0.8 }, "s3+=0.15")
    .to(sel(".s-staff-0, .s-staff-1, .s-staff-4"), { drawSVG: "100%", duration: 0.7, stagger: 0.08 }, "s3+=0.35")
    .set(sel(".s-staff-2, .s-staff-3"), { drawSVG: "100%" }, "s3+=0.95")
    .set(sel(".s-hill"), { autoAlpha: 0 }, "s3+=0.95")
    .to(sel(".s-clef"), { drawSVG: "100%", duration: 0.7 }, "s3+=0.5")
    .to(sel(".s-piano"), { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" }, "s3+=0.45");

  const keys = sel(".s-key");
  const notes = sel(".s-note");
  const palette = ["#2A44B8", "#D9472B", "#E3A33A", "#C93D78"];
  notes.forEach((n, i) => {
    const t = `s3+=${0.95 + i * 0.16}`;
    const k = keys[(i * 2 + 1) % keys.length];
    tl.to(n, { scale: 1, duration: 0.35, ease: "back.out(3)" }, t)
      .to(k, { y: 8, fill: palette[i % 4], duration: 0.12, ease: "power1.out" }, t)
      .to(k, { y: 0, fill: "#FBF7F1", duration: 0.35, ease: "power1.inOut" }, `${t}+=0.18`);
  });
  tl.to(sel(".s-wave"), { drawSVG: "100%", duration: 0.9, ease: "none" }, "s3+=0.9")
    .to(sel(".s-cap-muzik"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, "s3+=0.8")
    .to(notes, { y: (i) => -40 - (i % 3) * 24, x: (i) => (i % 2 ? 12 : -10), duration: 1.4, ease: "sine.inOut" }, "s3+=1.6");

  /* Scene 4 — SANATÖLYE: music and painting become one; the staff lines wrap the logo */
  tl.addLabel("s5", "s3+=2.2")
    .to(sel(".s-piano"), { y: 420, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, "s5")
    .to(sel(".s-clef, .s-wave, .s-cap-muzik"), { autoAlpha: 0, duration: 0.4 }, "s5")
    .to(notes, { y: "-=260", autoAlpha: 0, duration: 0.9, stagger: 0.05, ease: "power2.in" }, "s5");
  sel(".s-staff").forEach((s, i) => {
    tl.to(s, { morphSVG: P.orbit[i], stroke: ["#2A44B8", "#E3A33A", "#5C76E0", "#D9472B", "#2A44B8"][i], strokeWidth: i === 0 ? 7 : 3, duration: 1.1, ease: "power3.inOut" }, `s5+=${0.2 + 0.05 * i}`);
  });
  tl.to(sel(".s-blobs"), { autoAlpha: 1, duration: 0.4 }, "s5")
    .to(sel(".s-blob"), {
      x: (i, el) => +el.dataset.tx,
      y: (i, el) => +el.dataset.ty,
      scale: 0.42,
      duration: 0.9,
      ease: "power3.inOut",
    }, "s5")
    .to(sel(".s-enso"), { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, "s5+=0.45")
    .set(sel(".s-mark, .s-sub"), { autoAlpha: 1 }, "s5+=0.8")
    .from(markSplit.chars, { autoAlpha: 0, y: 30, rotateX: -60, duration: 0.7, stagger: 0.05, ease: "back.out(2)" }, "s5+=0.8")
    .from(sel(".s-sub"), { autoAlpha: 0, letterSpacing: "0.9em", duration: 0.9, ease: "expo.out" }, "s5+=1.15");

  /* Exit — the film dissolves into the page */
  tl.addLabel("exit", "s5+=2.4")
    .to(sel(".s-svg"), { scale: 1.12, autoAlpha: 0, duration: 0.8, ease: "power2.in" }, "exit")
    .to(sel(".s-wordmark"), { autoAlpha: 0, y: -30, duration: 0.6, ease: "power2.in" }, "exit")
    .to(sel(".s-skip"), { autoAlpha: 0, duration: 0.3 }, "exit")
    .to(sel(".intro"), { autoAlpha: 0, duration: 0.6, ease: "none" }, "exit+=0.5")
    .add(() => setIntroFlag("done"), "exit+=0.45")
    .add(() => reveal.play(0), "exit+=0.5")
    .add(() => {
      showStage(false);
      teardown();
      ScrollTrigger.refresh();
    });

  // progress bar on the skip button
  const total = tl.duration() / tl.timeScale();
  gsap.to(sel(".s-progress"), { scaleX: 1, duration: total, ease: "none" });

  /* ------ skipping: button, scroll, swipe or key ------ */
  let skipped = false;
  const skip = () => {
    if (skipped || tl.time() >= tl.labels.exit) return;
    skipped = true;
    tl.timeScale(1.8).seek("exit");
  };
  const onKey = (e) => {
    if (e.key === "Tab" || e.key === "Shift") return;
    skip();
  };
  const btn = sel(".s-skip")[0];
  btn.addEventListener("click", skip);
  window.addEventListener("wheel", skip, { passive: true });
  window.addEventListener("touchmove", skip, { passive: true });
  window.addEventListener("keydown", onKey);
  function teardown() {
    btn.removeEventListener("click", skip);
    window.removeEventListener("wheel", skip);
    window.removeEventListener("touchmove", skip);
    window.removeEventListener("keydown", onKey);
  }
  btn.focus({ preventScroll: true });

  // detached by the outer gsap.context cleanup (unmount / replay)
  return teardown;
}
