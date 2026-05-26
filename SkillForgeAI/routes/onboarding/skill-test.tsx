import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { OnboardingShell } from "@/components/nexum/OnboardingShell";
import { pickQuestions, SKILLS, type Skill } from "@/lib/skill-tests";
import { ArrowRight, Check, X, Trophy, ShieldCheck, RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding/skill-test")({
  component: Page,
});

function Page() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const userSkills = (user?.skills ?? []).filter((s) => (SKILLS as readonly string[]).includes(s)) as Skill[];
  const [skill, setSkill] = useState<Skill | null>(userSkills[0] ?? null);
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => (skill ? pickQuestions(skill, user?.level ?? "fresher", 5) : []), [skill, user?.level, started]);

  if (!skill) {
    return (
      <OnboardingShell step={3} title="Choose a skill to verify" subtitle="Pass to unlock the marketplace. 5 questions, 1 attempt.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(userSkills.length ? userSkills : (SKILLS as readonly Skill[])).map((s) => (
            <button key={s} onClick={() => setSkill(s)} className="glass rounded-2xl p-5 text-left hover-lift">
              <div className="font-display font-semibold">{s}</div>
              <div className="text-xs text-muted-foreground mt-1">5 questions · {user?.level} level</div>
            </button>
          ))}
        </div>
      </OnboardingShell>
    );
  }

  if (!started) {
    return (
      <OnboardingShell step={3} title={`${skill} skill test`} subtitle={`Difficulty: ${user?.level}. Pass mark: 60%.`}>
        <div className="glass-strong rounded-3xl p-8 text-center">
          <div className="size-16 rounded-2xl gradient-primary grid place-items-center mx-auto shadow-glow"><Trophy className="size-7 text-primary-foreground" /></div>
          <h2 className="font-display text-2xl font-bold mt-5">Ready?</h2>
          <p className="text-muted-foreground mt-2">5 randomized questions. No going back. Take a breath.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
            <button onClick={() => setStarted(true)} className="h-12 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2">
              Start test <ArrowRight className="size-4" />
            </button>
            <button onClick={() => setSkill(null)} className="h-12 px-6 rounded-xl border border-border bg-glass font-medium">Change skill</button>
          </div>
        </div>
      </OnboardingShell>
    );
  }

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100);
    const passed = pct >= 60;
    return (
      <OnboardingShell step={3} title="Result" subtitle="">
        <div className="glass-strong rounded-3xl p-8 text-center">
          <div className={`size-20 rounded-2xl ${passed ? "gradient-primary shadow-glow" : "bg-destructive/20 border border-destructive/40"} grid place-items-center mx-auto`}>
            {passed ? <ShieldCheck className="size-9 text-primary-foreground" /> : <X className="size-9 text-destructive" />}
          </div>
          <h2 className="font-display text-3xl font-bold mt-5">{passed ? "Verified!" : "Not quite"}</h2>
          <p className="text-muted-foreground mt-2">You scored {correct}/{questions.length} · {pct}%</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-2 justify-center">
            {passed ? (
              <button
                onClick={async () => {
                  await updateUser({ verified: true, onboardingStage: "done" });
                  toast.success("Account activated");
                  navigate({ to: "/dashboard" });
                }}
                className="h-12 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2"
              >
                Enter Nexum <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                onClick={() => { setStarted(false); setIdx(0); setPicked(null); setCorrect(0); setFinished(false); }}
                className="h-12 px-6 rounded-xl border border-border bg-glass font-medium inline-flex items-center gap-2"
              >
                <RefreshCcw className="size-4" /> Try again
              </button>
            )}
          </div>
        </div>
      </OnboardingShell>
    );
  }

  const q = questions[idx];

  function submit() {
    if (picked === null) return;
    const isRight = picked === q.correct;
    if (isRight) setCorrect((c) => c + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setFinished(true);
      else {
        setIdx((i) => i + 1);
        setPicked(null);
      }
    }, 450);
  }

  return (
    <OnboardingShell step={3} title={`${skill} skill test`} subtitle={`Question ${idx + 1} of ${questions.length}`}>
      <div className="mb-4 h-1.5 rounded-full bg-surface overflow-hidden">
        <motion.div className="h-full gradient-primary" initial={{ width: 0 }} animate={{ width: `${((idx + 1) / questions.length) * 100}%` }} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="glass-strong rounded-3xl p-8">
          <h2 className="font-display text-2xl font-semibold">{q.q}</h2>
          <div className="mt-6 grid gap-2">
            {q.options.map((opt, i) => {
              const isPicked = picked === i;
              return (
                <button
                  key={i}
                  onClick={() => setPicked(i)}
                  className={`text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${isPicked ? "border-primary bg-primary/10 ring-2 ring-primary/30" : "border-border glass hover-lift"}`}
                >
                  <span className={`size-7 rounded-lg grid place-items-center text-xs font-bold ${isPicked ? "gradient-primary text-primary-foreground" : "bg-surface"}`}>{String.fromCharCode(65 + i)}</span>
                  <span className="text-sm">{opt}</span>
                  {isPicked && <Check className="size-4 text-primary ml-auto" />}
                </button>
              );
            })}
          </div>
          <button disabled={picked === null} onClick={submit} className="mt-6 w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-50">
            {idx + 1 === questions.length ? "Finish" : "Next"} <ArrowRight className="size-4" />
          </button>
        </motion.div>
      </AnimatePresence>
    </OnboardingShell>
  );
}
