"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CircleCheckBig,
  Users,
  Bot,
  BarChart3,
  Plus,
  Settings,
  Brain,
} from "lucide-react";
import { TriangleMark } from "./TriangleMark";
import { agencyStats } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/", label: "Mission Control", icon: LayoutDashboard },
  { href: "/approvals", label: "Approvals", icon: CircleCheckBig, badge: agencyStats.approvalsWaiting },
  { href: "/brain", label: "Brain", icon: Brain },
  { href: "/agents", label: "Subagents", icon: Bot },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-[244px] border-r border-line-dark bg-ink-deep/80 backdrop-blur-xl flex flex-col">
      <div className="px-5 pt-6 pb-5 border-b border-line-dark">
        <Link href="/" className="flex items-center gap-2.5 text-cream/85">
          <TriangleMark size={22} />
          <span className="font-italic-serif text-[22px] leading-none" style={{ paddingTop: 2 }}>
            Amara
          </span>
        </Link>
        <div className="mt-2 small-caps tracking-wider text-dim/85 pl-[34px] text-[10px]">
          Agency operating layer
        </div>
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="label-micro text-dim px-3 mb-2">Workspace</div>
        <ul className="space-y-0.5">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = path === item.href || (item.href !== "/" && path.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-md px-3 py-2 text-[14px] transition-colors",
                    active
                      ? "bg-violet/12 text-cream"
                      : "text-cream/70 hover:bg-ink-raised hover:text-cream"
                  )}
                >
                  <Icon
                    size={16}
                    className={cn(
                      "transition-colors",
                      active ? "text-violet-bright" : "text-dim group-hover:text-cream/80"
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                        active
                          ? "bg-violet text-cream"
                          : "bg-violet/20 text-violet-bright group-hover:bg-violet/30"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute left-0 h-5 w-[2px] bg-violet -translate-x-3 rounded-r" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="label-micro text-dim px-3 mt-7 mb-2">Quick action</div>
        <Link
          href="/onboarding"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-[14px] text-cream/70 hover:bg-ink-raised hover:text-cream group"
        >
          <Plus size={16} className="text-dim group-hover:text-violet-bright transition-colors" />
          <span>Onboard client</span>
        </Link>
      </nav>

      <div className="border-t border-line-dark p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-violet to-violet-deep flex items-center justify-center text-cream font-medium text-sm">
            P
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] text-cream font-medium truncate">{agencyStats.name}</div>
            <div className="text-[11px] text-dim truncate">{agencyStats.location}</div>
          </div>
          <Settings size={14} className="text-dim hover:text-cream cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}
