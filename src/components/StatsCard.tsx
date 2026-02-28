import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "primary" | "gold" | "success" | "danger";
  className?: string;
}

const variants = {
  default: {
    card: "bg-card border",
    icon: "bg-muted text-muted-foreground",
    title: "text-muted-foreground",
    value: "text-foreground",
  },
  primary: {
    card: "border-0 text-primary-foreground",
    icon: "bg-primary-foreground/20 text-primary-foreground",
    title: "text-primary-foreground/80",
    value: "text-primary-foreground",
    bg: "hsl(var(--primary))",
  },
  gold: {
    card: "border-0",
    icon: "bg-black/10 text-foreground",
    title: "text-foreground/80",
    value: "text-foreground",
    bg: "hsl(var(--secondary))",
  },
  success: {
    card: "border-0 text-white",
    icon: "bg-white/20 text-white",
    title: "text-white/80",
    value: "text-white",
    bg: "hsl(var(--success))",
  },
  danger: {
    card: "border-0 text-white",
    icon: "bg-white/20 text-white",
    title: "text-white/80",
    value: "text-white",
    bg: "hsl(var(--accent))",
  },
};

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, variant = "default", className }: StatsCardProps) {
  const v = variants[variant];
  return (
    <div
      className={cn("rounded-xl p-5 shadow-gov-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gov-lg", v.card, className)}
      style={(v as any).bg ? { background: (v as any).bg } : {}}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-xs font-medium uppercase tracking-wide mb-1", v.title)}>{title}</p>
          <p className={cn("text-3xl font-bold font-display leading-none", v.value)}>{value}</p>
          {subtitle && <p className={cn("text-xs mt-1.5", v.title)}>{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs mt-1.5", trend.positive ? "text-green-300" : "text-red-300")}>
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-xl", v.icon)}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
