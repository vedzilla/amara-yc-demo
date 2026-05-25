import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  label?: string;
  className?: string;
  pulse?: boolean;
};

// Amara mark — rendered as a pressed wax seal, not a glossy AI orb.
// Vermilion ground, slightly textured, with an embossed inner ring
// and a hairline outer rule. Editorial / atelier / postmark feel.
export function AmaraOrb({ size = 80, label, className, pulse = true }: Props) {
  const ringInset = size * 0.08;
  const innerInset = size * 0.18;
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer glow — only when pulsing */}
      {pulse && (
        <div
          className="absolute inset-0 rounded-full animate-orb-glow"
          style={{ background: "transparent" }}
        />
      )}

      {/* Wax base — radial vermilion with slight irregularity */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #E89878 0%, #C95436 32%, #8B3520 78%, #401607 100%)",
        }}
      />

      {/* Embossed inner ring — slightly darker */}
      <div
        className="absolute rounded-full"
        style={{
          inset: ringInset,
          boxShadow:
            "inset 0 0 0 1px rgba(64, 22, 7, 0.55), inset 0 2px 4px rgba(0,0,0,0.35)",
        }}
      />

      {/* Inner pressed disc */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          inset: innerInset,
          background:
            "radial-gradient(circle at 40% 30%, #C95436 0%, #A33E1F 65%, #6a2812 100%)",
          boxShadow:
            "inset 0 1px 2px rgba(255, 200, 160, 0.18), inset 0 -1px 3px rgba(0,0,0,0.4)",
        }}
      >
        {/* Subtle specular highlight, like wax catching light */}
        <div
          className="absolute"
          style={{
            top: "8%",
            left: "18%",
            width: "42%",
            height: "26%",
            background:
              "radial-gradient(ellipse at center, rgba(255, 230, 200, 0.5), transparent 70%)",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Mark in centre — italic "A" pressed into the wax */}
      {!label && size >= 24 && (
        <span
          aria-hidden
          className="relative font-italic-serif text-cream/95 leading-none select-none"
          style={{
            fontSize: size * 0.42,
            textShadow: "0 1px 1px rgba(0,0,0,0.45), 0 -1px 0 rgba(255,200,160,0.25)",
            paddingTop: size * 0.02,
            paddingRight: size * 0.04,
          }}
        >
          A
        </span>
      )}

      {label && (
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <span
            className="text-cream font-italic-serif"
            style={{
              fontSize: size * 0.32,
              textShadow: "0 1px 1px rgba(0,0,0,0.4)",
            }}
          >
            {label}
          </span>
          <span
            className="text-cream/75 small-caps tracking-wider mt-0.5"
            style={{ fontSize: size * 0.07 }}
          >
            Master Agent
          </span>
        </div>
      )}
    </div>
  );
}
