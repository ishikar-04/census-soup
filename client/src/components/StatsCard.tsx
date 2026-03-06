import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  className?: string;
  delay?: number;
}

export function StatsCard({ title, value, icon, trend, className, delay = 0 }: StatsCardProps) {
  return (
    <div 
      className={cn(
        "glass-card p-6 rounded-2xl flex flex-col gap-4 animate-in-fade", 
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-3xl font-bold font-display text-white">{value}</p>
      </div>
    </div>
  );
}
