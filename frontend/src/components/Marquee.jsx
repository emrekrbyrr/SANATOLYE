import { MARQUEE } from "../data/content";

export const Marquee = () => {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <section className="py-6 bg-ink overflow-hidden" data-testid="marquee-section">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-6 mx-6">
            <span className="font-display font-semibold text-2xl sm:text-3xl text-cream">
              {t}
            </span>
            <span className="text-gold text-2xl">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
