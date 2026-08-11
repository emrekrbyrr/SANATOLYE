import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY, GALLERY_FILTERS } from "../data/content";

export const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? GALLERY : GALLERY.filter((g) => g.cat === filter);

  return (
    <section id="galeri" className="py-20 lg:py-32 bg-cream" data-testid="gallery-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-gold mb-4">
              Galeri
            </p>
            <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">
              Atölyelerimizden kareler.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2" data-testid="gallery-filters">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === f.id
                    ? "bg-ink text-cream"
                    : "bg-white text-ink/60 border border-borderlight hover:border-gold"
                }`}
                data-testid={`gallery-filter-${f.id}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[200px] lg:auto-rows-[260px] gap-4"
        >
          <AnimatePresence mode="popLayout">
            {list.map((g, i) => (
              <motion.figure
                key={g.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`group relative rounded-3xl overflow-hidden ${
                  i % 5 === 0 ? "lg:row-span-2 lg:col-span-2" : ""
                }`}
                data-testid={`gallery-item-${i}`}
              >
                <img
                  src={g.src}
                  alt={g.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-cream font-semibold text-sm">{g.label}</span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
