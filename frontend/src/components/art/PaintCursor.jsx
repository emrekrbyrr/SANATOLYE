import { useEffect, useRef } from "react";
import { prefersReducedMotion, isFinePointer } from "../../lib/gsap";

const COLORS = ["#D9472B", "#E3A33A", "#2A44B8", "#C93D78", "#5D8A6B"];

/**
 * A light paint trail behind the cursor (desktop) and a tiny splash on tap (touch).
 * The rAF loop only runs while there is paint to draw or fade, then stops.
 */
export const PaintCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const fine = isFinePointer();
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let idleFrames = 0;
    let last = null;
    let hue = 0;
    let splashes = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const loop = () => {
      // fade what was painted before
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.075)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "source-over";

      splashes = splashes.filter((s) => s.life > 0);
      splashes.forEach((s) => {
        s.life -= 1;
        s.r += (s.max - s.r) * 0.25;
        ctx.globalAlpha = Math.max(0, s.life / 40) * 0.55;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      idleFrames += 1;
      if (idleFrames < 70 || splashes.length) {
        raf = requestAnimationFrame(loop);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raf = 0;
      }
    };
    const kick = () => {
      idleFrames = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      const p = { x: e.clientX, y: e.clientY };
      if (last) {
        const dx = p.x - last.x;
        const dy = p.y - last.y;
        const speed = Math.hypot(dx, dy);
        if (speed > 1.5) {
          hue = (hue + speed * 0.004) % COLORS.length;
          ctx.strokeStyle = COLORS[Math.floor(hue)];
          ctx.globalAlpha = 0.32;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.lineWidth = Math.max(2, 14 - speed * 0.18);
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.quadraticCurveTo(last.x + dx * 0.5 + dy * 0.08, last.y + dy * 0.5 - dx * 0.08, p.x, p.y);
          ctx.stroke();
          // a thin bristle line for texture
          ctx.globalAlpha = 0.18;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(last.x + 3, last.y + 2);
          ctx.lineTo(p.x + 3, p.y + 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
          kick();
        }
      }
      last = p;
    };
    const onLeave = () => { last = null; };
    const onDown = (e) => {
      if (e.pointerType === "mouse") return;
      const base = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 6; i += 1) {
        const a = Math.random() * Math.PI * 2;
        const d = i === 0 ? 0 : 10 + Math.random() * 22;
        splashes.push({
          x: e.clientX + Math.cos(a) * d,
          y: e.clientY + Math.sin(a) * d,
          r: 0,
          max: i === 0 ? 14 : 2 + Math.random() * 5,
          c: base,
          life: 40,
        });
      }
      kick();
    };

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] h-full w-full mix-blend-multiply"
    />
  );
};
