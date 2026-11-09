import { useRef } from "react";
import { gsap, prefersReducedMotion, isFinePointer } from "../../lib/gsap";

/**
 * Splits text into letters; each letter does a small hand-made "hop" when the
 * pointer passes over it. Screen readers get the plain text via aria-label.
 */
export const Wobble = ({ children, className = "", as: Tag = "span" }) => {
  const ref = useRef(null);
  const text = String(children);

  const onOver = (e) => {
    const el = e.target;
    if (!el.dataset || el.dataset.l === undefined) return;
    if (prefersReducedMotion() || !isFinePointer()) return;
    if (gsap.isTweening(el)) return;
    gsap.fromTo(
      el,
      { y: 0, rotate: 0 },
      {
        y: "-0.14em",
        rotate: gsap.utils.random(-9, 9),
        duration: 0.16,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => gsap.set(el, { clearProps: "transform" }),
      }
    );
  };

  return (
    <Tag ref={ref} className={className} aria-label={text} onPointerOver={onOver}>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => (
            <span key={ci} data-l="" className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
          {wi < arr.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
};
