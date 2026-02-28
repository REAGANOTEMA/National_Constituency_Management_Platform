import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ncmpLogo from "@/assets/ncmp-logo.png";
import {
  LayoutDashboard, Users, FolderKanban, Heart, Megaphone,
  BarChart3, Settings, MapPin, Building2, FileText, Bell,
  ChevronLeft, ChevronRight, LogOut, Shield, UserCircle, ClipboardList,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navConfig = {
  super_admin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "All Constituencies", href: "/constituencies", icon: MapPin },
    { label: "MP Profiles", href: "/mp-profiles", icon: Users },
    { label: "Citizen Requests", href: "/requests", icon: ClipboardList },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Beneficiaries", href: "/beneficiaries", icon: Heart },
    { label: "Communication", href: "/communication", icon: Megaphone },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "User Management", href: "/users", icon: Shield },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  mp: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Profile", href: "/mp-profile", icon: UserCircle },
    { label: "Citizen Requests", href: "/requests", icon: ClipboardList },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Beneficiaries", href: "/beneficiaries", icon: Heart },
    { label: "Communication", href: "/communication", icon: Megaphone },
    { label: "Reports", href: "/reports", icon: BarChart3 },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
  staff: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Citizen Requests", href: "/requests", icon: ClipboardList },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Beneficiaries", href: "/beneficiaries", icon: Heart },
    { label: "Communication", href: "/communication", icon: Megaphone },
    { label: "Reports", href: "/reports", icon: BarChart3 },
  ],
  data_entry: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Citizen Requests", href: "/requests", icon: ClipboardList },
    { label: "Beneficiaries", href: "/beneficiaries", icon: Heart },
  ],
  citizen: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Requests", href: "/requests", icon: ClipboardList },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Announcements", href: "/communication", icon: Megaphone },
  ],
  auditor: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Requests", href: "/requests", icon: ClipboardList },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Reports", href: "/reports", icon: BarChart3 },
  ],
};

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const navItems = user ? navConfig[user.role] || [] : [];

  return (
    <aside
      className={cn(
        "flex flex-col h-screen sticky top-0 transition-all duration-300 z-40",
        "border-r",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ background: "hsl(var(--sidebar-background))", borderColor: "hsl(var(--sidebar-border))" }}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-4 border-b", collapsed && "justify-center")}
        style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <img src={ncmpLogo} alt="NCMP Logo" className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-xs font-bold leading-tight" style={{ color: "hsl(var(--sidebar-primary))" }}>
              NCMP
            </div>
            <div className="text-xs leading-tight truncate" style={{ color: "hsl(var(--sidebar-foreground) / 0.7)" }}>
              Uganda
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto p-1 rounded-md transition-colors flex-shrink-0",
            collapsed && "ml-0"
          )}
          style={{ color: "hsl(var(--sidebar-foreground) / 0.5)" }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="px-4 py-3 mx-3 my-3 rounded-lg" style={{ background: "hsl(var(--sidebar-accent))" }}>
          <div className="text-xs font-semibold truncate" style={{ color: "hsl(var(--sidebar-primary))" }}>
            {user.name}
          </div>
          <div className="text-xs mt-0.5 capitalize" style={{ color: "hsl(var(--sidebar-foreground) / 0.6)" }}>
            {user.role.replace("_", " ")}
            {user.constituency && ` • ${user.constituency}`}
          </div>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "font-semibold"
                  : "hover:opacity-90"
              )}
              style={{
                background: isActive ? "hsl(var(--sidebar-primary))" : "transparent",
                color: isActive ? "hsl(var(--sidebar-primary-foreground))" : "hsl(var(--sidebar-foreground))",
              }}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t" style={{ borderColor: "hsl(var(--sidebar-border))" }}>
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-all",
            collapsed && "justify-center"
          )}
          style={{ color: "hsl(var(--sidebar-foreground) / 0.6)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--accent))")}
          onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--sidebar-foreground) / 0.6)")}
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
