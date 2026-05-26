import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/nexum/PageHeader";
import { FreelancerCard } from "@/components/nexum/FreelancerCard";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { GlassCard } from "@/components/nexum/GlassCard";
import { Sparkles } from "lucide-react";
import { SKILLS } from "@/lib/skill-tests";

export const Route = createFileRoute("/_app/team-finder")({
  component: TeamFinder,
});

function TeamFinder() {
  const [needed, setNeeded] = useState<string[]>(["React", "UI/UX"]);
  const team = useMemo(() => {
    return needed.map((skill) => {
      const candidates = MOCK_FREELANCERS.filter((f) => f.skills.some((s) => s.toLowerCase() === skill.toLowerCase()));
      candidates.sort((a, b) => b.trustScore - a.trustScore);
      return { skill, pick: candidates[0] };
    }).filter((x) => x.pick);
  }, [needed]);

  function toggle(s: string) {
    setNeeded((c) => c.includes(s) ? c.filter((x) => x !== s) : [...c, s]);
  }

  return (
    <div>
      <PageHeader eyebrow="AI" title="Team Finder" description="Pick the skills you need. We'll assemble the squad." />
      <GlassCard className="mb-6">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Skills needed</div>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map((s) => {
            const on = needed.includes(s);
            return (
              <button key={s} onClick={() => toggle(s)} className={`px-3 h-9 rounded-xl text-sm border ${on ? "gradient-primary text-primary-foreground border-transparent shadow-glow" : "glass border-border"}`}>{s}</button>
            );
          })}
        </div>
      </GlassCard>
      <div className="flex items-center gap-2 text-sm text-primary mb-3">
        <Sparkles className="size-4" /> AI-suggested team for your project
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map(({ skill, pick }) => (
          <div key={skill}>
            <div className="text-xs text-muted-foreground mb-1.5">Best for {skill}</div>
            <FreelancerCard f={pick} matchPct={pick.trustScore} />
          </div>
        ))}
      </div>
    </div>
  );
}
