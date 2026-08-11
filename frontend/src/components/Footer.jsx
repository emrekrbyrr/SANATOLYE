import { Instagram, Mail, Phone, Globe } from "lucide-react";
import { SCHOOL, NAV } from "../data/content";
import { scrollToId } from "../hooks/useSmoothScroll";

export const Footer = () => {
  const year = new Date().getFullYear();
  const go = (id) => scrollToId(id);

  return (
    <footer className="bg-cream border-t border-borderlight py-14" data-testid="footer">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-ink">
                <img src="/sanatolye_emblem.png" alt="SANATÖLYE" className="h-7 w-auto object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display font-semibold text-lg tracking-[0.18em] text-ink">SANATÖLYE</span>
                <span className="text-[9px] tracking-[0.32em] font-semibold text-gold uppercase mt-0.5">Sanat Akademisi</span>
              </span>
            </div>
            <p className="mt-4 text-ink/50">{SCHOOL.motto}. Müzik, resim ve dansla büyüyen mutlu çocuklar.</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-ink/60 hover:text-gold font-medium transition-colors"
                data-testid={`footer-link-${n.id}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex gap-3">
            <a href={`tel:${SCHOOL.phoneHref}`} className="grid place-items-center w-11 h-11 rounded-full bg-butter text-ink hover:bg-gold transition-colors" aria-label="Telefon">
              <Phone size={18} />
            </a>
            <a href={`mailto:${SCHOOL.email}`} className="grid place-items-center w-11 h-11 rounded-full bg-butter text-ink hover:bg-gold transition-colors" aria-label="E-posta">
              <Mail size={18} />
            </a>
            <a href={SCHOOL.websiteHref} target="_blank" rel="noreferrer" className="grid place-items-center w-11 h-11 rounded-full bg-butter text-ink hover:bg-gold transition-colors" aria-label="Web sitesi">
              <Globe size={18} />
            </a>
            <a href="#" className="grid place-items-center w-11 h-11 rounded-full bg-butter text-ink hover:bg-gold transition-colors" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-borderlight flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink/40">
          <p>© {year} SANATÖLYE Sanat Akademisi. Tüm hakları saklıdır.</p>
          <p>{SCHOOL.website} · {SCHOOL.address}</p>
        </div>
      </div>
    </footer>
  );
};
