"use client";
import { usePathname } from "next/navigation";
import { Bell, Search, ChevronRight } from "lucide-react";
import Link from "next/link";

const labels: Record<string, string> = {
  "/": "Mission Control",
  "/approvals": "Approvals",
  "/brain": "Brain",
  "/agents": "Subagents",
  "/clients": "Clients",
  "/reports": "Reports",
  "/onboarding": "Onboard new client",
};

export function TopBar() {
  const path = usePathname();
  const top = labels[path] ?? (path.startsWith("/clients/") ? "Clients" : "");
  const segments = path.split("/").filter(Boolean);
  const isDetail = path.startsWith("/clients/") && segments.length > 1;

  return (
    <header className="sticky top-0 z-20 h-[60px] border-b border-line-dark bg-ink-deep/70 backdrop-blur-xl">
      <div className="h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-2 text-[13px]">
          <Link href="/" className="text-dim hover:text-cream transition-colors">
            Pulse Digital
          </Link>
          <ChevronRight size={12} className="text-dim/50" />
          {isDetail ? (
            <>
              <Link href="/clients" className="text-dim hover:text-cream transition-colors">
                Clients
              </Link>
              <ChevronRight size={12} className="text-dim/50" />
              <span className="text-cream">{decodeURIComponent(segments[1]).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
            </>
          ) : (
            <span className="text-cream">{top}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-line-dark bg-ink-raised/60 hover:bg-ink-raised cursor-pointer">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-violet animate-ping-soft" />
              <span className="relative rounded-full bg-violet h-2 w-2" />
            </span>
            <span className="text-[12px] text-cream/85 tabular-nums">
              <span className="text-violet-bright font-medium">9</span>
              <span className="text-dim ml-1">subagents working</span>
            </span>
          </div>

          <button className="h-8 w-8 rounded-md border border-line-dark bg-ink-raised/60 hover:bg-ink-raised flex items-center justify-center text-dim hover:text-cream transition-colors">
            <Search size={14} />
          </button>
          <button className="relative h-8 w-8 rounded-md border border-line-dark bg-ink-raised/60 hover:bg-ink-raised flex items-center justify-center text-dim hover:text-cream transition-colors">
            <Bell size={14} />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-violet" />
          </button>

          <div className="ml-2 pl-3 border-l border-line-dark flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-bright to-violet flex items-center justify-center text-cream text-[11px] font-medium">
              VK
            </div>
            <span className="text-[13px] text-cream/85">Vedaant</span>
          </div>
        </div>
      </div>
    </header>
  );
}
