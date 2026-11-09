/** Global SVG filters & gradients shared by all hand-made artwork. */
export const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
    <defs>
      {/* Hand-painted edge: slightly torn, bristly outline */}
      <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
      </filter>
      <filter id="roughStrong" x="-15%" y="-15%" width="130%" height="130%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="4" seed="8" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="16" result="d" />
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" result="g" />
        <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.4" result="ga" />
        <feComposite in="d" in2="ga" operator="in" />
      </filter>
    </defs>
  </svg>
);
