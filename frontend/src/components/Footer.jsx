import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { SCHOOL, NAV, BRANCHES } from "../data/content";
import { scrollToId } from "../hooks/useSmoothScroll";
import { Wobble } from "./art/Wobble";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-paper pb-8 pt-20" data-testid="footer">
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-[1.7rem] leading-snug text-ink">
              {SCHOOL.motto}. <span className="text-ink-mute">Müzik ve resimle büyüyen mutlu çocuklar.</span>
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { href: `tel:${SCHOOL.phoneHref}`, label: "Telefon", icon: <Phone size={17} /> },
                { href: `mailto:${SCHOOL.email}`, label: "E-posta", icon: <Mail size={17} /> },
                { href: SCHOOL.instagramHref, label: "Instagram", icon: <Instagram size={17} />, ext: true },
                { href: SCHOOL.mapsHref, label: "Haritada gör", icon: <MapPin size={17} />, ext: true },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  aria-label={l.label}
                  {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {l.icon}
                </a>
              ))}
            </div>
          </div>
          <nav className="md:col-span-3" aria-label="Alt menü">
            <p className="eyebrow text-ink-mute">Menü</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button type="button" onClick={() => scrollToId(n.id)} className="text-ink-soft transition-colors hover:text-cad" data-testid={`footer-link-${n.id}`}>
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow text-ink-mute">Sanat Dalları</p>
            <ul className="mt-4 space-y-2 text-ink-soft">
              {BRANCHES.map((b) => (
                <li key={b.id}>{b.title}</li>
              ))}
            </ul>
            <p className="eyebrow mt-8 text-ink-mute">Adres</p>
            <p className="mt-3 text-ink-soft">{SCHOOL.address}</p>
            <p className="mt-1 text-sm text-ink-mute">{SCHOOL.hours}</p>
          </div>
        </div>

        <div className="relative mt-20 select-none text-center" aria-hidden="true">
          <Wobble className="block font-mark text-[clamp(2.4rem,12.2vw,11.6rem)] font-medium leading-none tracking-[0.06em] text-ink">
            SANATÖLYE
          </Wobble>
          <span className="mt-3 flex items-center justify-center gap-3 text-[clamp(.65rem,1.4vw,1rem)] uppercase tracking-[0.5em] text-ink/60">
            <span className="h-px w-10 bg-current" /> Sanat Akademisi <span className="h-px w-10 bg-current" />
          </span>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ink/10 pt-6 text-sm text-ink-mute sm:flex-row">
          <p>© {year} SANATÖLYE Sanat Akademisi. Tüm hakları saklıdır.</p>
          <p>Silivri müzik ve resim kursu · {SCHOOL.website}</p>
        </div>
      </div>
    </footer>
  );
};
