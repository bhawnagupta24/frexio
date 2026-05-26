import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  MessageSquare,
  Video,
  Bell,
  Keyboard,
  Trophy,
  Wallet,
  User,
  Settings,
  Users,
  ShieldCheck,
  LogOut,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/trials", label: "Trials", icon: Sparkles },
  { to: "/freelancers", label: "Talent", icon: Users, clientOnly: true },
  { to: "/team-finder", label: "Team Finder", icon: Users, freelancerOnly: true },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/meetings", label: "Meetings", icon: Video },
  { to: "/typing-arena", label: "Typing Arena", icon: Keyboard },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const bottom = [
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const filtered = items.filter((i) => {
    if (i.clientOnly && user?.role !== "client") return false;
    if (i.freelancerOnly && user?.role !== "freelancer") return false;
    return true;
  });

  return (
    <aside className="hidden lg:flex flex-col w-[248px] shrink-0 border-r border-border bg-sidebar/70 backdrop-blur-xl">
      <div className="px-5 pt-5 pb-3 flex items-center gap-2">
        <div className="size-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
          <Zap className="size-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-display font-bold text-lg leading-none">Nexum<span className="text-primary">.</span>AI</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Freelancing OS</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {filtered.map((it) => {
          const active = pathname === it.to || pathname.startsWith(it.to + "/");
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all relative group",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-elegant"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground",
              )}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r gradient-primary" />}
              <it.icon className={cn("size-4.5 shrink-0", active && "text-primary")} />
              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm mt-4",
              pathname.startsWith("/admin") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/40",
            )}
          >
            <ShieldCheck className="size-4.5 text-primary" />
            <span>Admin</span>
          </Link>
        )}
      </nav>

      <div className="border-t border-sidebar-border p-3 space-y-0.5">
        {bottom.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-sm",
                active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/40",
              )}
            >
              <it.icon className="size-4.5" />
              <span>{it.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-sidebar-foreground/80 hover:bg-destructive/15 hover:text-destructive transition-colors"
        >
          <LogOut className="size-4.5" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
