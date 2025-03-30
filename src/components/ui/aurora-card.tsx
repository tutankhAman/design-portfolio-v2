import * as React from "react";
import { cn } from "../../lib/utils";

interface AuroraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  glowClassName?: string;
  containerClassName?: string;
}

export function AuroraCard({
  className,
  children,
  glowClassName,
  containerClassName,
  ...props
}: AuroraCardProps) {
  return (
    <div className={cn("relative group", containerClassName)}>
      {/* Gradient border container - the aurora effect */}
      <div
        className={cn(
          "absolute -inset-[3px] rounded-xl bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-50 blur-md transition-all duration-500",
          "group-hover:opacity-70 group-hover:blur-lg",
          glowClassName
        )}
      />

      {/* Card content container */}
      <div
        className={cn(
          "relative rounded-xl bg-white shadow-md w-full h-full overflow-hidden",
          "transition-all duration-500",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
