import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GlassCard } from "@/components/nexum/GlassCard";
import { PageHeader } from "@/components/nexum/PageHeader";
import { toast } from "sonner";
import { SKILLS } from "@/lib/skill-tests";

export const Route = createFileRoute("/_app/jobs/new")({
  component: NewJob,
});

function NewJob() {
  const nav = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState(10000);
  const [level, setLevel] = useState("intermediate");
  const [type, setType] = useState("job");
  const [skills, setSkills] = useState<string[]>([]);

  function submit() {
    if (!title || !desc) return toast.error("Title and description required");
    toast.success("Job posted (demo) — freelancers will start applying soon!");
    nav({ to: "/jobs", search: { q: "" } });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader eyebrow="Hire" title="Post a new job" description="AI will surface the best-matched freelancers within minutes." />
      <GlassCard className="space-y-5">
        <Input label="Title" value={title} onChange={setTitle} placeholder="e.g. Build a React landing page" />
        <div>
          <Label>Description</Label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={5} placeholder="What needs to be done?" className="w-full px-3 py-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none text-sm" />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <Label>Budget (₹)</Label>
            <input type="number" value={budget} onChange={(e) => setBudget(+e.target.value)} className="w-full h-11 px-3 rounded-xl bg-input/60 border border-border outline-none" />
          </div>
          <div>
            <Label>Level</Label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-input/60 border border-border">
              <option value="fresher">Fresher</option>
              <option value="intermediate">Intermediate</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div>
            <Label>Type</Label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-input/60 border border-border">
              <option value="job">Long project</option>
              <option value="trial">Paid trial</option>
            </select>
          </div>
        </div>
        <div>
          <Label>Skills</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {SKILLS.map((s) => {
              const on = skills.includes(s);
              return (
                <button key={s} onClick={() => setSkills((c) => on ? c.filter((x) => x !== s) : [...c, s])} className={`px-3 h-9 rounded-xl text-sm border ${on ? "gradient-primary text-primary-foreground border-transparent shadow-glow" : "glass border-border"}`}>{s}</button>
              );
            })}
          </div>
        </div>
        <button onClick={submit} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow">Publish job</button>
      </GlassCard>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">{children}</label>;
}
function Input({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full h-11 px-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none text-sm" />
    </div>
  );
}
