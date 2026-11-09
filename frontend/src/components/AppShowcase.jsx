import { useEffect, useRef, useState } from "react";
import { BellRing, CalendarDays, Smartphone } from "lucide-react";
import { APP } from "../data/content";
import { gsap, ScrollTrigger, useGsap, prefersReducedMotion } from "../lib/gsap";
import { P } from "./hero/IntroStage";

const N = APP.screens.length;

/* Store badges render only when a real URL exists in content.js */
const StoreLinks = () => {
  const links = [
    APP.appStoreUrl && { href: APP.appStoreUrl, top: "App Store'dan", name: "İndirin", icon: "apple" },
    APP.googlePlayUrl && { href: APP.googlePlayUrl, top: "Google Play'den", name: "Edinin", icon: "play" },
  ].filter(Boolean);
  const note = (
    <p className="mt-4 flex items-start gap-2.5 text-sm text-ink-mute">
      <Smartphone size={16} className="mt-0.5 shrink-0 text-cad" />
      Hesaplar akademi yönetimi tarafından açılır; telefon numaranızla giriş yaparsınız.
    </p>
  );
  if (!links.length) return note;
  return (
    <>
    <div className="mt-8 flex flex-wrap gap-3">
      {links.map((l) => (
        <a key={l.icon} href={l.href} target="_blank" rel="noopener noreferrer" data-testid={`store-${l.icon}`} className="inline-flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-paper transition-colors hover:bg-cad">
          {l.icon === "apple" ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.97-3.46-1.07-1.57-2.74-1.78-3.33-1.8-1.42-.14-2.77.83-3.49.83-.72 0-1.83-.81-3.01-.79-1.55.02-2.98.9-3.78 2.29-1.61 2.8-.41 6.94 1.16 9.21.77 1.11 1.68 2.36 2.88 2.31 1.16-.05 1.6-.75 3-.75s1.79.75 3.01.72c1.25-.02 2.04-1.13 2.8-2.25.88-1.29 1.24-2.54 1.26-2.6-.03-.01-2.42-.93-2.47-3.71ZM14.08 5.84c.64-.77 1.07-1.85.95-2.92-.92.04-2.03.61-2.69 1.38-.59.68-1.11 1.78-.97 2.83 1.02.08 2.07-.52 2.71-1.29Z" /></svg>
          ) : (
            <svg width="20" height="22" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true"><path d="M1.2.6 13.6 13 1.2 25.4c-.4-.2-.7-.7-.7-1.3V1.9c0-.6.3-1.1.7-1.3Zm13.8 13.8 3 3L4.2 25.3l10.8-10.9Zm4.4-5.2 3.5 2c1 .6 1 2 0 2.6l-3.5 2-3.2-3.3 3.2-3.3ZM4.2.7 18 8.6l-3 3L4.2.7Z" /></svg>
          )}
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] opacity-70">{l.top}</span>
            <span className="text-[15px] font-medium">{l.name}</span>
          </span>
        </a>
      ))}
    </div>
    {note}
    </>
  );
};

const Card = ({ src, alt, show, className, w = 560, h }) => (
  <figure
    className={`pointer-events-none absolute z-20 overflow-hidden rounded-2xl bg-[#FBF8F3] shadow-[0_24px_50px_-20px_rgba(43,35,29,.45)] ring-1 ring-ink/5 transition-all duration-700 [transition-timing-function:cubic-bezier(.22,1,.36,1)] ${
      show ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-90 opacity-0"
    } ${className}`}
    aria-hidden={!show}
  >
    <img src={src} alt={alt} width={w} height={h} loading="lazy" className="block h-auto w-full" />
  </figure>
);

export const AppShowcase = () => {
  const root = useRef(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pinned = useRef(false);
  const userPicked = useRef(false);

  const select = (i) => {
    activeRef.current = i;
    setActive(i);
  };

  /* desktop: pinned scroll story */
  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      pinned.current = true;
      const imgs = q(".a-screen img");
          const scrollFor = (i) => {
        const img = imgs[i];
        return Math.max(0, img.offsetHeight - img.parentElement.offsetHeight);
      };

      ScrollTrigger.create({
        trigger: q(".a-pin")[0],
        pin: true,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.6}`,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.min(self.progress * N, N - 0.0001);
          const i = Math.floor(p);
          const local = gsap.utils.clamp(0, 1, (p - i - 0.15) / 0.7);
          if (i !== activeRef.current) select(i);
          const dist = scrollFor(i);
          if (dist) gsap.set(imgs[i], { y: -dist * local });
        },
      });

      gsap.fromTo(
        q(".a-phone"),
        { rotateY: -16, rotateX: 6, rotateZ: -5, y: 40 },
        {
          rotateY: 9, rotateX: 0, rotateZ: 2, y: 0, ease: "none",
          scrollTrigger: { trigger: q(".a-pin")[0], start: "top bottom", end: () => `+=${window.innerHeight * 3.6}`, scrub: 1 },
        }
      );
      gsap.fromTo(q(".a-blob"), { scale: 0.6, rotate: -20 }, {
        scale: 1, rotate: 10, ease: "none",
        scrollTrigger: { trigger: q(".a-pin")[0], start: "top bottom", end: "top top", scrub: 1 },
      });
      gsap.fromTo(q(".a-draw"), { drawSVG: "0%" }, {
        drawSVG: "100%", ease: "none", stagger: 0.2,
        scrollTrigger: { trigger: q(".a-pin")[0], start: "top 70%", end: "top 10%", scrub: 1 },
      });
      return () => {
        pinned.current = false;
        gsap.set(imgs, { y: 0 });
      };
    });
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(q(".a-phone"), {
        y: 80, rotate: -6, autoAlpha: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: q(".a-phone")[0], start: "top 85%" },
      });
    });
    return () => mm.revert();
  });

  /* phones & tablets: screens cycle on their own while visible */
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting && !pinned.current) {
        timer = setInterval(() => {
          if (userPicked.current || pinned.current) return;
          select((activeRef.current + 1) % N);
        }, 3200);
      }
    }, { threshold: 0.4 });
    if (root.current) io.observe(root.current.querySelector(".a-phone"));
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const pick = (i) => {
    userPicked.current = true;
    if (pinned.current) {
      // jump the pinned story to that step
      const st = ScrollTrigger.getAll().find((t) => t.pin === root.current.querySelector(".a-pin"));
      if (st) window.scrollTo({ top: st.start + ((i + 0.5) / N) * (st.end - st.start), behavior: "smooth" });
    } else {
      select(i);
    }
  };

  return (
    <section id="uygulama" ref={root} className="relative bg-paper-deep" data-testid="app-section">
      <div className="a-pin relative overflow-hidden lg:h-[100svh]">
        <div className="wrap grid h-full items-center gap-12 py-24 lg:grid-cols-12 lg:gap-8 lg:py-0 lg:pt-[var(--nav-h)]">
          {/* copy — on phones the heading, phone and step list stack in that order */}
          <div className="contents lg:col-span-5 lg:block">
            <div className="order-1">
            <p className="eyebrow flex items-center gap-2 text-cad" data-reveal>
              <BellRing size={14} /> Mobil Uygulama
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.3rem,4.4vw,4rem)] font-[380] leading-[1] tracking-[-0.02em] text-ink" data-split>
              Sanatölye, artık <em className="soft-italic text-cad">cebinizde!</em>
            </h2>
            <p className="mt-5 max-w-md text-ink-soft" data-reveal>
              Sanatölye mobil uygulamasıyla eğitim süreçlerini, duyuruları ve kurumunuzla ilgili gelişmeleri tek yerden
              takip edin.
            </p>
            </div>

            <div className="order-3">
            <ol className="mt-8 space-y-1" aria-label="Uygulama ekranları">
              {APP.screens.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={active === i ? "step" : undefined}
                    className={`group relative w-full rounded-xl py-2.5 pl-6 pr-3 text-left transition-colors ${active === i ? "bg-paper-light/80" : "hover:bg-paper-light/40"}`}
                  >
                    <span className={`absolute left-2 top-3 bottom-3 w-[3px] rounded-full transition-colors ${active === i ? "bg-cad" : "bg-ink/10"}`} />
                    <span className={`block font-display text-[1.2rem] leading-snug transition-colors ${active === i ? "text-ink" : "text-ink/45"}`}>
                      {s.label}
                    </span>
                    <span className={`grid transition-[grid-template-rows,opacity] duration-500 ${active === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <span className="overflow-hidden text-[15px] text-ink-soft">{s.text}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <p className="mt-6 text-sm text-ink-mute">
              <span className="font-medium text-ink-soft">Ve dahası:</span> {APP.more.join(" · ")}
            </p>
            <StoreLinks />
            </div>
          </div>

          {/* phone stage */}
          <div className="relative order-2 flex min-h-[600px] items-center justify-center lg:col-span-7 lg:h-full lg:min-h-0" style={{ perspective: "1400px" }}>
            <svg className="a-blob pointer-events-none absolute left-1/2 top-1/2 w-[min(640px,120%)] -translate-x-1/2 -translate-y-1/2" viewBox="-80 -80 160 160" aria-hidden="true">
              <path d={P.blob[1]} transform="scale(1.3)" fill="#E3A33A" className="rough-strong" opacity=".85" />
            </svg>
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 700 700" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
              <path className="a-draw rough" d="M40 560 C 160 470 260 640 380 560 S 600 420 680 480" stroke="#D9472B" strokeWidth="16" strokeLinecap="round" />
              <path className="a-draw" d="M520 90 q 22 -22 44 0 q 22 -22 44 0" stroke="#2B231D" strokeWidth="4" strokeLinecap="round" />
              <g className="a-draw-group" opacity=".8">
                <ellipse cx="110" cy="170" rx="13" ry="9" transform="rotate(-20 110 170)" fill="#2A44B8" />
                <path d="M122 166 V 110 q 18 8 18 28" stroke="#2A44B8" strokeWidth="4" strokeLinecap="round" />
              </g>
            </svg>

            {/* the phone */}
            <div className="a-phone relative z-10 w-[min(300px,72vw)] [transform-style:preserve-3d] lg:w-[min(310px,26vw)]">
              <div className="relative rounded-[3.1rem] bg-[#1d1915] p-[11px] shadow-[0_60px_80px_-40px_rgba(43,35,29,.7),inset_0_0_0_2px_#3a332c]">
                <div className="a-screen relative overflow-hidden rounded-[2.45rem] bg-[#F5F0E8]" style={{ aspectRatio: `1170 / ${2532}` }}>
                  {/* status bar */}
                  <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between bg-[#F5F0E8] px-7 text-[11px] font-semibold text-ink">
                    <span>9:41</span>
                    <span className="flex items-center gap-1" aria-hidden="true">
                      <span className="h-2 w-3 rounded-[2px] bg-ink/80" />
                      <span className="h-2.5 w-5 rounded-[3px] border border-ink/70 p-[1px]"><span className="block h-full w-3/4 rounded-[1px] bg-ink/80" /></span>
                    </span>
                  </div>
                  <span className="absolute left-1/2 top-2 z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-[#1d1915]" aria-hidden="true" />
                  {APP.screens.map((s, i) => (
                    <div
                      key={s.id}
                      className={`absolute inset-x-0 bottom-0 top-9 overflow-hidden transition-[opacity,transform] duration-700 ${
                        active === i ? "opacity-100" : "pointer-events-none scale-[1.03] opacity-0"
                      }`}
                    >
                      <img
                        src={s.src}
                        alt={`Sanatölye uygulaması — ${s.label}`}
                        width={600}
                        height={Math.round((600 * s.h) / 1170)}
                        loading="lazy"
                        className={`block w-full will-change-transform ${s.h > 2532 ? "h-auto" : "h-full object-cover object-top"}`}
                      />
                    </div>
                  ))}
                </div>
                <span className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r bg-[#2a2420]" aria-hidden="true" />
                <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-[#2a2420]" aria-hidden="true" />
                <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-[#2a2420]" aria-hidden="true" />
              </div>
            </div>

            {/* real UI cards from the app, emerging as the story moves on */}
            <Card src="/images/app/card-ders.jpg" alt="" h={202} show className="left-0 top-[14%] hidden w-[220px] -rotate-6 sm:block lg:left-[-2%] xl:left-[2%]" />
            <Card src="/images/app/card-not.jpg" alt="" h={302} show={active >= 2} className="bottom-[12%] right-0 hidden w-[260px] rotate-[4deg] sm:block xl:right-[2%]" />
            <Card src="/images/app/card-bildirim.jpg" alt="" h={467} show={active >= 3} className="bottom-[6%] left-0 hidden w-[230px] -rotate-3 sm:block lg:left-[-4%] xl:left-0" />

            <span className="absolute right-0 top-[4%] z-20 hidden rotate-6 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper shadow-lg sm:flex">
              <CalendarDays size={15} className="text-ochre" /> {APP.audiences.join(" · ")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
