import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Briefcase, Code2, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/role-select")({
  component: RoleSelect,
});

function RoleSelect() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  async function pick(role: "freelancer" | "client") {
    if (!user) return navigate({ to: "/auth/signup" });
    await updateUser({
      role,
      onboardingStage: role === "freelancer" ? "profile" : "done",
    });
    toast.success(`Welcome, ${role}!`);
    if (role === "freelancer") navigate({ to: "/onboarding/freelancer-profile" });
    else navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <div className="max-w-3xl w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs glass border border-primary/30 mb-4">
            <Sparkles className="size-3.5 text-primary" /> One last step
          </div>
          <h1 className="font-display text-4xl font-bold">How will you use Nexum?</h1>
          <p className="text-muted-foreground mt-2">You can always add the other role later.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { role: "freelancer" as const, icon: Code2, title: "I'm a freelancer", desc: "Verify skills, build trust, find world-class clients." },
            { role: "client" as const, icon: Briefcase, title: "I'm a client", desc: "Hire AI-matched, skill-verified talent in minutes." },
          ].map((opt, i) => (
            <motion.button
              key={opt.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => pick(opt.role)}
              className="text-left glass-strong rounded-3xl p-8 hover-lift group"
            >
              <div className="size-14 rounded-2xl gradient-primary grid place-items-center shadow-glow mb-5">
                <opt.icon className="size-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold">{opt.title}</h3>
              <p className="text-muted-foreground mt-2">{opt.desc}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                Continue <ArrowRight className="size-4" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
