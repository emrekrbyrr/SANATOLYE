import { MARQUEE } from "../data/content";

const Doodle = ({ i }) => {
  const k = i % 3;
  if (k === 0)
    return (
      <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true">
        <ellipse cx="9" cy="27" rx="8" ry="6" transform="rotate(-20 9 27)" fill="currentColor" />
        <path d="M16 25 V3 q 10 5 11 14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  if (k === 1)
    return (
      <svg width="34" height="30" viewBox="0 0 34 30" aria-hidden="true">
        <path d="M17 2C26 1 33 9 32 17c-1 8-9 12-16 11C8 27 1 22 2 14 3 7 9 3 17 2Z" fill="currentColor" />
      </svg>
    );
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
      <path d="M17 2 L20 14 L32 17 L20 20 L17 32 L14 20 L2 17 L14 14Z" fill="currentColor" />
    </svg>
  );
};

const Row = ({ items, color, hidden }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {items.map((m, i) => (
      <span key={i} className="flex items-center">
        <span className="whitespace-nowrap px-7 font-display text-[clamp(1.7rem,3.4vw,2.8rem)] italic tracking-tight">{m}</span>
        <span className={color}>
          <Doodle i={i} />
        </span>
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <section className="relative z-10 -my-6 overflow-hidden py-10" aria-label="SANATÖLYE" data-testid="marquee">
    <div className="relative -rotate-[2.2deg] bg-ink py-4 text-paper shadow-[0_18px_40px_-24px_rgba(43,35,29,.7)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row items={MARQUEE} color="text-ochre" />
        <Row items={MARQUEE} color="text-ochre" hidden />
      </div>
    </div>
    <div className="absolute inset-x-0 top-1/2 -z-10 rotate-[1.6deg] bg-cad py-3 text-paper/0 opacity-90">.</div>
  </section>
);
