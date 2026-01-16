"use client"

import { useState } from "react";
import { Sidebar } from "./Sidebar"; 
import { Header } from "./header";   
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black overflow-hidden text-zinc-200">
      {/* 1. Desktop Sidebar - Fixed on the left */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-50">
        <Sidebar />
      </div>

      {/* 2. Main Wrapper */}
      <div className="lg:pl-64 flex flex-col flex-1 w-full min-w-0">
        
        {/* THE HEADER: This solves the 'unused' error */}
        <Header />

        {/* 3. Mobile Navigation Bar (Only visible on small screens) */}
        <div className="lg:hidden flex items-center px-6 h-16 border-b border-white/5 bg-[#09090b]">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-zinc-400 p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-black border-r border-white/10">
              {/* Passing the close function to the sidebar */}
              <Sidebar onNavClick={() => setIsOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="ml-4 font-bold text-white text-sm tracking-tight uppercase">FounderOps</span>
        </div>

        {/* 4. Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#0c0c0e] custom-scrollbar">
          <div className="max-w-7xl mx-auto p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}