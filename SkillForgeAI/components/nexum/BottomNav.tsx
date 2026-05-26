import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Briefcase, MessageSquare, Keyboard, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/messages", label: "Chat", icon: MessageSquare },
  { to: "/typing-arena", label: "Arena", icon: Keyboard },
  { to: "/profile", label: "Me", icon: User },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/85 backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-[10px] min-w-[56px] transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <it.icon className={cn("size-5", active && "drop-shadow-[0_0_8px_oklch(0.74_0.17_230)]")} />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
