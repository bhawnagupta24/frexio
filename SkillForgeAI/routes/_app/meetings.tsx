import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { Video, Plus, Copy } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/meetings")({
  component: Meetings,
});

const upcoming = [
  { id: "m1", title: "Aurora Labs · Kickoff", at: Date.now() + 86400000, code: "AUR-2581" },
  { id: "m2", title: "Helios Corp · Sprint review", at: Date.now() + 86400000 * 3, code: "HEL-9034" },
];

function Meetings() {
  const [code, setCode] = useState("");
  return (
    <div>
      <PageHeader eyebrow="Connect" title="Meetings" description="Create rooms, schedule interviews, jump on calls fast." />
      <div className="grid lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-1">
          <h3 className="font-display font-semibold mb-3">Quick actions</h3>
          <button onClick={() => toast.success("Room created: NEX-" + Math.random().toString(36).slice(2, 6).toUpperCase())} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center justify-center gap-2 mb-2">
            <Plus className="size-4" /> Create room
          </button>
          <div className="flex gap-2">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code…" className="flex-1 h-11 px-3 rounded-xl bg-input/60 border border-border outline-none text-sm" />
            <button onClick={() => toast.success("Joining " + (code || "room"))} className="h-11 px-4 rounded-xl border border-border bg-glass text-sm font-medium">Join</button>
          </div>
        </GlassCard>
        <GlassCard className="lg:col-span-2">
          <h3 className="font-display font-semibold mb-3">Upcoming</h3>
          <div className="space-y-2">
            {upcoming.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface/40 border border-border">
                <div className="size-10 rounded-xl gradient-primary grid place-items-center"><Video className="size-4 text-primary-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{m.title}</div>
                  <div className="text-xs text-muted-foreground">{new Date(m.at).toLocaleString()}</div>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(m.code); toast.success("Code copied"); }} className="h-9 px-3 rounded-lg border border-border bg-glass text-xs inline-flex items-center gap-1.5"><Copy className="size-3.5" />{m.code}</button>
                <button onClick={() => toast.success("Joining " + m.code)} className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold shadow-glow">Join</button>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
