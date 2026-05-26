import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, ArrowRight, User as UserIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { signUp, signInDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !name) return toast.error("Fill all fields");
    if (password.length < 6) return toast.error("Password must be at least 6 chars");
    setBusy(true);
    try {
      await signUp(email, password, name);
      toast.success("Account created");
      navigate({ to: "/auth/role-select" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Sign up failed";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function demo(role: "client" | "freelancer") {
    setBusy(true);
    await signInDemo(role);
    setBusy(false);
    toast.success(`Signed in as demo ${role}`);
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell title="Create your account" subtitle="Step into the future of freelancing.">
      <form onSubmit={submit} className="space-y-3">
        <Field icon={UserIcon} placeholder="Full name" value={name} onChange={setName} />
        <Field icon={Mail} placeholder="you@email.com" type="email" value={email} onChange={setEmail} />
        <Field icon={Lock} placeholder="Password (6+ chars)" type="password" value={password} onChange={setPassword} />
        <button disabled={busy} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-50">
          Continue <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> OR EXPLORE INSTANTLY <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => demo("freelancer")} disabled={busy} className="h-11 rounded-xl glass border border-border text-sm font-medium hover-lift inline-flex items-center justify-center gap-1.5">
          <Sparkles className="size-3.5 text-primary" /> Demo Freelancer
        </button>
        <button onClick={() => demo("client")} disabled={busy} className="h-11 rounded-xl glass border border-border text-sm font-medium hover-lift inline-flex items-center justify-center gap-1.5">
          <Sparkles className="size-3.5 text-primary" /> Demo Client
        </button>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-6">
        Already have an account?{" "}
        <Link to="/auth/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2">
          <div className="size-10 rounded-xl gradient-primary grid place-items-center shadow-glow">
            <Zap className="size-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">Nexum<span className="text-primary">.</span>AI</span>
        </Link>
        <div className="relative">
          <h2 className="font-display text-4xl font-bold leading-tight max-w-md">The freelancing OS built for the AI era.</h2>
          <p className="text-muted-foreground mt-4 max-w-md">Skill verification, trust scoring, AI matching, escrow payments, micro-internships — all in one place.</p>
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
            {[{ k: "Verified", v: "12k+" }, { k: "Jobs", v: "8.4k" }, { k: "Trust avg", v: "87" }].map((s) => (
              <div key={s.k} className="glass rounded-xl p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
                <div className="font-display text-xl font-semibold gradient-text">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-muted-foreground">© {new Date().getFullYear()} Nexum AI</p>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md glass-strong rounded-3xl p-8 shadow-elegant">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-6">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center"><Zap className="size-5 text-primary-foreground" /></div>
            <span className="font-display font-bold text-lg">Nexum<span className="text-primary">.</span>AI</span>
          </Link>
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

export function Field({
  icon: Icon, placeholder, type = "text", value, onChange,
}: { icon: React.ComponentType<{ className?: string }>; placeholder: string; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Icon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-10 pr-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
      />
    </div>
  );
}
