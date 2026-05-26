import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth, type Level } from "@/lib/auth-context";
import { SKILLS } from "@/lib/skill-tests";
import { toast } from "sonner";
import { ArrowRight, Camera, Check } from "lucide-react";
import { OnboardingShell } from "@/components/nexum/OnboardingShell";

export const Route = createFileRoute("/onboarding/freelancer-profile")({
  component: Page,
});

function Page() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name ?? "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl ?? "");
  const [level, setLevel] = useState<Level>(user?.level ?? "fresher");
  const [skills, setSkills] = useState<string[]>(user?.skills ?? []);
  const [portfolio, setPortfolio] = useState("");

  const toggle = (s: string) =>
    setSkills((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  async function next() {
    if (!name) return toast.error("Add your name");
    if (skills.length === 0) return toast.error("Pick at least one skill");
    await updateUser({ name, photoUrl, level, skills, onboardingStage: "aadhaar" });
    navigate({ to: "/onboarding/aadhaar" });
  }

  const avatarPreview =
    photoUrl ||
    `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(name || "Nexum")}&backgroundType=gradientLinear&backgroundColor=0ea5e9,8b5cf6`;

  return (
    <OnboardingShell step={1} title="Tell us about you" subtitle="This goes on your public profile.">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src={avatarPreview} className="size-24 rounded-2xl border border-border bg-surface" alt="" />
            <div className="absolute -bottom-2 -right-2 size-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
              <Camera className="size-4 text-primary-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Full name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-11 px-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none" />
            <label className="text-xs uppercase tracking-wider text-muted-foreground mt-3 block">Profile photo URL (optional)</label>
            <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://…" className="mt-1 w-full h-11 px-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none" />
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Experience level</label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["fresher", "intermediate", "professional"] as Level[]).map((l) => (
              <button key={l} onClick={() => setLevel(l)} className={`h-12 rounded-xl border text-sm capitalize transition-all ${level === l ? "gradient-primary text-primary-foreground border-transparent shadow-glow" : "glass border-border hover-lift"}`}>{l}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Skills (pick all that apply)</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SKILLS.map((s) => {
              const on = skills.includes(s);
              return (
                <button key={s} onClick={() => toggle(s)} className={`px-3 h-9 rounded-xl text-sm border transition-all inline-flex items-center gap-1.5 ${on ? "gradient-primary text-primary-foreground border-transparent shadow-glow" : "glass border-border hover-lift"}`}>
                  {on && <Check className="size-3.5" />} {s}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Portfolio link (optional)</label>
          <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://github.com/you" className="mt-1 w-full h-11 px-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none" />
        </div>

        <button onClick={next} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2">
          Continue to verification <ArrowRight className="size-4" />
        </button>
      </motion.div>
    </OnboardingShell>
  );
}
