import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MOCK_THREADS, MOCK_MESSAGES, type Message } from "@/lib/mock-data";
import { GlassCard } from "@/components/nexum/GlassCard";
import { Send, Search } from "lucide-react";
import { relativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const [activeId, setActiveId] = useState(MOCK_THREADS[0].id);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[activeId] ?? []);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(MOCK_MESSAGES[activeId] ?? []);
  }, [activeId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: "u_" + Date.now(), from: "me", text, at: Date.now(), seen: false }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: "r_" + Date.now(), from: "them", text: "Got it — replying soon!", at: Date.now(), seen: false }]);
      setTyping(false);
    }, 1100);
  }

  const active = MOCK_THREADS.find((t) => t.id === activeId)!;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-12rem)]">
      <GlassCard className="!p-0 overflow-hidden flex flex-col">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Search conversations…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-input/60 border border-border outline-none text-sm" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {MOCK_THREADS.map((t) => (
            <button key={t.id} onClick={() => setActiveId(t.id)} className={cn("w-full text-left flex items-center gap-3 p-3 border-b border-border hover:bg-surface/50 transition-colors", t.id === activeId && "bg-surface/60")}>
              <div className="relative shrink-0">
                <img src={t.with.avatar} className="size-11 rounded-xl border border-border" alt="" />
                {t.with.online && <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-background" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between"><span className="text-sm font-medium truncate">{t.with.name}</span><span className="text-[10px] text-muted-foreground">{relativeTime(t.lastAt)}</span></div>
                <div className="text-xs text-muted-foreground truncate">{t.lastMessage}</div>
              </div>
              {t.unread > 0 && <span className="size-5 rounded-full gradient-primary text-[10px] font-bold text-primary-foreground grid place-items-center">{t.unread}</span>}
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="!p-0 flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <img src={active.with.avatar} className="size-10 rounded-xl border border-border" alt="" />
          <div>
            <div className="font-medium">{active.with.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">{active.with.online && <span className="size-1.5 rounded-full bg-success" />}{active.with.online ? "Online" : "Offline"}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[75%] px-4 py-2.5 rounded-2xl text-sm", m.from === "me" ? "gradient-primary text-primary-foreground rounded-br-sm shadow-glow" : "bg-surface border border-border rounded-bl-sm")}>
                <div>{m.text}</div>
                <div className={cn("text-[10px] mt-1 opacity-70", m.from === "me" ? "text-primary-foreground" : "text-muted-foreground")}>{new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          ))}
          {typing && <div className="text-xs text-muted-foreground">typing<span className="animate-pulse">…</span></div>}
          <div ref={endRef} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="p-3 border-t border-border flex items-center gap-2">
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message…" className="flex-1 h-11 px-3 rounded-xl bg-input/60 border border-border focus:border-primary/60 outline-none text-sm" />
          <button type="submit" className="h-11 px-4 rounded-xl gradient-primary text-primary-foreground shadow-glow inline-flex items-center gap-2 text-sm font-semibold"><Send className="size-4" />Send</button>
        </form>
      </GlassCard>
    </div>
  );
}
