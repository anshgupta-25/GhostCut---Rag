import { ChevronLeft, ChevronRight } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { useSidebarState } from "@/hooks/useSidebarState";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { collapsed, toggle } = useSidebarState();

  return (
    <div className="min-h-screen w-full bg-background">
      <AppSidebar />

      {/* Divider + centered toggle */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex items-center transition-all duration-300",
          collapsed ? "left-16" : "left-64"
        )}
        style={{ width: 0 }}
      >
        {/* Vertical divider line */}
        <div className="absolute inset-y-0 w-px bg-border" />

        {/* Toggle button centered on divider */}
        <button
          onClick={toggle}
          className={cn(
            "relative -translate-x-1/2 flex items-center justify-center",
            "w-6 h-6 rounded-full",
            "bg-card border border-border",
            "text-muted-foreground hover:text-foreground hover:bg-accent",
            "shadow-sm hover:shadow-md",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-3.5 h-3.5" />
          ) : (
            <ChevronLeft className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <main
        className={cn(
          "min-h-screen overflow-auto scrollbar-thin transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
