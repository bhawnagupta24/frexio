// Pathless onboarding shell wrapper — exported as a component, not a route.
import { Link } from "@tanstack/react-router";
import { Zap, Check } from "lucide-react";

const steps = [
  { n: 1, label: "Profile" },
  { n: 2, label: "Verification" },
  { n: 3, label: "Skill test" },
];

export function OnboardingShell({
  step,
  title,
  subtitle,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto h-16 px-4 lg:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center shadow-glow"><Zap className="size-5 text-primary-foreground" /></div>
            <span className="font-display font-bold text-lg">Nexum<span className="text-primary">.</span>AI</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            {steps.map((s, i) => {
              const done = step > s.n;
              const cur = step === s.n;
              return (
                <div key={s.n} className="flex items-center gap-2">
                  <div className={`size-7 rounded-lg grid place-items-center text-[11px] font-bold ${done ? "gradient-primary text-primary-foreground" : cur ? "ring-2 ring-primary/60 bg-surface" : "bg-surface text-muted-foreground"}`}>
                    {done ? <Check className="size-3.5" /> : s.n}
                  </div>
                  <span className={`text-xs ${cur ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                  {i < steps.length - 1 && <div className="w-8 h-px bg-border mx-1" />}
                </div>
              );
            })}
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-10">
        <div className="mb-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
