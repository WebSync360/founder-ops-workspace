"use client"

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* Mobile Trigger */}
      <div className="lg:pl-64 flex flex-col flex-1 w-full">
        <header className="h-16 flex items-center gap-4 border-b border-white/5 px-6 lg:hidden bg-[#09090b]">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-zinc-400">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-black border-r border-white/10">
              <Sidebar onNavClick={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-bold text-white text-sm">FounderOps</span>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0c0c0e] lg:ml-64 p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}