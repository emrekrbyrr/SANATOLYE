import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { LESSONS, BRANCH_FILTERS } from "../data/content";

export const Lessons = () => {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? LESSONS : LESSONS.filter((l) => l.branch === filter);

  return (
    <section id="dersler" className="py-20 lg:py-32 bg-cream" data-testid="lessons-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-gold mb-4">
              Sanat Dallarımız
            </p>
            <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">
              Her çocuğa uygun bir sanat dalı var.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" data-testid="lesson-filters">
            {BRANCH_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  filter === f.id
                    ? "bg-ink text-cream"
                    : "bg-white text-ink/60 border border-borderlight hover:border-gold"
                }`}
                data-testid={`lesson-filter-${f.id}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {list.map((l) => (
              <motion.article
                key={l.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="group bg-white rounded-3xl overflow-hidden border border-borderlight hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink/10 transition-all duration-300"
                data-testid={`lesson-card-${l.id}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={l.image}
                    alt={l.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-ink">
                    {l.tag}
                  </span>
                  <span className={`absolute bottom-0 left-0 h-1.5 w-full ${l.accent}`} />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-ink">{l.name}</h3>
                  <p className="mt-2 text-ink/55 leading-relaxed text-sm">{l.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {l.skills.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-ink/70">
                        <span className="grid place-items-center w-5 h-5 rounded-full bg-gold/15 text-gold-dark">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
