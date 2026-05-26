import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/nexum/PageHeader";
import { JobCard } from "@/components/nexum/JobCard";
import { MOCK_JOBS, MOCK_FREELANCERS, matchScore } from "@/lib/mock-data";
import { Search, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/jobs")({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) || "" }),
  component: JobsPage,
});

function JobsPage() {
  const search = Route.useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState(search.q);
  const [level, setLevel] = useState<string>("all");
  const [type, setType] = useState<string>("all");

  const me = MOCK_FREELANCERS[0];

  const filtered = useMemo(() => {
    return MOCK_JOBS.filter((j) => {
      if (level !== "all" && j.level !== level) return false;
      if (type !== "all" && j.type !== type) return false;
      if (q) {
        const t = q.toLowerCase();
        if (!j.title.toLowerCase().includes(t) && !j.skills.join(" ").toLowerCase().includes(t)) return false;
      }
      return true;
    });
  }, [q, level, type]);

  return (
    <div>
      <PageHeader
        eyebrow="Marketplace"
        title="Find your next great project"
        description="AI-matched jobs, paid trials, and long-term contracts."
        actions={user?.role === "client" ? (
          <button onClick={() => navigate({ to: "/jobs/new", search: { q: "" } })} className="h-11 px-4 rounded-xl gradient-primary text-primary-foreground font-semibold inline-flex items-center gap-2 shadow-glow">
            <Plus className="size-4" /> Post job
          </button>
        ) : null}
      />

      <div className="glass rounded-2xl p-3 mb-6 flex flex-col md:flex-row gap-2 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jobs or skills…" className="w-full h-11 pl-9 pr-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none text-sm" />
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="h-11 px-3 rounded-xl bg-input/60 border border-border text-sm">
          <option value="all">All levels</option>
          <option value="fresher">Fresher</option>
          <option value="intermediate">Intermediate</option>
          <option value="professional">Professional</option>
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} className="h-11 px-3 rounded-xl bg-input/60 border border-border text-sm">
          <option value="all">All types</option>
          <option value="job">Jobs</option>
          <option value="trial">Trials</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((j) => (
          <JobCard key={j.id} job={j} matchPct={matchScore(me, j)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full glass rounded-2xl p-10 text-center text-muted-foreground">No jobs match your filters.</div>
        )}
      </div>
    </div>
  );
}
