import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Check } from "lucide-react";
import { SCHOOL, waLink } from "../../data/content";
import { courseForLesson } from "../../data/courses";

const ACCENT = { ultra: "#2A44B8", cad: "#D9472B", rose: "#C93D78" };

export const LessonDialog = ({ lesson, onClose }) => {
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!lesson) return undefined;
    lastFocus.current = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.({ preventScroll: true });
    };
  }, [lesson, onClose]);

  const color = lesson ? ACCENT[lesson.accent] : "#2B231D";

  return (
    <AnimatePresence>
      {lesson && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0 bg-ink/55 backdrop-blur-sm" aria-label="Kapat" onClick={onClose} tabIndex={-1} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-title"
            className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[28px] bg-paper sm:grid-cols-2 sm:rounded-[28px]"
            initial={{ y: 60, opacity: 0, rotate: -1.5 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            data-testid={`lesson-dialog-${lesson.id}`}
          >
            <div className="relative h-56 sm:h-full sm:min-h-[460px]">
              <img src={lesson.image.replace("w=1200", "w=900")} alt={lesson.name} className="absolute inset-0 h-full w-full object-cover" />
              <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]" style={{ color }}>
                {lesson.tag}
              </span>
            </div>
            <div className="p-7 sm:p-10">
              <h3 id="lesson-title" className="font-display text-[2.4rem] font-[420] leading-none text-ink">
                {lesson.name}
              </h3>
              <svg className="mt-3 h-3 w-32" viewBox="0 0 120 10" aria-hidden="true">
                <path d="M2 6 C 30 1 80 9 118 3" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
              </svg>
              <p className="mt-5 text-ink-soft">{lesson.desc}</p>
              <p className="eyebrow mt-7 text-ink/50">Neler kazanır?</p>
              <ul className="mt-3 space-y-2.5">
                {lesson.skills.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-full text-paper" style={{ background: color }}>
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={waLink(`Merhaba, ${lesson.name} dersi için ücretsiz tanışma dersi hakkında bilgi almak istiyorum.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-cad"
                >
                  Tanışma dersi ayarla
                </a>
                <a
                  href={`tel:${SCHOOL.phoneHref}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3.5 text-[15px] font-medium text-ink hover:border-ink"
                >
                  <Phone size={16} /> Ara
                </a>
              </div>
              {courseForLesson(lesson.id) && (
                <a
                  href={`/${courseForLesson(lesson.id).slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-[15px] font-medium text-ink hover:border-cad hover:text-cad"
                  data-testid="lesson-dialog-course-link"
                >
                  {courseForLesson(lesson.id).h1} sayfası →
                </a>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink shadow-md hover:bg-ink hover:text-paper"
              aria-label="Kapat"
              data-testid="lesson-dialog-close"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
