import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { user, updateUser, signOut } = useAuth();
  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader eyebrow="Account" title="Settings" />
      <GlassCard className="space-y-4">
        <Row label="Name" value={user?.name ?? ""} onChange={(v) => updateUser({ name: v })} />
        <Row label="Email" value={user?.email ?? ""} onChange={(v) => updateUser({ email: v })} />
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <div className="font-medium">Notifications</div>
            <div className="text-xs text-muted-foreground">Email + push (demo)</div>
          </div>
          <button onClick={() => toast.success("Updated")} className="h-9 px-3 rounded-lg border border-border bg-glass text-sm">Enabled</button>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <div className="font-medium text-destructive">Sign out</div>
            <div className="text-xs text-muted-foreground">End your session.</div>
          </div>
          <button onClick={() => signOut()} className="h-9 px-3 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive text-sm">Sign out</button>
        </div>
      </GlassCard>
    </div>
  );
}

function Row({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-input/60 border border-border outline-none text-sm" />
    </div>
  );
}
