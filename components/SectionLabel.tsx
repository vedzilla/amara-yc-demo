import { cn } from "@/lib/cn";

type Props = {
  number?: string;
  label: string;
  className?: string;
};

export function SectionLabel({ number, label, className }: Props) {
  return (
    <div className={cn("flex items-center gap-3 label-micro", className)}>
      {number && (
        <>
          <span className="text-violet">{number}</span>
          <span className="text-dim">—</span>
        </>
      )}
      <span className="text-dim">{label}</span>
    </div>
  );
}

export function PageHeader({
  number,
  label,
  title,
  italicTitle,
  trailingTitle,
  subtitle,
  actions,
}: {
  number?: string;
  label: string;
  title: string;
  italicTitle?: string;
  trailingTitle?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="flex items-end justify-between gap-8 border-b border-line-dark pb-8 mb-8">
      <div>
        <SectionLabel number={number} label={label} className="mb-4" />
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-cream leading-[1.05]">
          {title}{" "}
          {italicTitle && (
            <span className="font-italic-serif text-violet-tint">{italicTitle}</span>
          )}
          {trailingTitle && (
            <span>
              {italicTitle ? " " : ""}{trailingTitle}
            </span>
          )}
        </h1>
        {subtitle && (
          <p className="text-dim mt-4 max-w-2xl text-[15px] leading-relaxed">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
