import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { NAV, SCHOOL } from "../data/content";
import { scrollToId } from "../hooks/useSmoothScroll";
import { Logo } from "./art/Logo";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("anasayfa");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id) => {
    setOpen(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <header
      className={`site-nav fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-500 ${
        scrolled && !open ? "bg-paper/85 py-2.5 shadow-[0_1px_0_rgba(43,35,29,.08)] backdrop-blur-md" : "py-4"
      }`}
      data-testid="navbar"
    >
      <div className="wrap flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go("anasayfa")}
          className="relative z-[2] -ml-1 rounded-md px-1"
          aria-label="SANATÖLYE — Anasayfa"
          data-testid="navbar-logo"
        >
          <Logo />
        </button>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Ana menü">
          {NAV.slice(1).map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              className={`group relative px-3.5 py-2 text-[15px] transition-colors ${
                active === n.id ? "text-ink" : "text-ink/60 hover:text-ink"
              }`}
              aria-current={active === n.id ? "true" : undefined}
              data-testid={`nav-link-${n.id}`}
            >
              {n.label}
              <svg className="absolute inset-x-3 -bottom-0.5 h-2 w-[calc(100%-1.5rem)]" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
                <path
                  d="M2 5 C 30 1 70 7 98 3"
                  fill="none"
                  stroke="#D9472B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength="1"
                  strokeDasharray="1"
                  className={`transition-[stroke-dashoffset] duration-500 ${
                    active === n.id ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1] group-hover:[stroke-dashoffset:0]"
                  }`}
                />
              </svg>
            </button>
          ))}
        </nav>

        <div className="relative z-[2] flex items-center gap-2">
          <a
            href={`tel:${SCHOOL.phoneHref}`}
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-cad sm:inline-flex"
            data-testid="navbar-call-btn"
          >
            <Phone size={15} /> Hemen Ara
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper/70 xl:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            data-testid="navbar-mobile-toggle"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-[2px] w-5 rounded bg-ink transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-5 rounded bg-ink transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[1] flex flex-col overflow-y-auto bg-paper px-6 pb-8 pt-28 xl:hidden"
            aria-label="Mobil menü"
            data-testid="navbar-mobile-menu"
          >
            <svg className="pointer-events-none absolute -right-20 bottom-24 w-80 opacity-80" viewBox="-70 -70 140 140" aria-hidden="true">
              <path d="M0-58C32-60 60-34 56 0 52 30 30 56-2 54-34 52-58 28-56-4-54-34-30-56 0-58Z" fill="#E3A33A" className="rough" />
            </svg>
            <ul className="relative flex flex-col">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => go(n.id)}
                    className="flex w-full items-baseline gap-4 border-b border-line py-3.5 text-left font-display text-[2rem] leading-tight text-ink"
                    data-testid={`nav-mobile-link-${n.id}`}
                  >
                    <span className="font-sans text-xs text-ink/40">0{i + 1}</span>
                    {n.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <a
              href={`tel:${SCHOOL.phoneHref}`}
              className="relative mt-8 flex items-center justify-center gap-2 rounded-full bg-ink px-4 py-4 font-medium text-paper"
              data-testid="navbar-mobile-call-btn"
            >
              <Phone size={17} /> Hemen Ara · {SCHOOL.phone}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
