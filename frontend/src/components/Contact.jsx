import { useRef } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Copy, Instagram, Globe, Navigation, MessageCircle } from "lucide-react";
import { SCHOOL, STEPS, waLink } from "../data/content";
import { gsap, useGsap } from "../lib/gsap";
import { P } from "./hero/IntroStage";

export const Contact = () => {
  const root = useRef(null);

  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(q(".k-draw"), { drawSVG: "0%" }, {
        drawSVG: "100%", duration: 1.6, ease: "power2.inOut", stagger: 0.2,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(q(".k-blob"), {
        scale: 0, rotate: -40, transformOrigin: "50% 50%", duration: 1.4, ease: "elastic.out(1,.6)",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to(q(".k-stamp"), { rotate: 360, duration: 24, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    });
    return () => mm.revert();
  });

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} kopyalandı!`, { description: text });
    } catch {
      toast.error("Kopyalanamadı", { description: text });
    }
  };

  return (
    <section id="iletisim" ref={root} className="relative overflow-hidden bg-ink py-24 text-paper lg:py-36" data-testid="contact-section">
      <svg className="k-blob pointer-events-none absolute -right-40 -top-40 w-[620px] opacity-90" viewBox="-80 -80 160 160" aria-hidden="true">
        <path d={P.blob[2]} transform="scale(1.4)" fill="#D9472B" className="rough-strong" />
      </svg>
      <svg className="pointer-events-none absolute bottom-10 left-0 w-full opacity-60" viewBox="0 0 1400 200" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path className="k-draw rough" d="M-20 150 C 300 60 520 200 820 110 S 1250 40 1420 120" stroke="#E3A33A" strokeWidth="5" strokeLinecap="round" />
      </svg>

      <div className="wrap relative grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow text-ochre" data-reveal>Ücretsiz Tanışma Dersi</p>
          <h2 className="mt-5 font-display text-[clamp(2.6rem,6.2vw,6rem)] font-[360] leading-[0.95] tracking-[-0.03em]" data-split>
            Çocuğunuzun içindeki sanatçıyla <em className="soft-italic text-ochre-light">tanışalım.</em>
          </h2>
          <p className="mt-7 max-w-xl text-lg text-paper/70" data-reveal>
            Çocuğunuza en uygun sanat dalını birlikte keşfedelim. Bir telefon ya da mesaj yeterli — gerisini biz
            hallederiz.
          </p>

          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <a
              href={`tel:${SCHOOL.phoneHref}`}
              className="inline-flex items-center gap-2 rounded-full bg-paper px-7 py-4 font-medium text-ink transition-colors hover:bg-ochre"
              data-testid="call-phone-btn"
            >
              <Phone size={18} /> Hemen Ara
            </a>
            <a
              href={waLink("Merhaba, ücretsiz tanışma dersi hakkında bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 font-medium text-ink transition-colors hover:bg-[#3ee07c]"
              data-testid="whatsapp-cta-btn"
            >
              <MessageCircle size={18} /> WhatsApp'tan Yaz
            </a>
            <a
              href={`mailto:${SCHOOL.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-4 font-medium text-paper transition-colors hover:bg-paper/10"
              data-testid="send-email-btn"
            >
              <Mail size={18} /> E-posta Gönder
            </a>
          </div>

          <ol className="mt-16 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.no} className="border-t border-paper/15 pt-5" data-reveal>
                <span className="font-display text-4xl italic text-ochre">{s.no}</span>
                <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-[15px] text-paper/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* postcard */}
        <div className="relative lg:col-span-5">
          <div className="relative rotate-[1.5deg] bg-paper p-7 text-ink shadow-[0_40px_60px_-30px_rgba(0,0,0,.6)] sm:p-9" data-testid="contact-card">
            <svg className="k-stamp absolute -right-6 -top-10 h-28 w-28 sm:-right-10" viewBox="0 0 120 120" aria-hidden="true">
              <defs>
                <path id="stampCircle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
              </defs>
              <circle cx="60" cy="60" r="58" fill="#D9472B" />
              {/* textLength = circle circumference (2π·44 ≈ 276) so the text closes the ring exactly */}
              <text fontFamily="Jost" fontSize="9.5" fontWeight="500" fill="#F6EEE4">
                <textPath href="#stampCircle" textLength="274" lengthAdjust="spacing">
                  ÜCRETSİZ DENEME DERSİ • ÜCRETSİZ DENEME DERSİ •
                </textPath>
              </text>
              <text x="60" y="68" textAnchor="middle" fontFamily="Caveat" fontSize="26" fill="#F6EEE4">♪✎</text>
            </svg>

            <p className="font-hand text-3xl text-cad">Bize ulaşın</p>
            <div className="mt-6 space-y-5">
              <Row icon={<Phone size={19} />} label="Telefon" value={SCHOOL.phone} href={`tel:${SCHOOL.phoneHref}`} onCopy={() => copy(SCHOOL.phone, "Telefon")} testid="copy-phone-btn" />
              <Row icon={<Mail size={19} />} label="E-posta" value={SCHOOL.email} href={`mailto:${SCHOOL.email}`} onCopy={() => copy(SCHOOL.email, "E-posta")} testid="copy-email-btn" />
              <Row icon={<Globe size={19} />} label="Web Sitesi" value={SCHOOL.website} href={SCHOOL.websiteHref} onCopy={() => copy(SCHOOL.website, "Web sitesi")} testid="copy-website-btn" />
            </div>
            <div className="my-7 border-t border-dashed border-ink/25" />
            <div className="space-y-5">
              <Info icon={<MapPin size={19} />} label="Adres">
                {SCHOOL.address}
                <a href={SCHOOL.mapsHref} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex w-fit items-center gap-1.5 text-sm font-medium text-cad hover:underline">
                  <Navigation size={14} /> Yol tarifi al
                </a>
              </Info>
              <Info icon={<Clock size={19} />} label="Çalışma Saatleri">{SCHOOL.hours}</Info>
              <Info icon={<Instagram size={19} />} label="Instagram">
                <a href={SCHOOL.instagramHref} target="_blank" rel="noopener noreferrer" className="hover:text-cad">{SCHOOL.instagram}</a>
              </Info>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Row = ({ icon, label, value, href, onCopy, testid }) => (
  <div className="flex items-center gap-4">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper-deep text-ink">{icon}</span>
    <div className="min-w-0 flex-1">
      <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">{label}</p>
      <a href={href} className="block truncate font-display text-lg text-ink hover:text-cad sm:text-xl" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {value}
      </a>
    </div>
    <button
      type="button"
      onClick={onCopy}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
      aria-label={`${label} kopyala`}
      data-testid={testid}
    >
      <Copy size={15} />
    </button>
  </div>
);

const Info = ({ icon, label, children }) => (
  <div className="flex items-start gap-4">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink/70">{icon}</span>
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">{label}</p>
      <div className="mt-0.5 leading-snug text-ink">{children}</div>
    </div>
  </div>
);
