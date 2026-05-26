import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import { AuthShell, Field } from "./signup";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signInDemo } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await signIn(email, password);
      toast.success("Welcome back");
      navigate({ to: "/dashboard" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  async function demo(role: "client" | "freelancer") {
    await signInDemo(role);
    toast.success(`Signed in as demo ${role}`);
    navigate({ to: "/dashboard" });
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your Nexum workspace.">
      <form onSubmit={submit} className="space-y-3">
        <Field icon={Mail} placeholder="you@email.com" type="email" value={email} onChange={setEmail} />
        <Field icon={Lock} placeholder="Password" type="password" value={password} onChange={setPassword} />
        <button disabled={busy} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-50">
          Sign in <ArrowRight className="size-4" />
        </button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> OR EXPLORE INSTANTLY <div className="h-px flex-1 bg-border" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => demo("freelancer")} className="h-11 rounded-xl glass border border-border text-sm font-medium hover-lift inline-flex items-center justify-center gap-1.5">
          <Sparkles className="size-3.5 text-primary" /> Demo Freelancer
        </button>
        <button onClick={() => demo("client")} className="h-11 rounded-xl glass border border-border text-sm font-medium hover-lift inline-flex items-center justify-center gap-1.5">
          <Sparkles className="size-3.5 text-primary" /> Demo Client
        </button>
      </div>
      <p className="text-sm text-muted-foreground text-center mt-6">
        New to Nexum?{" "}
        <Link to="/auth/signup" className="text-primary hover:underline">Create account</Link>
      </p>
    </AuthShell>
  );
}
