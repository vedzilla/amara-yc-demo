import { channels, type ChannelKey } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

type Props = {
  channel: ChannelKey;
  size?: "sm" | "md";
  className?: string;
};

export function ChannelBadge({ channel, size = "sm", className }: Props) {
  const c = channels[channel];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-line-dark bg-ink-raised/70 backdrop-blur",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-[12px]",
        className
      )}
      title={c.name}
    >
      <span
        className="inline-block rounded-sm"
        style={{
          width: size === "sm" ? 6 : 8,
          height: size === "sm" ? 6 : 8,
          backgroundColor: c.tone,
          boxShadow: `0 0 8px ${c.tone}66`,
        }}
      />
      <span className="text-cream/85 font-medium tracking-tight">{c.name}</span>
    </span>
  );
}

export function ChannelDot({ channel, size = 10 }: { channel: ChannelKey; size?: number }) {
  const c = channels[channel];
  return (
    <span
      className="inline-block rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: c.tone,
        boxShadow: `0 0 10px ${c.tone}88`,
      }}
      title={c.name}
    />
  );
}
