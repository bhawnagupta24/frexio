import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export function GlassCard({
  className,
  children,
  hover,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { hover?: boolean; children?: ReactNode }) {
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5",
        hover && "hover-lift cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
