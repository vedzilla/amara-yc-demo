type Props = {
  leftLabel: string;
  rightLabel: string;
  leftPct: number;
  rightPct: number;
};

export function SplitBar({ leftLabel, rightLabel, leftPct, rightPct }: Props) {
  return (
    <div className="rounded-md overflow-hidden border border-line-dark flex h-11 text-[12px] font-medium">
      <div
        className="bg-violet flex items-center justify-between px-3.5 text-cream"
        style={{ flexBasis: `${leftPct}%` }}
      >
        <span className="tracking-tight">{leftLabel}</span>
        <span className="tabular-nums">{leftPct}%</span>
      </div>
      <div
        className="bg-ink-deep flex items-center justify-between px-3.5 text-cream"
        style={{ flexBasis: `${rightPct}%` }}
      >
        <span className="tabular-nums">{rightPct}%</span>
        <span className="tracking-tight">{rightLabel}</span>
      </div>
    </div>
  );
}
