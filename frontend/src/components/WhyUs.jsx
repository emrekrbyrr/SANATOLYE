import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  Sparkles,
  Building2,
  CalendarClock,
  Gift,
  Quote,
} from "lucide-react";
import { FEATURES, TESTIMONIALS } from "../data/content";

const ICONS = { GraduationCap, Users, Sparkles, Building2, CalendarClock, Gift };

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" },
  }),
};

export const WhyUs = () => {
  return (
    <section id="neden" className="py-20 lg:py-32 bg-sand" data-testid="whyus-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-gold mb-4">
            Neden Biz
          </p>
          <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">
            Neden <span className="text-gold italic">SANATÖLYE?</span>
          </h2>
          <p className="mt-5 text-lg text-ink/60 leading-relaxed">
            Çocuğunuzun sanatla tanışacağı sıcak, güvenli ve ilham veren bir yuva.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.article
                key={f.title}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group bg-white rounded-3xl p-8 border border-borderlight hover:-translate-y-2 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300"
                data-testid={`feature-card-${i}`}
              >
                <span className={`grid place-items-center w-14 h-14 rounded-2xl ${f.bg} ${f.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={26} strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display font-bold text-xl text-ink">{f.title}</h3>
                <p className="mt-3 text-ink/55 leading-relaxed">{f.text}</p>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-20">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-gold mb-8 text-center">
            Velilerimiz Ne Diyor?
          </p>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-borderlight relative"
                data-testid={`testimonial-${i}`}
              >
                <Quote className="text-gold/30 mb-3" size={34} />
                <blockquote className="font-display text-lg text-ink leading-snug">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-full bg-gold/15 text-gold-dark font-display font-bold">
                    {t.author.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-ink leading-none">{t.author}</p>
                    <p className="text-sm text-ink/50 mt-1">{t.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
