/**
 * The opening film's artwork: one 1000×1000 "canvas" — blank canvas, painting, music, logo.
 * Pure markup — Hero.jsx drives it with a GSAP timeline.
 */
export const P = {
  sweep: "M90 560 C 240 470 400 610 540 530 S 800 430 920 500",
  hill1: "M110 690 Q 300 560 490 680 T 880 670",
  hill2: "M140 770 Q 370 650 600 770 T 900 750",
  staff: (y) => `M120 ${y} C 360 ${y - 18} 640 ${y + 18} 880 ${y}`,
  orbit: [
    "M190 300 C 270 190 380 140 500 138 C 620 136 720 180 790 250",
    "M842 380 C 880 470 872 580 830 660 C 800 720 760 770 700 806",
    "M640 878 C 560 900 440 900 360 870 C 300 850 250 818 210 776",
    "M140 640 C 110 560 108 460 130 380 C 140 340 160 300 186 266",
    "M300 196 C 380 150 470 132 560 140 C 650 148 730 180 800 236",
  ],
  enso: "M500 168 C 700 166 834 304 832 500 C 830 698 690 834 500 832 C 306 830 168 690 170 500 C 172 344 270 216 430 176",
  blob: [
    "M0-58C32-60 60-34 56 0 52 30 30 56-2 54-34 52-58 28-56-4-54-34-30-56 0-58Z",
    "M-6-50C24-64 62-40 58-6 55 22 64 46 30 54 0 61-30 60-48 38-64 18-56-12-44-30-34-44-20-44-6-50Z",
    "M4-44C30-52 52-30 50-4 48 20 58 44 28 50 4 55-24 58-42 38-56 22-50-6-40-24-28-42-14-38 4-44Z",
  ],
};

const STAFF_Y = [380, 410, 440, 470, 500];

const BLOBS = [
  { x: 205, y: 300, s: 1.35, c: "#2A44B8", b: 0, to: [178, 318] },
  { x: 845, y: 470, s: 1.05, c: "#E3A33A", b: 1, to: [812, 282] },
  { x: 735, y: 735, s: 1.25, c: "#C93D78", b: 2, to: [790, 760] },
  { x: 265, y: 745, s: 0.9, c: "#5D8A6B", b: 1, to: [214, 728] },
  { x: 520, y: 190, s: 0.6, c: "#D9472B", b: 2, to: [500, 132] },
];

const NOTES = [
  [330, 470], [420, 440], [510, 410], [600, 455], [690, 395], [790, 425],
];

const WHITE_KEYS = 14;
const KEY_W = 50;
const BLACK_AFTER = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];

const rays = Array.from({ length: 9 }, (_, i) => {
  const a = (i / 9) * Math.PI * 2 - Math.PI / 2;
  const c = [770, 232];
  return `M${(c[0] + Math.cos(a) * 80).toFixed(1)} ${(c[1] + Math.sin(a) * 80).toFixed(1)} L${(
    c[0] + Math.cos(a) * 112
  ).toFixed(1)} ${(c[1] + Math.sin(a) * 112).toFixed(1)}`;
});

const wave = (() => {
  let d = "M120 600";
  for (let x = 120; x < 880; x += 40) d += ` Q ${x + 20} ${x % 80 === 40 ? 570 : 630} ${x + 40} 600`;
  return d;
})();

export const IntroStage = () => (
  <svg
    viewBox="0 0 1000 1000"
    className="s-svg h-[min(94vw,88svh)] w-[min(94vw,88svh)] overflow-visible"
    aria-hidden="true"
  >
    {/* ---------- Scene 1 — blank canvas, first stroke, splashes ---------- */}
    <circle className="s-dot" cx="500" cy="500" r="16" fill="#E3A33A" />

    <g className="s-sweep rough-strong" fill="none" strokeLinecap="round">
      <path d={P.sweep} stroke="#D9472B" strokeWidth="64" />
      <path d={P.sweep} stroke="#A8321C" strokeWidth="9" opacity=".55" transform="translate(0 -24)" />
      <path d={P.sweep} stroke="#EE7B5F" strokeWidth="7" opacity=".8" transform="translate(4 22)" />
      <path d={P.sweep} stroke="#D9472B" strokeWidth="3" transform="translate(8 36)" />
    </g>

    <g className="s-blobs">
      {BLOBS.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y})`}>
          <g className="s-blob" data-tx={b.to[0] - b.x} data-ty={b.to[1] - b.y}>
            <path d={P.blob[b.b]} transform={`scale(${b.s})`} fill={b.c} className="rough" />
            <circle cx={b.s * 74} cy={-b.s * 30} r="7" fill={b.c} />
            <circle cx={-b.s * 70} cy={b.s * 40} r="4.5" fill={b.c} />
            <circle cx={b.s * 50} cy={b.s * 66} r="3.5" fill={b.c} />
            <path className="s-drip" d={`M${-b.s * 12} ${b.s * 44} V ${b.s * 44 + 70}`} stroke={b.c} strokeWidth="11" strokeLinecap="round" />
          </g>
        </g>
      ))}
    </g>

    {/* ---------- Scene 2 — a child's painting ---------- */}
    <g className="s-paint rough" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle className="s-sun" cx="770" cy="232" r="58" stroke="#E3A33A" strokeWidth="13" />
      <path className="s-spiral" d="M770 232 m-4 0 a6 6 0 1 1 10 4 a16 16 0 1 1 -24 -10 a28 28 0 1 1 38 24" stroke="#D9472B" strokeWidth="6" />
      <g className="s-rays" stroke="#E3A33A" strokeWidth="10">
        {rays.map((d) => <path key={d} d={d} />)}
      </g>
      <path className="s-bird" d="M430 300 q 22 -22 44 0 q 22 -22 44 0" stroke="#2B231D" strokeWidth="6" />
      <g className="s-flower">
        <path d="M330 690 C 322 640 336 600 334 560" stroke="#5D8A6B" strokeWidth="8" />
        {[0, 72, 144, 216, 288].map((a) => (
          <circle
            key={a}
            className="s-petal"
            cx={334 + Math.cos((a * Math.PI) / 180) * 19}
            cy={540 + Math.sin((a * Math.PI) / 180) * 19}
            r="14"
            fill="#C93D78"
            stroke="none"
          />
        ))}
        <circle className="s-petal" cx="334" cy="540" r="9" fill="#E3A33A" stroke="none" />
      </g>
      <g className="s-kid" stroke="#2B231D" strokeWidth="8">
        <circle cx="620" cy="556" r="24" />
        <path d="M620 580 V 652" />
        <path d="M584 572 L620 610 L656 572" />
        <path d="M620 652 L596 700 M620 652 L644 700" />
      </g>
      <text className="s-cap s-cap-resim" x="140" y="210" fill="#D9472B" fontFamily="Caveat" fontSize="68" fontWeight="700" transform="rotate(-8 140 210)" stroke="none">
        resim
      </text>
    </g>

    {/* Hills of the painting — they will morph into the musical staff */}
    <g fill="none" strokeLinecap="round" className="rough">
      <path className="s-hill s-hill1" d={P.hill1} style={{ stroke: "#5D8A6B" }} strokeWidth="14" />
      <path className="s-hill s-hill2" d={P.hill2} style={{ stroke: "#5D8A6B" }} strokeWidth="14" />
      {STAFF_Y.map((y, i) => (
        <path key={y} className={`s-staff s-staff-${i}`} d={P.staff(y)} style={{ stroke: "#2A44B8" }} strokeWidth="5" />
      ))}
    </g>

    {/* ---------- Scene 3 — music ---------- */}
    <g className="s-music">
      <path
        className="s-clef"
        d="M206 530 C 176 480 226 440 246 478 C 266 516 196 546 188 486 C 178 414 262 366 250 330 C 240 300 218 318 224 360 L 244 560 C 248 592 214 596 210 570"
        fill="none"
        stroke="#16246B"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {NOTES.map(([x, y], i) => (
        <g key={i} className="s-note" data-i={i}>
          <ellipse cx={x} cy={y} rx="15" ry="11" transform={`rotate(-20 ${x} ${y})`} fill={i % 3 === 1 ? "#D9472B" : "#2A44B8"} />
          <path d={`M${x + 13} ${y - 4} V ${y - 82}`} stroke={i % 3 === 1 ? "#D9472B" : "#2A44B8"} strokeWidth="5" strokeLinecap="round" />
          {i % 2 === 0 && <path d={`M${x + 13} ${y - 82} q 24 12 24 38`} fill="none" stroke={i % 3 === 1 ? "#D9472B" : "#2A44B8"} strokeWidth="5" strokeLinecap="round" />}
        </g>
      ))}
      <path className="s-wave" d={wave} fill="none" stroke="#E3A33A" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(150 650)">
      <g className="s-piano">
        {Array.from({ length: WHITE_KEYS }, (_, i) => (
          <rect key={i} className="s-key" x={i * KEY_W} y="0" width={KEY_W - 3} height="200" rx="7" fill="#FBF7F1" stroke="#2B231D" strokeWidth="3" />
        ))}
        {BLACK_AFTER.map((i) => (
          <rect key={`b${i}`} className="s-bkey" x={i * KEY_W + KEY_W - 17} y="0" width="30" height="118" rx="5" fill="#2B231D" />
        ))}
      </g>
      </g>
      <text className="s-cap s-cap-muzik" x="700" y="320" fill="#2A44B8" fontFamily="Caveat" fontSize="68" fontWeight="700" transform="rotate(6 700 320)">
        müzik
      </text>
    </g>

    {/* ---------- Scene 4 — everything becomes one ---------- */}
    <path className="s-enso rough-strong" d={P.enso} fill="none" stroke="#D9472B" strokeWidth="26" strokeLinecap="round" />
  </svg>
);
