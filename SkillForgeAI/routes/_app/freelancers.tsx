import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/nexum/PageHeader";
import { FreelancerCard } from "@/components/nexum/FreelancerCard";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_app/freelancers")({
  component: Freelancers,
});

function Freelancers() {
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");
  const filtered = useMemo(() => MOCK_FREELANCERS.filter((f) => {
    if (level !== "all" && f.level !== level) return false;
    if (q && !`${f.name} ${f.title} ${f.skills.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [q, level]);
  return (
    <div>
      <PageHeader eyebrow="Discover" title="Browse verified talent" description="Filter by level, skill, and trust score." />
      <div className="glass rounded-2xl p-3 mb-6 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search freelancers…" className="w-full h-11 pl-9 pr-3 rounded-xl bg-input/60 border border-border outline-none text-sm" />
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="h-11 px-3 rounded-xl bg-input/60 border border-border text-sm">
          <option value="all">All levels</option>
          <option value="fresher">Fresher</option>
          <option value="intermediate">Intermediate</option>
          <option value="professional">Professional</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((f) => <FreelancerCard key={f.id} f={f} matchPct={Math.max(75, f.trustScore - 3)} />)}
      </div>
    </div>
  );
}
