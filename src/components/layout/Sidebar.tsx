"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, ShieldCheck, Settings, 
  Activity, X, Zap, ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navigation = [
  {
    group: "General",
    items: [
      { name: "Overview", href: "/overview", icon: LayoutDashboard },
      { name: "Users", href: "/users", icon: Users },
    ]
  },
  {
    group: "System",
    items: [
      { name: "Product", href: "/product", icon: ShieldCheck },
      { name: "Tasks", href: "/tasks", icon: Activity },
    ]
  },
  {
    group: "Config",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  },
];

export function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col bg-[#09090b] border-r border-white/5 overflow-hidden">
      
      {/* 1. Brand Logo - Elevated with a Gradient Glow */}
      <div className="flex h-20 items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-indigo-500/20 blur opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 shadow-2xl">
              <Zap className="h-5 w-5 text-indigo-500 fill-indigo-500" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white uppercase">Founder<span className="text-indigo-500">Ops</span></span>
            <span className="text-[10px] font-medium text-zinc-500">v1.0.4 - PRO</span>
          </div>
        </div>
        <button onClick={onNavClick} className="lg:hidden text-zinc-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* 2. Navigation Area */}
      <nav className="flex-1 px-4 space-y-8 mt-6 overflow-y-auto scrollbar-none">
        {navigation.map((section) => (
          <div key={section.group} className="space-y-2">
            <p className="px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
              {section.group}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onNavClick}
                    className={cn(
                      "group relative flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-white `bg-white/3` shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-white/2"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-pill"
                        className="absolute left-0 `w-0.5` h-5 bg-indigo-500 rounded-r-full"
                      />
                    )}
                    <item.icon className={cn(
                      "h-4 w-4 transition-colors",
                      isActive ? "text-indigo-400" : "group-hover:text-zinc-300"
                    )} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && <ChevronRight className="h-3 w-3 text-zinc-600" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. Footer Section - User Profile */}
      <div className="mt-auto p-4 border-t border-white/5 bg-zinc-950/50">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/2 transition-all cursor-pointer group">
          <div className="h-9 w-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
            DB
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs font-semibold text-zinc-200 truncate">DevBlaze</span>
            <span className="text-[10px] text-zinc-500 truncate">Senior Engineer</span>
          </div>
          <Settings size={14} className="text-zinc-600 group-hover:rotate-90 transition-transform duration-500" />
        </div>
      </div>
    </aside>
  );
}