import { motion } from "framer-motion";
import { CHAPTERS, STATS } from "../data/content";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export const About = () => {
  return (
    <section id="hakkimizda" className="py-20 lg:py-32 bg-sand relative" data-testid="about-section">
      <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-widest font-semibold text-gold mb-4">
            Hakkımızda
          </p>
          <h2 className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-ink leading-tight">
            Sanatı bir <span className="font-hand text-gold text-4xl sm:text-5xl lg:text-6xl">yük</span> değil,
            <br className="hidden sm:block" /> bir <span className="text-gold italic">keşif</span> olarak öğretiyoruz.
          </h2>
          <p className="mt-6 text-lg text-ink/60 leading-relaxed">
            SANATÖLYE'de çocuklar önce sanatı sever, sonra öğrenir. Müzik,
            resim ve dans; dört ilkemizle her çocuğun kendi rengini bulmasına
            eşlik ediyoruz.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6 lg:gap-8">
          {CHAPTERS.map((c, i) => (
            <motion.article
              key={c.no}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="group bg-white rounded-3xl p-8 border border-borderlight hover:-translate-y-2 hover:shadow-xl hover:shadow-ink/5 transition-all duration-300"
              data-testid={`about-chapter-${c.no}`}
            >
              <span className={`font-display font-extrabold text-6xl ${c.color} opacity-90`}>
                {c.no}
              </span>
              <h3 className="mt-4 font-display font-bold text-xl text-ink">{c.title}</h3>
              <p className="mt-3 text-ink/55 leading-relaxed">{c.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center rounded-3xl bg-white/60 border border-borderlight py-8"
              data-testid={`about-stat-${i}`}
            >
              <p className="font-display font-extrabold text-4xl lg:text-5xl text-ink">
                {s.value}<span className="text-gold">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-ink/50 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
