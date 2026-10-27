"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="wrapper">
        <SearchBar onMenuClick={() => setIsSidebarOpen(true)} />
        {children}
      </div>
    </>
  );
}
