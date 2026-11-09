/** Wordmark recreated from the brand icon (sanatolye-icon.png): Roman capitals + spaced sans subline. */
export const Logo = ({ className = "", light = false, size = "md" }) => {
  const big = size === "lg";
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-mark font-medium ${light ? "text-paper" : "text-ink"} ${
          big ? "text-[clamp(2.6rem,12vw,11rem)] tracking-[0.1em]" : "text-[1.32rem] tracking-[0.14em]"
        }`}
      >
        SANATÖLYE
      </span>
      <span
        className={`flex items-center gap-2 font-sans uppercase ${light ? "text-paper/70" : "text-ink/70"} ${
          big ? "mt-3 text-[clamp(.7rem,1.6vw,1.2rem)] tracking-[0.42em]" : "mt-1 text-[8px] tracking-[0.38em]"
        }`}
      >
        <span className={`h-px ${big ? "w-10" : "w-3"} bg-current`} />
        Sanat Akademisi
        <span className={`h-px ${big ? "w-10" : "w-3"} bg-current`} />
      </span>
    </span>
  );
};
