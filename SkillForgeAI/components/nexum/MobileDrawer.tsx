import { AnimatePresence, motion } from "framer-motion";
import { Link, useRouterState } from "@tanstack/react-router";
import { X, Zap, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
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
} from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/jobs", label: "Jobs", icon: Briefcase },
  { to: "/trials", label: "Trials", icon: Sparkles },
  { to: "/freelancers", label: "Talent", icon: Users },
  { to: "/team-finder", label: "Team Finder", icon: Users },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/meetings", label: "Meetings", icon: Video },
  { to: "/typing-arena", label: "Typing Arena", icon: Keyboard },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signOut } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-72 glass-strong border-r border-border flex flex-col lg:hidden"
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-xl gradient-primary grid place-items-center"><Zap className="size-5 text-primary-foreground" /></div>
                <div className="font-display font-bold text-lg">Nexum<span className="text-primary">.</span>AI</div>
              </div>
              <button onClick={onClose} className="size-8 grid place-items-center rounded-lg border border-border"><X className="size-4" /></button>
            </div>
            <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-thin">
              {items.map((it) => {
                const active = pathname === it.to;
                return (
                  <Link
                    key={it.to}
                    to={it.to}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm",
                      active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/40",
                    )}
                  >
                    <it.icon className="size-4.5" />
                    <span>{it.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-3 border-t border-border">
              <button onClick={() => { signOut(); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10">
                <LogOut className="size-4.5" /> Sign out
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
