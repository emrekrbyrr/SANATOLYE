import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, SCHOOL } from "../data/content";
import { scrollToId } from "../hooks/useSmoothScroll";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/85 backdrop-blur-md border-b border-borderaccent/60 py-3" : "py-5"
      }`}
      data-testid="navbar"
    >
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={() => go("anasayfa")}
          className="flex items-center gap-3 group"
          data-testid="navbar-logo"
        >
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-ink group-hover:scale-105 transition-transform p-1.5">
            <img src="/sanatolye_emblem.png" alt="SANATÖLYE" className="w-full h-full object-contain" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display font-semibold text-xl tracking-[0.18em] text-ink">
              SANATÖLYE
            </span>
            <span className="text-[9px] tracking-[0.32em] font-semibold text-gold uppercase mt-0.5">
              Sanat Akademisi
            </span>
          </span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="px-4 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-ink hover:bg-butter transition-colors"
              data-testid={`nav-link-${n.id}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <a
          href={`tel:${SCHOOL.phoneHref}`}
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-sky transition-colors"
          data-testid="navbar-call-btn"
        >
          Hemen Ara
        </a>

        <button
          className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-butter text-ink"
          onClick={() => setOpen((o) => !o)}
          data-testid="navbar-mobile-toggle"
          aria-label="Menü"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-cream border-t border-borderaccent/60"
            data-testid="navbar-mobile-menu"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="text-left px-4 py-3 rounded-xl font-medium text-ink/80 hover:bg-butter"
                  data-testid={`nav-mobile-link-${n.id}`}
                >
                  {n.label}
                </button>
              ))}
              <a
                href={`tel:${SCHOOL.phoneHref}`}
                className="mt-2 text-center px-4 py-3 rounded-xl bg-ink text-cream font-semibold"
                data-testid="navbar-mobile-call-btn"
              >
                Hemen Ara
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
