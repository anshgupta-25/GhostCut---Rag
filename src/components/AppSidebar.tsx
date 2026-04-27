import { FileText, Search, BarChart3, Sun, Moon } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useSidebarState } from "@/hooks/useSidebarState";
import { GhostCutLogo } from "@/components/GhostCutLogo";

const navItems = [
  { title: "Compression Studio", url: "/dashboard", icon: FileText },
  { title: "Retrieval Audit Lab", url: "/retrieval-audit", icon: Search },
  { title: "Intelligence Dashboard", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const { collapsed, toggle } = useSidebarState();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";
  const avatarUrl = user?.photoURL;
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-border bg-sidebar/95 backdrop-blur-xl shadow-elevated transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border shrink-0 overflow-hidden">
        <GhostCutLogo size={32} />
        {!collapsed && (
          <div className="animate-fade-in min-w-0">
            <h1 className="text-sm font-bold text-foreground tracking-tight whitespace-nowrap">
              GHOST<span className="text-primary">CUT</span>
            </h1>
            <p className="text-[10px] text-muted-foreground font-mono tracking-wider truncate">
              Where Evidence Meets Intelligence
            </p>
          </div>
        )}
      </div>

      {/* Toggle collapse button */}
      <button
        onClick={toggle}
        className="absolute top-5 right-3 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {collapsed
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          }
        </svg>
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/dashboard"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 whitespace-nowrap overflow-hidden"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground shadow-glow"
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {!collapsed && <span className="animate-fade-in truncate">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border shrink-0 overflow-hidden">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2.5 text-sidebar-foreground hover:bg-sidebar-accent transition-colors overflow-hidden",
            collapsed && "justify-center"
          )}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 shrink-0 text-warning" />
          ) : (
            <Moon className="w-4 h-4 shrink-0 text-primary" />
          )}
          {!collapsed && (
            <span className="text-xs animate-fade-in whitespace-nowrap">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* User avatar */}
        {user && (
          <NavLink
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent transition-colors overflow-hidden"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover border border-border shrink-0" />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15 text-primary text-xs font-semibold shrink-0">
                {initials}
              </div>
            )}
            {!collapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <p className="text-xs font-medium text-foreground truncate">{displayName}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </NavLink>
        )}
      </div>
    </aside>
  );
}
