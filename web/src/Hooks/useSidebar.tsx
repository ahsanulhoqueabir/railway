import { SidebarContext } from "@/Components/ui/sidebar";
import React from "react";

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

export default useSidebar;

// export function SidebarProvider({ children }: { children: React.ReactNode }) {
//   const [isMobile, setIsMobile] = React.useState(false);
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
// }
