"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users, CheckSquare, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'Products', href: '/product', icon: Package },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="flex h-16 items-center px-6 border-b">
        <Zap className="h-6 w-6 text-indigo-600 fill-indigo-600" />
        <span className="ml-2 font-bold text-xl tracking-tight">FounderOps</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" 
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-indigo-600" : "text-zinc-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}