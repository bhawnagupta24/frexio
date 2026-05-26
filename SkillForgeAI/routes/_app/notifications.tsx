import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { MOCK_NOTIFS } from "@/lib/mock-data";
import { relativeTime } from "@/lib/format";
import { Briefcase, Wallet, Trophy, Video, MessageSquare, Sparkles } from "lucide-react";

const icons = { job: Briefcase, payment: Wallet, badge: Trophy, meeting: Video, message: MessageSquare, trial: Sparkles } as const;

export const Route = createFileRoute("/_app/notifications")({
  component: Notifications,
});

function Notifications() {
  return (
    <div>
      <PageHeader eyebrow="Activity" title="Notifications" />
      <GlassCard className="!p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {MOCK_NOTIFS.map((n) => {
            const Icon = icons[n.kind];
            return (
              <div key={n.id} className="flex items-start gap-3 p-4 hover:bg-surface/40 transition-colors">
                <div className="size-10 rounded-xl gradient-primary grid place-items-center shrink-0"><Icon className="size-4 text-primary-foreground" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium">{n.title}</div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{relativeTime(n.at)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{n.body}</div>
                </div>
                {!n.read && <span className="size-2 rounded-full bg-primary mt-2" />}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
