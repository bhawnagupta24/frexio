import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { TrustMeter } from "@/components/nexum/TrustMeter";
import { ActivityHeatmap } from "@/components/nexum/ActivityHeatmap";
import { GlassCard } from "@/components/nexum/GlassCard";
import { PageHeader } from "@/components/nexum/PageHeader";
import { JobCard } from "@/components/nexum/JobCard";
import { MOCK_JOBS, MOCK_FREELANCERS, MOCK_NOTIFS, matchScore } from "@/lib/mock-data";
import { inr } from "@/lib/format";
import { fadeUp, stagger } from "@/lib/motion";
import { Briefcase, TrendingUp, Wallet, Trophy, ArrowRight, Sparkles, Zap } from "lucide-react";
import { FreelancerCard } from "@/components/nexum/FreelancerCard";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const isClient = user?.role === "client";
  const pseudoFreelancer = MOCK_FREELANCERS[0];
  const recommendedJobs = MOCK_JOBS.slice(0, 4).map((j) => ({ job: j, match: matchScore(pseudoFreelancer, j) }));

  const stats = isClient
    ? [
        { label: "Active projects", value: "4", icon: Briefcase, hint: "+1 this week" },
        { label: "In escrow", value: inr(125000), icon: Wallet, hint: "2 milestones pending" },
        { label: "Hires made", value: "12", icon: Trophy, hint: "Lifetime" },
        { label: "Match quality", value: "94%", icon: Sparkles, hint: "AI score" },
      ]
    : [
        { label: "Trust Score", value: String(user?.trustScore ?? 64), icon: Zap, hint: "+4 this week" },
        { label: "Earnings", value: inr(user?.earnings ?? 0), icon: Wallet, hint: "Lifetime" },
        { label: "Completed", value: String(user?.completedProjects ?? 0), icon: Briefcase, hint: "Jobs done" },
        { label: "Streak", value: `${user?.streak ?? 0} days`, icon: TrendingUp, hint: "Keep it going" },
      ];

  return (
    <div>
      <PageHeader
        eyebrow={`${isClient ? "Client" : "Freelancer"} workspace`}
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}.`}
        description="Here's what's happening in your Nexum workspace today."
        actions={
          isClient ? (
            <Link to="/jobs/new" search={{ q: "" }} className="h-11 px-4 rounded-xl gradient-primary text-primary-foreground font-semibold inline-flex items-center gap-2 shadow-glow">
              Post a job <ArrowRight className="size-4" />
            </Link>
          ) : (
            <Link to="/jobs" search={{ q: "" }} className="h-11 px-4 rounded-xl gradient-primary text-primary-foreground font-semibold inline-flex items-center gap-2 shadow-glow">
              Find work <ArrowRight className="size-4" />
            </Link>
          )
        }
      />

      <motion.div initial="hidden" animate="show" variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp}>
            <GlassCard className="hover-lift">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="font-display text-3xl font-bold mt-1.5 gradient-text">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.hint}</div>
                </div>
                <div className="size-10 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center text-primary">
                  <s.icon className="size-5" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-semibold text-lg">Activity</h2>
              <p className="text-xs text-muted-foreground">Last 52 weeks</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary border border-primary/30">{user?.streak ?? 0}-day streak</span>
          </div>
          <ActivityHeatmap />
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center text-center">
          <TrustMeter score={user?.trustScore ?? 64} />
          <p className="text-sm text-muted-foreground mt-4 max-w-[240px]">Trust grows with verified skills, on-time delivery and ratings.</p>
        </GlassCard>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-semibold text-xl">{isClient ? "Top matched freelancers" : "AI-matched jobs for you"}</h2>
        <Link to={isClient ? "/freelancers" : "/jobs"} className="text-sm text-primary hover:underline inline-flex items-center gap-1">View all <ArrowRight className="size-3.5" /></Link>
      </div>
      {isClient ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_FREELANCERS.slice(0, 6).map((f) => (
            <FreelancerCard key={f.id} f={f} matchPct={Math.max(75, f.trustScore - 2)} />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {recommendedJobs.map(({ job, match }) => (
            <JobCard key={job.id} job={job} matchPct={match} />
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <GlassCard>
          <h2 className="font-display font-semibold text-lg mb-3">Recent notifications</h2>
          <div className="space-y-2">
            {MOCK_NOTIFS.slice(0, 4).map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface/40 border border-border">
                <div className="size-9 rounded-lg gradient-primary grid place-items-center shrink-0"><Sparkles className="size-4 text-primary-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{n.body}</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="font-display font-semibold text-lg mb-1">Productivity</h2>
          <p className="text-xs text-muted-foreground mb-4">Sharpen speed with the Typing Arena.</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Stat label="Best WPM" value="—" />
            <Stat label="Avg Acc" value="—" />
            <Stat label="Sessions" value="—" />
          </div>
          <Link to="/typing-arena" className="inline-flex items-center gap-2 h-10 px-4 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-glow">
            Start a sprint <ArrowRight className="size-4" />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-xl bg-surface/40 border border-border text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display font-bold gradient-text">{value}</div>
    </div>
  );
}
