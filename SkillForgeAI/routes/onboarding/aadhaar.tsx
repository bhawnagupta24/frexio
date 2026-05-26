import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { OnboardingShell } from "@/components/nexum/OnboardingShell";
import { ShieldCheck, ArrowRight, Upload, Camera, FileLock2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding/aadhaar")({
  component: Page,
});

function Page() {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const [aadhaar, setAadhaar] = useState("");
  const [idUploaded, setIdUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [busy, setBusy] = useState(false);

  function valid(n: string) {
    return /^\d{4}\s?\d{4}\s?\d{4}$/.test(n.trim());
  }

  async function submit() {
    if (!valid(aadhaar)) return toast.error("Enter a valid 12-digit Aadhaar number");
    if (!idUploaded || !selfieUploaded) return toast.error("Upload both ID and selfie");
    setBusy(true);
    // Simulated verification
    await new Promise((r) => setTimeout(r, 1400));
    await updateUser({ aadhaarVerified: true, onboardingStage: "skill-test" });
    setBusy(false);
    toast.success("Identity verified");
    navigate({ to: "/onboarding/skill-test" });
  }

  return (
    <OnboardingShell step={2} title="Verify your identity" subtitle="DigiLocker-style flow — secure & encrypted in transit.">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-strong rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/10 border border-primary/30">
          <ShieldCheck className="size-5 text-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-medium">Your data is private</div>
            <div className="text-muted-foreground mt-0.5">We only store a verification flag, not your Aadhaar number, in this demo build.</div>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Aadhaar number</label>
          <input
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value)}
            inputMode="numeric"
            placeholder="XXXX XXXX XXXX"
            className="mt-1 w-full h-12 px-4 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none tracking-widest font-mono"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <UploadCard icon={FileLock2} label="Government ID" hint="Aadhaar / PAN / Passport" done={idUploaded} onClick={() => setIdUploaded(true)} />
          <UploadCard icon={Camera} label="Live selfie" hint="Face the camera, well-lit" done={selfieUploaded} onClick={() => setSelfieUploaded(true)} />
        </div>

        <button disabled={busy} onClick={submit} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-60">
          {busy ? (
            <>
              <Sparkles className="size-4 animate-spin" /> Verifying…
            </>
          ) : (
            <>
              Verify identity <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </motion.div>
    </OnboardingShell>
  );
}

function UploadCard({
  icon: Icon, label, hint, done, onClick,
}: { icon: React.ComponentType<{ className?: string }>; label: string; hint: string; done: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`text-left rounded-2xl p-5 border transition-all hover-lift ${done ? "border-primary/50 bg-primary/10" : "glass border-border"}`}>
      <div className="flex items-center gap-3">
        <div className={`size-10 rounded-xl grid place-items-center ${done ? "gradient-primary text-primary-foreground shadow-glow" : "bg-surface"}`}>
          <Icon className="size-5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold">{label}</div>
          <div className="text-xs text-muted-foreground">{hint}</div>
        </div>
        {done ? <span className="text-xs text-primary font-semibold">Uploaded</span> : <Upload className="size-4 text-muted-foreground" />}
      </div>
    </button>
  );
}
