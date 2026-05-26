import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Trophy,
  Users,
  Briefcase,
  ArrowRight,
  Keyboard,
  Wallet,
  Bot,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { fadeUp, stagger } from "@/lib/motion";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-9 rounded-xl gradient-primary grid place-items-center shadow-glow">
              <Zap className="size-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">Nexum<span className="text-primary">.</span>AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#talent" className="hover:text-foreground transition-colors">For talent</a>
            <a href="#clients" className="hover:text-foreground transition-colors">For clients</a>
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link to="/dashboard" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-glow">
                Dashboard <ArrowRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link to="/auth/login" className="hidden sm:inline-flex h-10 px-4 items-center text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
                <Link to="/auth/signup" className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-glow">
                  Get started <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 lg:pt-28 pb-20 text-center">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs glass border border-primary/30 mb-6">
            <Sparkles className="size-3.5 text-primary" />
            <span>AI-powered freelancing ecosystem · v1.0</span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Where verified talent
            <br />
            meets <span className="gradient-text">intelligent work.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            Nexum AI verifies skills, scores trust, runs micro-internships, holds escrow,
            and matches the right people to the right work — all in one futuristic workspace.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth/signup" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover-lift">
              Start free <ArrowRight className="size-4" />
            </Link>
            <Link to="/auth/login" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl glass border border-border font-semibold hover-lift">
              Try the demo
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            {["Aadhaar-verified talent", "Escrow with Razorpay", "Skill-verified freelancers", "GitHub-style activity", "AI matching"].map((t) => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-primary" />{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Mock dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-x-10 -inset-y-6 gradient-primary opacity-30 blur-3xl rounded-full" />
          <div className="relative glass-strong rounded-3xl border border-border p-3 shadow-elegant">
            <div className="rounded-2xl overflow-hidden border border-border bg-background/50">
              <div className="grid grid-cols-12 gap-3 p-4">
                <div className="col-span-3 space-y-2">
                  {["Dashboard", "Jobs", "Trials", "Messages", "Wallet", "Typing Arena"].map((x, i) => (
                    <div key={x} className={`h-8 rounded-lg px-3 flex items-center text-xs ${i === 0 ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground bg-glass border border-border"}`}>{x}</div>
                  ))}
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-3">
                  {[
                    { l: "Trust Score", v: "92" },
                    { l: "This week", v: "₹48,200" },
                    { l: "Match rate", v: "97%" },
                  ].map((s) => (
                    <div key={s.l} className="glass rounded-xl p-4">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                      <div className="font-display text-2xl font-semibold mt-1 gradient-text">{s.v}</div>
                    </div>
                  ))}
                  <div className="col-span-3 glass rounded-xl p-4 h-40">
                    <div className="text-xs text-muted-foreground mb-3">Activity</div>
                    <div className="flex gap-[3px] flex-wrap">
                      {Array.from({ length: 180 }).map((_, i) => (
                        <div key={i} className="size-2 rounded-sm" style={{ background: `oklch(${0.3 + (i % 5) * 0.1} 0.1 230 / ${0.3 + (i % 5) * 0.15})` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">An entire OS for freelancing</div>
          <h2 className="font-display text-3xl md:text-5xl font-bold">Everything modern teams expect.</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Verification, payments, productivity, growth — wired together by AI. No tab juggling.</p>
        </div>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { i: ShieldCheck, t: "Skill verification", d: "Adaptive 5-question tests per skill & level. Pass to unlock the marketplace." },
            { i: Sparkles, t: "AI matching", d: "Compatibility scoring on every job & freelancer card. No more guesswork." },
            { i: Briefcase, t: "Jobs & micro-trials", d: "Long projects, paid trials, internship-style tasks for freshers." },
            { i: Wallet, t: "Escrow with Razorpay", d: "Funded, released, disputed — clear states. Test mode included." },
            { i: Trophy, t: "Trust scoring", d: "Streaks, deliveries, reviews → a single number you can build a career on." },
            { i: Keyboard, t: "Typing Arena", d: "Real typing game, history, leaderboard. Sharpen speed while you wait." },
            { i: Users, t: "Team finder", d: "Assemble cross-skill squads with AI suggestions in seconds." },
            { i: Bot, t: "Activity heatmap", d: "GitHub-style 52-week graph of every contribution." },
            { i: Zap, t: "Built for India", d: "Aadhaar-aware identity, INR pricing, Razorpay native." },
          ].map((f) => (
            <motion.div key={f.t} variants={fadeUp} className="glass rounded-2xl p-6 hover-lift">
              <div className="size-11 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center text-primary mb-4">
                <f.i className="size-5" />
              </div>
              <h3 className="font-display font-semibold text-lg">{f.t}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{f.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold">From signup to first payout.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { n: "01", t: "Sign up & pick role", d: "Freelancer or Client. 30 seconds." },
            { n: "02", t: "Verify identity & skills", d: "Aadhaar-style flow + adaptive skill tests." },
            { n: "03", t: "Match & collaborate", d: "AI surfaces the best fits. Chat, meet, deliver." },
            { n: "04", t: "Get paid via escrow", d: "Razorpay-powered, milestone-based releases." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-6 hover-lift">
              <div className="font-display text-3xl font-bold gradient-text">{s.n}</div>
              <div className="font-semibold mt-2">{s.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 lg:px-8 py-20">
        <div className="relative glass-strong rounded-3xl p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute -inset-x-20 -top-20 h-60 gradient-primary opacity-30 blur-3xl" />
          <h2 className="relative font-display text-3xl md:text-5xl font-bold">Build the freelancing career you actually want.</h2>
          <p className="relative text-muted-foreground mt-3 max-w-xl mx-auto">Verified, matched, paid on time. Start free — no credit card.</p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth/signup" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow">
              Create your account <ArrowRight className="size-4" />
            </Link>
            <Link to="/auth/login" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-border bg-glass font-semibold">
              See live demo
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Nexum AI · Built for the next decade of work.
      </footer>
    </div>
  );
}
