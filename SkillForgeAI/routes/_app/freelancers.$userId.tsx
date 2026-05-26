import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { GlassCard } from "@/components/nexum/GlassCard";
import { TrustMeter } from "@/components/nexum/TrustMeter";
import { ActivityHeatmap } from "@/components/nexum/ActivityHeatmap";
import { ArrowLeft, ShieldCheck, Star, MessageSquare } from "lucide-react";
import { inr } from "@/lib/format";

export const Route = createFileRoute("/_app/freelancers/$userId")({
  loader: ({ params }) => {
    const f = MOCK_FREELANCERS.find((x) => x.id === params.userId);
    if (!f) throw notFound();
    return { f };
  },
  component: Page,
});

function Page() {
  const { f } = Route.useLoaderData();
  return (
    <div>
      <Link to="/freelancers" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="size-4" />Back to talent</Link>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <GlassCard>
            <div className="flex items-start gap-5">
              <img src={f.avatar} className="size-24 rounded-2xl border border-border bg-surface" alt="" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-2xl font-bold">{f.name}</h1>
                  {f.verified && <ShieldCheck className="size-5 text-primary" />}
                </div>
                <div className="text-muted-foreground">{f.title}</div>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-warning"><Star className="size-3.5 fill-current" />{f.rating}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{f.completed} completed</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground capitalize">{f.level}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3 max-w-xl">{f.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {f.skills.map((s: string) => <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border">{s}</span>)}
                </div>
              </div>
            </div>
          </GlassCard>
          <GlassCard>
            <h2 className="font-display font-semibold mb-3">Activity</h2>
            <ActivityHeatmap seed={f.id.length * 7} />
          </GlassCard>
        </div>
        <div className="space-y-4">
          <GlassCard className="flex flex-col items-center text-center">
            <TrustMeter score={f.trustScore} />
            <Link to="/messages" className="mt-4 w-full h-11 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2">
              <MessageSquare className="size-4" /> Message
            </Link>
          </GlassCard>
          <GlassCard>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div><div className="text-xs text-muted-foreground">Hourly rate</div><div className="font-display text-xl font-semibold gradient-text">{inr(f.rate)}</div></div>
              <div><div className="text-xs text-muted-foreground">Earnings</div><div className="font-display text-xl font-semibold gradient-text">{inr(f.earnings)}</div></div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
