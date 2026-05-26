import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { JobCard } from "@/components/nexum/JobCard";
import { MOCK_JOBS, MOCK_FREELANCERS, matchScore } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/trials")({
  component: Trials,
});

function Trials() {
  const me = MOCK_FREELANCERS[4];
  const trials = MOCK_JOBS.filter((j) => j.type === "trial");
  return (
    <div>
      <PageHeader eyebrow="Micro-internships" title="Paid trials & beginner-friendly tasks" description="Quick paid assignments. Great work converts into long-term hires." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trials.map((j) => <JobCard key={j.id} job={j} matchPct={matchScore(me, j)} />)}
      </div>
    </div>
  );
}
