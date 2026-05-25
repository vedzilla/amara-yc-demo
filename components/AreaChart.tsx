type Series = { name: string; data: number[]; color: string };

type Props = {
  series: Series[];
  labels: string[];
  height?: number;
  yFormatter?: (v: number) => string;
};

export function AreaChart({ series, labels, height = 240, yFormatter = (v) => String(v) }: Props) {
  const width = 800;
  const padding = { top: 20, right: 32, bottom: 30, left: 44 };
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const all = series.flatMap((s) => s.data);
  const min = 0;
  const max = Math.max(...all) * 1.15;
  const stepX = innerW / (labels.length - 1 || 1);

  const yToPx = (v: number) => padding.top + innerH - ((v - min) / (max - min)) * innerH;
  const xToPx = (i: number) => padding.left + i * stepX;

  // Y axis grid (4 lines)
  const yTicks = [0, 1, 2, 3, 4].map((i) => min + ((max - min) * i) / 4);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="font-sans">
      <defs>
        {series.map((s, i) => (
          <linearGradient key={i} id={`grad-${i}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.42" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {/* Grid lines + Y labels */}
      {yTicks.map((tick, i) => {
        const y = yToPx(tick);
        return (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke="#1F1D38"
              strokeWidth="1"
              strokeDasharray="2,4"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              fill="#6A6A75"
              fontSize="10"
              textAnchor="end"
            >
              {yFormatter(tick)}
            </text>
          </g>
        );
      })}

      {/* X labels */}
      {labels.map((label, i) => (
        <text
          key={i}
          x={xToPx(i)}
          y={height - 10}
          fill="#6A6A75"
          fontSize="10"
          textAnchor="middle"
        >
          {label}
        </text>
      ))}

      {/* Series */}
      {series.map((s, i) => {
        const points = s.data.map((v, j) => [xToPx(j), yToPx(v)] as const);
        const pathD = points
          .map(([x, y], j) => `${j === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
          .join(" ");
        const areaD = `${pathD} L ${xToPx(s.data.length - 1)} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;
        return (
          <g key={i}>
            <path d={areaD} fill={`url(#grad-${i})`} />
            <path
              d={pathD}
              stroke={s.color}
              strokeWidth="2"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {points.map(([x, y], j) => (
              <circle key={j} cx={x} cy={y} r={j === points.length - 1 ? 4 : 0} fill={s.color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
