export const isHome = () => window.location.pathname === "/" || window.location.pathname === "";

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    // e.g. clicked "Galeri" on a course page → open that section on the home page
    window.location.href = id === "anasayfa" ? "/" : `/#${id}`;
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const y = el.getBoundingClientRect().top + window.scrollY - (id === "anasayfa" ? 0 : 70);
  window.scrollTo({ top: Math.max(0, y), behavior: reduce ? "auto" : "smooth" });
};
