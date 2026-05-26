import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { clearTypingScores, deleteTypingScore, loadTypingScores, type TypingScore } from "@/lib/mock-data";
import { Trash2, X } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/typing-arena/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [scores, setScores] = useState<TypingScore[]>([]);
  useEffect(() => { setScores(loadTypingScores()); }, []);
  const best = scores.reduce((m, s) => Math.max(m, s.wpm), 0);
  const avg = scores.length ? Math.round(scores.reduce((s, x) => s + x.wpm, 0) / scores.length) : 0;
  const accBest = scores.reduce((m, s) => Math.max(m, s.accuracy), 0);
  const latest = scores[0]?.wpm ?? 0;
  const chart = [...scores].reverse().map((s, i) => ({ name: `#${i + 1}`, wpm: s.wpm, acc: s.accuracy }));

  return (
    <div>
      <PageHeader
        eyebrow="Progress"
        title="Typing History"
        description="Every attempt logged. Watch your speed climb."
        actions={
          <button onClick={() => { clearTypingScores(); setScores([]); toast.success("History cleared"); }} className="h-10 px-3 rounded-xl border border-border bg-glass text-sm inline-flex items-center gap-1.5">
            <Trash2 className="size-4" /> Clear history
          </button>
        }
      />
      <div className="grid sm:grid-cols-4 gap-4 mb-4">
        <Stat label="Latest" value={latest ? `${latest} wpm` : "—"} />
        <Stat label="Best" value={best ? `${best} wpm` : "—"} />
        <Stat label="Average" value={avg ? `${avg} wpm` : "—"} />
        <Stat label="Top accuracy" value={accBest ? `${accBest.toFixed(1)}%` : "—"} />
      </div>
      <GlassCard className="mb-4">
        <h3 className="font-display font-semibold mb-2">Progression</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chart}>
              <XAxis dataKey="name" stroke="oklch(0.6 0.02 250)" tick={{ fontSize: 11 }} />
              <YAxis stroke="oklch(0.6 0.02 250)" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.04 260)", border: "1px solid oklch(0.32 0.04 260 / 0.5)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="wpm" stroke="oklch(0.74 0.17 230)" strokeWidth={2.5} dot={{ r: 3, fill: "oklch(0.82 0.18 215)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard className="!p-0 overflow-hidden">
        {scores.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">No attempts yet. Run your first sprint!</div>
        ) : (
          <div className="divide-y divide-border">
            {scores.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-4">
                <div className="size-9 rounded-lg gradient-primary grid place-items-center text-xs font-bold text-primary-foreground">{scores.length - i}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{s.wpm} WPM · {s.accuracy.toFixed(1)}% accuracy</div>
                  <div className="text-xs text-muted-foreground">{new Date(s.at).toLocaleString()}</div>
                </div>
                <button onClick={() => { deleteTypingScore(s.id); setScores(loadTypingScores()); }} className="size-9 grid place-items-center rounded-lg border border-border bg-glass hover:bg-destructive/15 hover:text-destructive">
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-2xl font-bold mt-1 gradient-text">{value}</div>
    </GlassCard>
  );
}
