type Props = {
  size?: number;
  className?: string;
};

export function TriangleMark({ size = 22, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M5 27 L5 5 L27 27 Z" fill="#6F5BFF" />
      <line x1="3" y1="29" x2="29" y2="29" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export function AmaraWordmark({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-2 " + (className ?? "")}>
      <TriangleMark size={20} />
      <span className="text-cream text-lg font-medium tracking-tight">Amara</span>
    </div>
  );
}
