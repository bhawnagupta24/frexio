import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search, Sparkles, Menu } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { MobileDrawer } from "./MobileDrawer";

export function TopBar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 px-4 lg:px-6 flex items-center gap-3 border-b border-border bg-background/60 backdrop-blur-xl">
        <button
          aria-label="Open menu"
          className="lg:hidden size-9 grid place-items-center rounded-lg border border-border bg-glass"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu className="size-4" />
        </button>

        <form
          className="flex-1 max-w-xl relative"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/jobs", search: { q } as never });
          }}
        >
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs, freelancers, skills…"
            className="w-full h-10 pl-9 pr-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
          />
        </form>

        <div className="hidden sm:flex items-center gap-1.5 px-3 h-9 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs">
          <Sparkles className="size-3.5" />
          <span className="font-medium">AI {user?.level ?? "fresher"} matching</span>
        </div>

        <Link
          to="/notifications"
          className="relative size-10 grid place-items-center rounded-xl border border-border bg-glass hover:border-primary/40 transition-colors"
        >
          <Bell className="size-4.5" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Link>

        <Link to="/profile" className="flex items-center gap-2 pl-1 pr-2 h-10 rounded-xl border border-border bg-glass hover:border-primary/40 transition-colors">
          <div className="size-7 rounded-lg gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="hidden md:flex flex-col text-left leading-tight">
            <span className="text-xs font-medium">{user?.name ?? "Guest"}</span>
            <span className="text-[10px] text-muted-foreground capitalize">{user?.role ?? "guest"} · {user?.level}</span>
          </div>
        </Link>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
