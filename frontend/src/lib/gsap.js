import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin, SplitText);
gsap.defaults({ ease: "power3.out" });

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Runs `setup` inside a gsap.context scoped to `ref` and reverts everything
 * (tweens, ScrollTriggers, SplitTexts) on unmount.
 */
export const useGsap = (ref, setup, deps = []) => {
  useIsoLayoutEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context((self) => setup(self), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export { gsap, ScrollTrigger, SplitText };
