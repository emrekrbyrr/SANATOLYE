export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = el.getBoundingClientRect().top + window.scrollY - (id === "anasayfa" ? 0 : 70);
  window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
};
