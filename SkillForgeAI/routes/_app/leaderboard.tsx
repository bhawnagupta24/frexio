import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { LEADERBOARD } from "@/lib/mock-data";
import { Trophy, Crown } from "lucide-react";

export const Route = createFileRoute("/_app/leaderboard")({
  component: LeaderboardPage,
});

function LeaderboardPage() {
  return (
    <div>
      <PageHeader eyebrow="Compete" title="Typing Leaderboard" description="Top freelancers by speed and accuracy." />
      <GlassCard className="!p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {LEADERBOARD.map((row, i) => (
            <div key={row.id} className={`flex items-center gap-4 p-4 ${i === 0 ? "bg-primary/5" : ""}`}>
              <div className={`size-9 rounded-xl grid place-items-center text-xs font-bold ${i === 0 ? "gradient-primary text-primary-foreground shadow-glow" : i < 3 ? "bg-surface text-primary" : "bg-surface text-muted-foreground"}`}>
                {i === 0 ? <Crown className="size-4" /> : i + 1}
              </div>
              <img src={row.avatar} className="size-11 rounded-xl border border-border" alt="" />
              <div className="flex-1">
                <div className="font-medium">{row.name}</div>
                <div className="text-xs text-muted-foreground">{row.badges} badges</div>
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-semibold gradient-text">{row.wpm} wpm</div>
                <div className="text-xs text-muted-foreground">{row.accuracy}% acc</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
