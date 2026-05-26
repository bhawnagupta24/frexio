import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MOCK_JOBS, MOCK_FREELANCERS, matchScore } from "@/lib/mock-data";
import { inr, relativeTime } from "@/lib/format";
import { GlassCard } from "@/components/nexum/GlassCard";
import { FreelancerCard } from "@/components/nexum/FreelancerCard";
import { ArrowLeft, Clock, MapPin, Users, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/jobs/$jobId")({
  loader: ({ params }) => {
    const job = MOCK_JOBS.find((j) => j.id === params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  component: JobDetail,
});

function JobDetail() {
  const { job } = Route.useLoaderData();
  const top = MOCK_FREELANCERS.map((f) => ({ f, m: matchScore(f, job) })).sort((a, b) => b.m - a.m).slice(0, 3);

  return (
    <div>
      <Link to="/jobs" search={{ q: "" }} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="size-4" />Back to jobs</Link>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <GlassCard>
            <div className="flex items-center gap-3">
              <img src={job.clientAvatar} className="size-12 rounded-xl border border-border" alt="" />
              <div>
                <div className="text-sm text-muted-foreground">{job.client} · {relativeTime(job.postedAt)}</div>
                <h1 className="font-display text-2xl md:text-3xl font-bold mt-0.5">{job.title}</h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.map((s: string) => <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-secondary/60 border border-border">{s}</span>)}
            </div>
            <p className="text-muted-foreground mt-5 leading-relaxed">{job.description}</p>
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-border">
              <div><div className="text-xs text-muted-foreground">Budget</div><div className="font-display text-xl font-semibold mt-0.5">{inr(job.budget)}</div></div>
              <div><div className="text-xs text-muted-foreground">Duration</div><div className="font-display text-xl font-semibold mt-0.5">{job.duration}</div></div>
              <div><div className="text-xs text-muted-foreground">Level</div><div className="font-display text-xl font-semibold mt-0.5 capitalize">{job.level}</div></div>
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="font-display font-semibold text-lg mb-3">Top AI-matched freelancers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {top.map(({ f, m }) => <FreelancerCard key={f.id} f={f} matchPct={m} />)}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-4">
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">Apply</h3>
            <button onClick={() => toast.success("Proposal submitted (demo)")} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow">Submit proposal</button>
            <button onClick={() => toast.success("Saved")} className="mt-2 w-full h-11 rounded-xl border border-border bg-glass text-sm font-medium">Save for later</button>
          </GlassCard>
          <GlassCard>
            <h3 className="font-display font-semibold mb-3">At a glance</h3>
            <div className="space-y-2 text-sm">
              <Row icon={Users} label={`${job.proposals} proposals`} />
              <Row icon={Clock} label={`Duration: ${job.duration}`} />
              <Row icon={MapPin} label={job.remote ? "Remote" : "On-site"} />
              <Row icon={Sparkles} label={`${job.type === "trial" ? "Paid trial" : "Standard job"}`} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return <div className="flex items-center gap-2 text-muted-foreground"><Icon className="size-4 text-primary" />{label}</div>;
}
