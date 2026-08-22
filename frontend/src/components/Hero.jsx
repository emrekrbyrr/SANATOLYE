import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Music2, Palette, Sparkles, Star, ArrowDown } from "lucide-react";
import { SCHOOL } from "../data/content";
import { scrollToId } from "../hooks/useSmoothScroll";

const lines = ["Her çocukta", "gizli bir", "sanatçı var."];

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.2 + i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

const disciplines = ["Müzik", "Resim", "Dans"];

const Float = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.8 + delay, duration: 0.6, ease: "backOut" }}
    className={`absolute animate-floaty ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {children}
  </motion.div>
);

export const Hero = () => {
  const ref = useRef(null);
  const goTo = (id) => scrollToId(id);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      id="anasayfa"
      ref={ref}
      className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-28 pb-16"
      data-testid="hero-section"
    >
      <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-butter blur-3xl opacity-80" />
      <div className="absolute top-40 -right-40 w-[32rem] h-[32rem] rounded-full bg-gold/10 blur-3xl" />

      <Float className="top-32 left-[8%] text-gold hidden sm:block" delay={0}>
        <Music2 size={40} strokeWidth={2.2} />
      </Float>
      <Float className="bottom-40 left-[14%] text-coral hidden md:block" delay={0.8}>
        <Palette size={34} strokeWidth={2} />
      </Float>
      <Float className="top-44 right-[10%] text-lav hidden lg:block" delay={0.4}>
        <Star size={30} className="fill-lav/30" />
      </Float>

      <div className="relative px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2 mb-7"
            data-testid="hero-disciplines"
          >
            {disciplines.map((d, i) => (
              <span
                key={d}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-borderaccent shadow-sm text-sm font-semibold text-ink/75"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${["bg-gold", "bg-coral", "bg-lav"][i]}`} />
                {d}
              </span>
            ))}
          </motion.div>

          <h1 className="font-display font-semibold tracking-tight leading-[0.98] text-5xl sm:text-6xl lg:text-7xl text-ink">
            {lines.map((l, i) => (
              <span key={i} className="line-mask pb-1">
                <motion.span
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  {i === 2 ? <span className="text-gold italic">{l}</span> : l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-7 text-lg sm:text-xl text-ink/60 max-w-xl leading-relaxed"
          >
            Müzik, resim ve dansla çocuklarınızın yaratıcılığını ortaya
            çıkarıyoruz. Sanatın her rengiyle büyüyen mutlu bireyler…
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => goTo("iletisim")}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-ink text-cream font-semibold text-base hover:bg-gold hover:text-ink transition-colors shadow-lg shadow-ink/15"
              data-testid="hero-cta-contact"
            >
              Bize Ulaşın
              <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => goTo("dersler")}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-ink font-semibold text-base border border-borderlight hover:border-gold transition-colors"
              data-testid="hero-cta-lessons"
            >
              Sanat Dallarını Keşfet
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
          data-testid="hero-image"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-ink/10 border-4 border-white">
            <motion.img
              src="/images/hero-drummer.jpg"
              alt="Bateri çalan çocuk"
              style={{ y: yImg, scale: scaleImg }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
            className="absolute -bottom-5 -left-5 bg-white rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3 border border-borderlight"
          >
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-butter text-gold">
              <Sparkles size={22} />
            </span>
            <div>
              <p className="font-display font-bold text-ink leading-none">İlk ders</p>
              <p className="text-sm text-ink/50">ücretsiz tanışma</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
