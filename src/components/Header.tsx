"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900">DocuFlow</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative max-w-sm">
            <Input
              type="search"
              placeholder="Search documents..."
              className="w-full bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
          
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-700">JD</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
