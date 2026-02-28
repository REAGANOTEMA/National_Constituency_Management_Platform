import { Bell, Search, Moon, Sun, Menu } from "lucide-react";
import ncmpLogo from "@/assets/ncmp-logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function TopNav() {
  const { user } = useAuth();
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center gap-4 px-6 border-b bg-card/95 backdrop-blur-sm"
      style={{ borderColor: "hsl(var(--border))" }}>
      {/* Left */}
      <div className="flex items-center gap-3 flex-1">
        <div className="relative hidden md:flex items-center">
          <Search size={15} className="absolute left-3 text-muted-foreground" />
          <input
            className="pl-9 pr-4 h-9 w-64 rounded-lg text-sm bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
            placeholder="Search constituents, projects..."
          />
        </div>
      </div>

      {/* Center - platform name */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
        <span className="text-xs font-bold tracking-wider" style={{ color: "hsl(var(--primary))" }}>
          NATIONAL CONSTITUENCY MANAGEMENT PLATFORM
        </span>
        <span className="text-xs text-muted-foreground">Republic of Uganda</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
        </button>

        {user && (
          <div className="flex items-center gap-2 pl-2 border-l" style={{ borderColor: "hsl(var(--border))" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
              {user.name.charAt(0)}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-semibold leading-tight truncate max-w-32">{user.name}</span>
              <span className="text-xs text-muted-foreground capitalize">{user.role.replace("_", " ")}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
