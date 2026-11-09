// Runs after `craco build`. For every course page it writes build/<slug>/index.html with its own
// <title>, meta description, Open Graph tags, canonical URL, JSON-LD (Course, BreadcrumbList,
// FAQPage) and a plain-HTML copy of the page text inside #root, so search engines get the full
// page without running JavaScript. React replaces that text with the real page on load.
// It also writes build/sitemap.xml with every URL.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const BUILD = path.resolve(ROOT, process.env.BUILD_PATH || "build");
const SITE = "https://sanatolye.com.tr";
const TODAY = new Date().toISOString().slice(0, 10);

// src/ files use ESM syntax in .js files; load them through temporary .mjs copies
const load = async (rel) => {
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "prerender-")), path.basename(rel, ".js") + ".mjs");
  fs.copyFileSync(path.join(ROOT, rel), tmp);
  return import(pathToFileURL(tmp).href);
};
const { SCHOOL, LESSONS, STEPS } = await load("src/data/content.js");
const { COURSES, commonFaq } = await load("src/data/courses.js");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${key} not found in index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
};

const template = fs.readFileSync(path.join(BUILD, "index.html"), "utf8");

for (const c of COURSES) {
  const url = `${SITE}/${c.slug}`;
  const lessons = c.lessons.map((id) => LESSONS.find((l) => l.id === id)).filter(Boolean);
  const faq = [...c.faq, ...commonFaq(c, SCHOOL)];
  const branchName = c.branch === "muzik" ? "Müzik" : "Resim";

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: c.h1,
      description: c.description,
      url,
      inLanguage: "tr",
      provider: { "@type": "EducationalOrganization", name: "SANATÖLYE Sanat Akademisi", sameAs: SITE + "/" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: branchName, item: SITE + "/#dersler" },
        { "@type": "ListItem", position: 3, name: c.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const body = `
<div style="max-width:820px;margin:0 auto;padding:110px 20px 60px;font-family:Jost,system-ui,sans-serif;color:#2B231D;line-height:1.6">
<nav aria-label="Konum"><a href="/">Anasayfa</a> › <a href="/#dersler">${branchName}</a> › ${esc(c.name)}</nav>
<h1>${esc(c.h1)}</h1>
<p>${esc(c.lead)}</p>
<p><a href="tel:${SCHOOL.phoneHref}">${esc(SCHOOL.phone)}</a> · İlk deneme dersi ücretsiz · Silivri, İstanbul</p>
<h2>Silivri'de çocuklar için ${esc(c.name.toLocaleLowerCase("tr"))} ${c.branch === "resim" ? "kursu" : "dersleri"}</h2>
${c.intro.map((p) => `<p>${esc(p)}</p>`).join("\n")}
${lessons
  .map(
    (l) => `<h3>${esc(l.name)}</h3><p>${esc(l.desc)}</p><ul>${l.skills.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`
  )
  .join("\n")}
<h2>Nasıl başlarım?</h2>
<ol>${STEPS.map((s) => `<li><strong>${esc(s.title)}</strong> — ${esc(s.text)}</li>`).join("")}</ol>
<h2>${esc(c.name)} kursu hakkında sık sorulanlar</h2>
${faq.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("\n")}
<h2>Diğer kurslarımız</h2>
<ul>${COURSES.filter((o) => o.slug !== c.slug).map((o) => `<li><a href="/${o.slug}">${esc(o.h1)}</a></li>`).join("")}</ul>
<p>${esc(SCHOOL.address)} · ${esc(SCHOOL.hours)}</p>
</div>`;

  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(c.title)}</title>`);
  html = setMeta(html, "name", "description", c.description);
  html = setMeta(html, "property", "og:title", c.title);
  html = setMeta(html, "property", "og:description", c.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", c.title);
  html = setMeta(html, "name", "twitter:description", c.description);
  html = html.replace(
    "</head>",
    `<link rel="canonical" href="${url}"/>` +
      ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("") +
      "</head>"
  );
  if (!html.includes('<div id="root"></div>')) throw new Error("#root not found in index.html");
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  fs.mkdirSync(path.join(BUILD, c.slug), { recursive: true });
  fs.writeFileSync(path.join(BUILD, c.slug, "index.html"), html);
}

const urls = ["/", ...COURSES.map((c) => `/${c.slug}`)];
fs.writeFileSync(
  path.join(BUILD, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${SITE}${u}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>`).join("\n")}
</urlset>
`
);
console.log(`prerender: ${COURSES.length} kurs sayfası + sitemap.xml (${urls.length} URL) → ${path.relative(ROOT, BUILD)}`);
