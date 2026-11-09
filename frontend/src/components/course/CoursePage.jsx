import { useEffect, useRef } from "react";
import { Phone, MessageCircle, Check, MapPin, Clock, ArrowRight, ChevronRight, Navigation } from "lucide-react";
import { SCHOOL, LESSONS, FEATURES, STEPS, waLink } from "../../data/content";
import { COURSES, commonFaq } from "../../data/courses";
import { gsap, useGsap } from "../../lib/gsap";
import { P } from "../hero/IntroStage";

const COLOR = { muzik: "#2A44B8", resim: "#D9472B" };
const img = (url, w) => url.replace(/w=\d+/, `w=${w}`);

export const CoursePage = ({ course }) => {
  const root = useRef(null);
  const lessons = course.lessons.map((id) => LESSONS.find((l) => l.id === id)).filter(Boolean);
  const color = COLOR[course.branch];
  const faq = [...course.faq, ...commonFaq(course, SCHOOL)];
  const others = COURSES.filter((c) => c.slug !== course.slug);
  const waText = `Merhaba, ${course.name} dersi için ücretsiz deneme dersi hakkında bilgi almak istiyorum.`;

  // Keep head tags right even when the page is reached without the prerendered HTML.
  useEffect(() => {
    document.title = course.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", course.description);
    document.documentElement.dataset.intro = "done";
  }, [course]);

  useGsap(root, () => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(q(".c-in"), { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "expo.out" });
      gsap.fromTo(q(".c-draw"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, ease: "power2.inOut", delay: 0.3 });
      gsap.from(q(".c-photo"), { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", delay: 0.1 });
    });
    return () => mm.revert();
  }, [course.slug]);

  return (
    <div ref={root}>
      {/* ---------------- hero ---------------- */}
      <section className="relative overflow-hidden pb-16 pt-[calc(var(--nav-h)+40px)] lg:pb-24" data-testid="course-hero">
        <svg className="pointer-events-none absolute -right-24 top-16 hidden w-[420px] lg:block" viewBox="-80 -80 160 160" aria-hidden="true">
          <path d={P.blob[0]} transform="scale(1.25)" fill="#E3A33A" opacity=".85" className="rough" />
        </svg>
        <div className="wrap relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <nav aria-label="Konum" className="c-in mb-6 flex flex-wrap items-center gap-1.5 text-sm text-ink-mute">
              <a href="/" className="hover:text-ink">Anasayfa</a>
              <ChevronRight size={14} />
              <a href="/#dersler" className="hover:text-ink">{course.branch === "muzik" ? "Müzik" : "Resim"}</a>
              <ChevronRight size={14} />
              <span className="text-ink" aria-current="page">{course.name}</span>
            </nav>
            <h1 className="c-in font-display text-[clamp(2.6rem,6vw,5.4rem)] font-[380] leading-[0.98] tracking-[-0.025em] text-ink">
              {course.h1.replace(" Kursu", "")}{" "}
              <em className="soft-italic relative inline-block" style={{ color }}>
                Kursu
                <svg className="absolute -bottom-[0.12em] left-0 h-[0.28em] w-full overflow-visible" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                  <path className="c-draw" d="M4 20 C 70 6 160 4 296 14" fill="none" stroke="#E3A33A" strokeWidth="9" strokeLinecap="round" />
                </svg>
              </em>
            </h1>
            <p className="c-in mt-6 max-w-xl font-display text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-ink-soft">{course.lead}</p>
            <div className="c-in mt-9 flex flex-wrap gap-3">
              <a
                href={waLink(waText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[15px] font-medium text-paper transition-colors hover:bg-cad"
                data-testid="course-cta-whatsapp"
              >
                <MessageCircle size={18} /> Ücretsiz Deneme Dersi Ayarla
              </a>
              <a
                href={`tel:${SCHOOL.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-4 text-[15px] font-medium text-ink transition-colors hover:border-ink"
                data-testid="course-cta-phone"
              >
                <Phone size={17} /> {SCHOOL.phone}
              </a>
            </div>
            <p className="c-in mt-5 flex items-center gap-2 text-sm text-ink-mute">
              <MapPin size={15} className="text-cad" /> Silivri, İstanbul · İlk deneme dersi ücretsiz
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[460px] lg:col-span-5">
            <div className="c-photo mask-blob aspect-[4/5] overflow-hidden bg-paper-deep">
              <img src={img(lessons[0].image, 900)} alt={`SANATÖLYE ${course.name.toLowerCase()} dersi`} className="h-full w-full object-cover" fetchPriority="high" />
            </div>
            {lessons[1] && (
              <div className="absolute -bottom-6 -left-4 w-[42%] overflow-hidden rounded-full border-[6px] border-paper shadow-xl">
                <img src={img(lessons[1].image, 500)} alt={lessons[1].name} loading="lazy" className="aspect-square w-full object-cover" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------------- about the course ---------------- */}
      <section className="bg-paper-light py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow" style={{ color }} data-reveal>Kurs hakkında</p>
            <h2 className="mt-4 font-display display-md font-[400] text-ink" data-split>
              Silivri'de çocuklar için {course.name.toLocaleLowerCase("tr")} {course.branch === "resim" ? "kursu" : "dersleri"}
            </h2>
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-soft">
              {course.intro.map((p) => (
                <p key={p.slice(0, 20)} data-reveal>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            {lessons.map((l) => (
              <div key={l.id} className="mb-6 rounded-3xl border border-line bg-paper p-7" data-reveal>
                <h3 className="font-display text-2xl text-ink">{l.name}</h3>
                <p className="mt-2 text-ink-soft">{l.desc}</p>
                <p className="eyebrow mt-6 text-ink/50">Derslerde neler kazanır?</p>
                <ul className="mt-3 space-y-2.5">
                  {l.skills.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-ink">
                      <span className="grid h-6 w-6 place-items-center rounded-full text-paper" style={{ background: color }}>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- why us ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="wrap">
          <p className="eyebrow text-cad" data-reveal>Neden SANATÖLYE?</p>
          <h2 className="mt-4 max-w-3xl font-display display-md font-[400] text-ink" data-split>
            Çocuğunuzun sanatla tanışacağı sıcak, güvenli bir yuva.
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="border-t border-ink/15 pt-5" data-reveal>
                <span className="font-display text-2xl italic text-ink/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 font-display text-xl text-ink">{f.title}</h3>
                <p className="mt-1.5 text-[15px] text-ink-soft">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- how to start ---------------- */}
      <section className="bg-ink py-20 text-paper lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ochre" data-reveal>Nasıl başlarım?</p>
            <h2 className="mt-4 font-display display-md font-[380]" data-split>
              İlk deneme dersi <em className="soft-italic text-ochre-light">ücretsiz.</em>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-medium text-ink hover:bg-[#3ee07c]">
                <MessageCircle size={18} /> WhatsApp'tan Yaz
              </a>
              <a href={`tel:${SCHOOL.phoneHref}`} className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-medium text-ink hover:bg-ochre">
                <Phone size={17} /> Hemen Ara
              </a>
            </div>
          </div>
          <ol className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {STEPS.map((s) => (
              <li key={s.no} className="border-t border-paper/15 pt-5" data-reveal>
                <span className="font-display text-4xl italic text-ochre">{s.no}</span>
                <h3 className="mt-2 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-[15px] text-paper/60">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-cad" data-reveal>Sık sorulanlar</p>
            <h2 className="mt-4 font-display display-md font-[400] text-ink" data-split>
              {course.name} kursu hakkında
            </h2>
            <div className="mt-8 space-y-3 text-[15px] text-ink-soft" data-reveal>
              <p className="flex gap-2.5"><MapPin size={17} className="mt-0.5 shrink-0 text-cad" /> {SCHOOL.address}</p>
              <p className="flex gap-2.5"><Clock size={17} className="mt-0.5 shrink-0 text-cad" /> {SCHOOL.hours}</p>
              <a href={SCHOOL.mapsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-cad hover:underline">
                <Navigation size={14} /> Yol tarifi al
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            {faq.map((f) => (
              <details key={f.q} className="group border-t border-ink/15 py-5 last:border-b" data-reveal>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- other courses (internal links) ---------------- */}
      <section className="bg-paper-deep py-20">
        <div className="wrap">
          <p className="eyebrow text-cad" data-reveal>Diğer kurslarımız</p>
          <ul className="mt-6 flex flex-wrap gap-3" data-reveal>
            {others.map((c) => (
              <li key={c.slug}>
                <a href={`/${c.slug}`} className="group inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper px-5 py-3 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper">
                  {c.h1}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
