import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { TrustMeter } from "@/components/nexum/TrustMeter";
import { ActivityHeatmap } from "@/components/nexum/ActivityHeatmap";
import { useAuth } from "@/lib/auth-context";
import { ShieldCheck, Award, Briefcase, Wallet } from "lucide-react";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_app/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;
  const avatar = user.photoUrl || `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(user.name)}&backgroundType=gradientLinear&backgroundColor=0ea5e9,8b5cf6`;
  return (
    <div>
      <PageHeader eyebrow="You" title="Your profile" description="What clients see when they discover you." />
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <GlassCard>
            <div className="flex items-start gap-5">
              <img src={avatar} className="size-24 rounded-2xl border border-border bg-surface" alt="" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display text-2xl font-bold">{user.name}</h2>
                  {user.verified && <ShieldCheck className="size-5 text-primary" />}
                </div>
                <div className="text-muted-foreground capitalize">{user.role ?? "—"} · {user.level}</div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {user.skills.map((s) => <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border">{s}</span>)}
                  {user.skills.length === 0 && <span className="text-xs text-muted-foreground">No skills added yet.</span>}
                </div>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">Activity</h3>
            <ActivityHeatmap seed={user.name.length * 3 + 1} />
          </GlassCard>
          <div className="grid sm:grid-cols-3 gap-4">
            <Stat icon={Award} label="Badges" value="6" />
            <Stat icon={Briefcase} label="Completed" value={String(user.completedProjects)} />
            <Stat icon={Wallet} label="Lifetime earnings" value={inr(user.earnings)} />
          </div>
        </div>
        <GlassCard className="flex flex-col items-center justify-center text-center">
          <TrustMeter score={user.trustScore} />
          <p className="text-sm text-muted-foreground mt-4">Streak: <span className="text-foreground font-semibold">{user.streak} days</span></p>
        </GlassCard>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <GlassCard>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="font-display text-2xl font-bold mt-1 gradient-text">{value}</div>
        </div>
        <Icon className="size-5 text-primary" />
      </div>
    </GlassCard>
  );
}
