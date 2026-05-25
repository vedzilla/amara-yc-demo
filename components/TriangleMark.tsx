type Props = {
  size?: number;
  className?: string;
};

// The Amara mark. Editorial / atelier feel — not a tech logo.
// A printer's pennant: thin tall rectangle with a notched flag,
// in vermilion, rendered like a wax-stamped masthead device.
export function TriangleMark({ size = 22, className }: Props) {
  const w = size;
  const h = size;
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Vertical staff / column rule */}
      <line x1="6.5" y1="4" x2="6.5" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Pennant flag — chevron notch on the right */}
      <path
        d="M6.5 5 L26 5 L21 11 L26 17 L6.5 17 Z"
        fill="#C95436"
      />
      {/* Hairline cross-mark at base — like a print register */}
      <line x1="3" y1="29" x2="13" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

// Wordmark — italic Fraunces, set tight, with a thin vermilion underline rule.
// Looks like a magazine masthead, not a tech logo.
export function AmaraWordmark({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-2.5 " + (className ?? "")}>
      <TriangleMark size={20} />
      <span
        className="text-cream text-[19px] font-italic-serif leading-none tracking-tight"
        style={{ paddingTop: 2 }}
      >
        Amara
      </span>
    </div>
  );
}
