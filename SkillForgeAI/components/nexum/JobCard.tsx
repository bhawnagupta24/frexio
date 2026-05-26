import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, Users, Sparkles, MapPin } from "lucide-react";
import { type Job } from "@/lib/mock-data";
import { inr, relativeTime } from "@/lib/format";
import { GlassCard } from "./GlassCard";

const levelColor: Record<string, string> = {
  fresher: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  intermediate: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  professional: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
};

export function JobCard({ job, matchPct }: { job: Job; matchPct?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to="/jobs/$jobId" params={{ jobId: job.id }} search={{ q: "" }} className="block">
        <GlassCard hover className="h-full">
          <div className="flex items-start gap-3">
            <img src={job.clientAvatar} alt={job.client} className="size-11 rounded-xl border border-border" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground">{job.client}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{relativeTime(job.postedAt)}</span>
                {job.type === "trial" && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    Trial
                  </span>
                )}
              </div>
              <h3 className="font-display text-base font-semibold mt-1 line-clamp-2">{job.title}</h3>
            </div>
            {matchPct !== undefined && (
              <div className="flex flex-col items-end shrink-0">
                <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-primary/15 text-primary border border-primary/30">
                  <Sparkles className="size-3" />
                  {matchPct}% Match
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{job.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-secondary/60 text-secondary-foreground border border-border">
                {s}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="size-3.5" />{job.duration}</span>
              <span className="flex items-center gap-1"><Users className="size-3.5" />{job.proposals}</span>
              <span className="flex items-center gap-1"><MapPin className="size-3.5" />{job.remote ? "Remote" : "On-site"}</span>
            </div>
            <div className="text-right">
              <div className="font-display text-base font-semibold">{inr(job.budget)}</div>
              <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${levelColor[job.level]}`}>
                {job.level}
              </span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
