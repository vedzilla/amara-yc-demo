import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  label?: string;
  className?: string;
  pulse?: boolean;
};

export function AmaraOrb({ size = 80, label, className, pulse = true }: Props) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          pulse && "animate-orb-glow"
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #A89BFF 0%, #6F5BFF 38%, #4632B0 75%, #1A1240 100%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          inset: size * 0.15,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.65), rgba(255,255,255,0) 55%)",
          mixBlendMode: "screen",
        }}
      />
      {label && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <span className="text-cream font-medium" style={{ fontSize: size * 0.16 }}>
            {label}
          </span>
          <span className="text-cream/70 label-micro mt-1" style={{ fontSize: size * 0.07 }}>
            Master Agent
          </span>
        </div>
      )}
    </div>
  );
}
