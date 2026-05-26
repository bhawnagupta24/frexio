import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { TYPING_PARAGRAPHS, saveTypingScore } from "@/lib/mock-data";
import { Keyboard, RefreshCcw, Trophy, History } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/typing-arena")({
  component: TypingArena,
});

function TypingArena() {
  const [text] = useState(() => TYPING_PARAGRAPHS[Math.floor(Math.random() * TYPING_PARAGRAPHS.length)]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!started || done) return;
    const t = setInterval(() => setElapsed((Date.now() - started) / 1000), 100);
    return () => clearInterval(t);
  }, [started, done]);

  const correctChars = useMemo(() => {
    let n = 0;
    for (let i = 0; i < input.length; i++) if (input[i] === text[i]) n++;
    return n;
  }, [input, text]);
  const accuracy = input.length ? (correctChars / input.length) * 100 : 100;
  const words = input.trim() ? input.trim().split(/\s+/).length : 0;
  const wpm = elapsed > 0 ? Math.round((words / elapsed) * 60) : 0;
  const progress = Math.min(100, (input.length / text.length) * 100);

  useEffect(() => {
    if (!done && input.length >= text.length && started) {
      setDone(true);
      const acc = Math.round(accuracy * 10) / 10;
      saveTypingScore({ id: "s_" + Date.now(), wpm, accuracy: acc, at: Date.now() });
      toast.success(`Saved: ${wpm} WPM · ${acc}% accuracy`);
    }
  }, [input, text, done, started, wpm, accuracy]);

  function reset() {
    setInput(""); setStarted(null); setElapsed(0); setDone(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Productivity"
        title="Typing Arena"
        description="Real-time WPM, accuracy and history. Sharpen daily."
        actions={
          <div className="flex gap-2">
            <Link to="/typing-arena/history" className="h-10 px-3 rounded-xl border border-border bg-glass text-sm inline-flex items-center gap-1.5"><History className="size-4" />History</Link>
            <Link to="/leaderboard" className="h-10 px-3 rounded-xl border border-border bg-glass text-sm inline-flex items-center gap-1.5"><Trophy className="size-4" />Leaderboard</Link>
          </div>
        }
      />

      <div className="grid lg:grid-cols-4 gap-4 mb-4">
        <Stat label="WPM" value={String(wpm)} />
        <Stat label="Accuracy" value={`${accuracy.toFixed(1)}%`} />
        <Stat label="Time" value={`${elapsed.toFixed(1)}s`} />
        <Stat label="Progress" value={`${progress.toFixed(0)}%`} />
      </div>

      <GlassCard>
        <div className="font-mono text-lg leading-relaxed select-none">
          {text.split("").map((ch, i) => {
            let cls = "text-muted-foreground";
            if (i < input.length) cls = input[i] === ch ? "text-foreground" : "text-destructive underline";
            if (i === input.length) cls = "text-primary border-l-2 border-primary";
            return <span key={i} className={cls}>{ch}</span>;
          })}
        </div>
        <textarea
          ref={inputRef}
          value={input}
          autoFocus
          onChange={(e) => { if (!started) setStarted(Date.now()); if (!done) setInput(e.target.value); }}
          rows={4}
          placeholder="Start typing…"
          className="mt-4 w-full p-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none font-mono text-sm"
        />
        <div className="mt-4 flex items-center gap-2">
          <button onClick={reset} className="h-11 px-4 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow inline-flex items-center gap-2"><RefreshCcw className="size-4" />New sprint</button>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground"><Keyboard className="size-4" />Focus mode</div>
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
