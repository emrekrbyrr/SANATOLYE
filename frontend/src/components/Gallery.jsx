import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY, GALLERY_FILTERS } from "../data/content";

const thumb = (src) => src.replace(/w=\d+/, "w=700").replace("q=85", "q=70");
const large = (src) => src.replace(/w=\d+/, "w=1600");

/* salon-style hang: each slot has its own size, rotation and frame */
const SLOTS = [
  "lg:col-span-5 lg:row-span-5",
  "lg:col-span-3 lg:row-span-3 lg:mt-10",
  "lg:col-span-4 lg:row-span-4",
  "lg:col-span-3 lg:row-span-3",
  "lg:col-span-4 lg:row-span-4 lg:-mt-6",
  "lg:col-span-4 lg:row-span-4",
  "lg:col-span-4 lg:row-span-4",
  "lg:col-span-4 lg:row-span-4 lg:mt-6",
];
const TILT = ["-rotate-1", "rotate-2", "-rotate-[1.5deg]", "rotate-1", "-rotate-2", "rotate-[1.5deg]", "-rotate-1", "rotate-2"];
const CAT_COLOR = { muzik: "#2A44B8", resim: "#D9472B", sahne: "#E3A33A" };

const Frame = ({ kind, children, label, cat }) => {
  if (kind === 0)
    return (
      <div className="h-full bg-[#3a2c22] p-2.5 shadow-[0_26px_40px_-24px_rgba(43,35,29,.8)] sm:p-3.5">
        <div className="h-full bg-paper-light p-2.5 sm:p-4">{children}</div>
      </div>
    );
  if (kind === 1)
    return (
      <div className="flex h-full flex-col bg-paper-light p-2.5 pb-0 shadow-[0_26px_40px_-24px_rgba(43,35,29,.7)]">
        <div className="min-h-0 flex-1">{children}</div>
        <p className="py-2 text-center font-hand text-xl leading-none sm:text-2xl" style={{ color: CAT_COLOR[cat] }}>{label}</p>
      </div>
    );
  if (kind === 2)
    return (
      <div className="relative h-full shadow-[0_26px_40px_-24px_rgba(43,35,29,.7)]">
        <span className="absolute -top-3 left-6 z-10 h-6 w-20 -rotate-6 bg-[#efe1c4]/85" aria-hidden="true" />
        <span className="absolute -bottom-3 right-6 z-10 h-6 w-16 rotate-[8deg] bg-[#efe1c4]/85" aria-hidden="true" />
        {children}
      </div>
    );
  return <div className="h-full rounded-[4px] shadow-[0_30px_40px_-26px_rgba(43,35,29,.85)] ring-1 ring-ink/10">{children}</div>;
};

export const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null); // index into `list`
  const list = filter === "all" ? GALLERY : GALLERY.filter((g) => g.cat === filter);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open !== null ? list[open] : null;

  return (
    <section id="galeri" className="relative bg-[#EDE3D5] py-24 lg:py-36" data-testid="gallery-section">
      {/* gallery wall light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(255,250,240,.9),transparent_70%)]" aria-hidden="true" />
      <div className="wrap relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-cad" data-reveal>Galeri · Sergi Duvarı</p>
            <h2 className="mt-4 font-display display-lg font-[380] text-ink" data-split>
              Atölyelerimizden <em className="soft-italic text-ochre-deep">kareler.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Galeri filtresi" data-testid="gallery-filters">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`rounded-full px-5 py-2.5 text-sm transition-colors ${
                  filter === f.id ? "bg-ink text-paper" : "border border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
                }`}
                data-testid={`gallery-filter-${f.id}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <motion.ul layout className="mt-14 grid grid-flow-dense auto-rows-[120px] grid-cols-2 gap-5 sm:auto-rows-[150px] lg:mt-20 lg:auto-rows-[82px] lg:grid-cols-12 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {list.map((g, i) => (
                <motion.li
                  key={g.src}
                  layout
                  initial={{ opacity: 0, y: 40, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 160, damping: 22 }}
                  className={`${i % 3 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-2"} ${SLOTS[i % SLOTS.length]}`}
                  data-testid={`gallery-item-${i}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    className={`group block h-full w-full text-left transition-transform duration-500 hover:z-10 hover:-translate-y-1.5 hover:rotate-0 ${TILT[i % TILT.length]}`}
                    aria-label={`${g.label} fotoğrafını büyüt`}
                  >
                    <Frame kind={i % 4} label={g.label} cat={g.cat}>
                      <motion.div layoutId={`g-${g.src}`} className="h-full w-full overflow-hidden">
                        <img
                          src={thumb(g.src)}
                          alt={`${g.label} atölyesinden bir kare`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform [transition-duration:1400ms] ease-out group-hover:scale-[1.06]"
                        />
                      </motion.div>
                    </Frame>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          <AnimatePresence>
            {current && (
              <motion.div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={`${current.label} — büyük görünüm`}
                data-testid="gallery-lightbox"
              >
                <motion.figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                  <motion.div layoutId={`g-${current.src}`} className="overflow-hidden rounded-sm bg-paper-light p-2 sm:p-3">
                    <img src={large(current.src)} alt={`${current.label} atölyesinden bir kare`} className="max-h-[78svh] w-auto object-contain" />
                  </motion.div>
                  <figcaption className="mt-4 flex items-center justify-between text-paper">
                    <span className="font-hand text-3xl" style={{ color: CAT_COLOR[current.cat] }}>{current.label}</span>
                    <span className="text-sm text-paper/60">{open + 1} / {list.length}</span>
                  </figcaption>
                </motion.figure>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper hover:bg-paper hover:text-ink sm:left-6" aria-label="Önceki">
                  <ChevronLeft />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper hover:bg-paper hover:text-ink sm:right-6" aria-label="Sonraki">
                  <ChevronRight />
                </button>
                <button type="button" onClick={close} autoFocus className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-paper text-ink" aria-label="Kapat">
                  <X />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
};
