"use client"

import { Search } from "lucide-react"; // Removed Bell and Plus
import { Input } from "@/components/ui/input"; // Removed Button
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative w-full max-w-96 hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
      <Input 
        placeholder="Search ecosystem..." 
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('q')?.toString()}
        className="bg-white/5 border-white/5 pl-10 focus-visible:ring-indigo-500/50 text-zinc-200 h-9"
      />
    </div>
  );
}

export function Header() {
  return (
    <header className="h-16 border-b border-white/5 bg-[#09090b]/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      {/* We wrap Search in Suspense because useSearchParams() requires it in Next.js 15+ Client Components */}
      <Suspense fallback={<div className="w-96 h-9 bg-white/5 rounded-md animate-pulse" />}>
        <SearchInput />
      </Suspense>

      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 border border-white/10" />
        <span className="text-xs font-medium text-zinc-400 hidden sm:inline">Admin</span>
      </div>
    </header>
  );
}