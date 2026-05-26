import { Link } from "@tanstack/react-router";
import { ShieldCheck, Star, Sparkles } from "lucide-react";
import { type Freelancer } from "@/lib/mock-data";
import { inr } from "@/lib/format";
import { GlassCard } from "./GlassCard";

export function FreelancerCard({ f, matchPct }: { f: Freelancer; matchPct?: number }) {
  return (
    <Link to="/freelancers/$userId" params={{ userId: f.id }} className="block">
      <GlassCard hover className="h-full">
        <div className="flex items-start gap-3">
          <img src={f.avatar} alt={f.name} className="size-14 rounded-2xl border border-border bg-surface" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-display font-semibold text-base">{f.name}</h3>
              {f.verified && <ShieldCheck className="size-4 text-primary" />}
            </div>
            <p className="text-xs text-muted-foreground">{f.title}</p>
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <span className="flex items-center gap-1 text-warning"><Star className="size-3 fill-current" />{f.rating}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{f.completed} jobs</span>
            </div>
          </div>
          {matchPct !== undefined && (
            <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-primary/15 text-primary border border-primary/30 shrink-0">
              <Sparkles className="size-3" />{matchPct}%
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{f.bio}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {f.skills.slice(0, 4).map((s) => (
            <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary/60 border border-border">{s}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Trust</div>
            <div className="font-display font-semibold gradient-text">{f.trustScore}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Rate</div>
            <div className="font-display font-semibold">{inr(f.rate)}<span className="text-xs text-muted-foreground">/hr</span></div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
