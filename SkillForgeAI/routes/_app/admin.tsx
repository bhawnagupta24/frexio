import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { MOCK_FREELANCERS } from "@/lib/mock-data";
import { ShieldCheck, AlertTriangle, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/admin")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div>
      <PageHeader eyebrow="Operations" title="Admin panel" description="Verify users, manage disputes, monitor fraud." />
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <Stat label="Pending verifications" value="14" />
        <Stat label="Open disputes" value="3" />
        <Stat label="Flagged accounts" value="2" />
      </div>
      <GlassCard className="!p-0 overflow-hidden">
        <div className="p-4 border-b border-border font-display font-semibold">Pending verifications</div>
        <div className="divide-y divide-border">
          {MOCK_FREELANCERS.slice(0, 4).map((f) => (
            <div key={f.id} className="flex items-center gap-3 p-4">
              <img src={f.avatar} className="size-10 rounded-xl border border-border" alt="" />
              <div className="flex-1">
                <div className="text-sm font-medium">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.title} · {f.skills.join(", ")}</div>
              </div>
              <button onClick={() => toast.success("Viewing " + f.name)} className="h-9 px-3 rounded-lg border border-border bg-glass text-xs inline-flex items-center gap-1.5"><Eye className="size-3.5" />View</button>
              <button onClick={() => toast.success(f.name + " approved")} className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold shadow-glow inline-flex items-center gap-1.5"><ShieldCheck className="size-3.5" />Approve</button>
              <button onClick={() => toast.error(f.name + " flagged")} className="h-9 px-3 rounded-lg border border-destructive/40 bg-destructive/10 text-destructive text-xs inline-flex items-center gap-1.5"><AlertTriangle className="size-3.5" />Flag</button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-3xl font-bold mt-1 gradient-text">{value}</div>
    </GlassCard>
  );
}
