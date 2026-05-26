import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/nexum/PageHeader";
import { GlassCard } from "@/components/nexum/GlassCard";
import { inr } from "@/lib/format";
import { CheckCircle2, Clock, AlertTriangle, Sparkles, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/wallet")({
  component: WalletPage,
});

const escrows = [
  { id: "e1", project: "React landing page", client: "Aurora Labs", amount: 18000, status: "funded" as const },
  { id: "e2", project: "Login + signup screens", client: "Northwind", amount: 2500, status: "released" as const },
  { id: "e3", project: "Admin dashboard milestone 1", client: "Helios Corp", amount: 25000, status: "pending" as const },
  { id: "e4", project: "Pricing page redesign", client: "Quill", amount: 1800, status: "disputed" as const },
];

const statusMap = {
  pending: { color: "bg-amber-500/15 text-amber-300 border-amber-500/30", icon: Clock, label: "Pending" },
  funded: { color: "bg-sky-500/15 text-sky-300 border-sky-500/30", icon: Sparkles, label: "Funded" },
  released: { color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", icon: CheckCircle2, label: "Released" },
  disputed: { color: "bg-rose-500/15 text-rose-300 border-rose-500/30", icon: AlertTriangle, label: "Disputed" },
};

function WalletPage() {
  const totalEscrow = escrows.filter((e) => e.status === "funded").reduce((s, e) => s + e.amount, 0);
  const totalPaid = escrows.filter((e) => e.status === "released").reduce((s, e) => s + e.amount, 0);
  return (
    <div>
      <PageHeader eyebrow="Payments" title="Wallet & Escrow" description="Milestone-based payments with Razorpay (test mode)." />
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <GlassCard>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Available balance</div>
          <div className="font-display text-3xl font-bold mt-1 gradient-text">{inr(totalPaid)}</div>
          <button onClick={() => toast.success("Payout initiated (test mode)")} className="mt-3 h-10 px-3 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-glow inline-flex items-center gap-1.5">
            Withdraw <ArrowUpRight className="size-3.5" />
          </button>
        </GlassCard>
        <GlassCard>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">In escrow</div>
          <div className="font-display text-3xl font-bold mt-1 gradient-text">{inr(totalEscrow)}</div>
          <div className="text-xs text-muted-foreground mt-2">Released on client approval</div>
        </GlassCard>
        <GlassCard>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">This month</div>
          <div className="font-display text-3xl font-bold mt-1 gradient-text">{inr(48200)}</div>
          <div className="text-xs text-emerald-300 mt-2">▲ 18% vs last month</div>
        </GlassCard>
      </div>

      <GlassCard className="!p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display font-semibold">Escrow transactions</h3>
          <button onClick={() => toast.success("Razorpay test checkout opened (demo)")} className="h-9 px-3 rounded-lg gradient-primary text-primary-foreground text-xs font-semibold shadow-glow">Fund new escrow</button>
        </div>
        <div className="divide-y divide-border">
          {escrows.map((e) => {
            const s = statusMap[e.status];
            return (
              <div key={e.id} className="flex items-center gap-4 p-4">
                <div className="size-10 rounded-xl bg-primary/15 border border-primary/30 grid place-items-center"><s.icon className="size-4 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{e.project}</div>
                  <div className="text-xs text-muted-foreground">{e.client}</div>
                </div>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md border ${s.color}`}>{s.label}</span>
                <div className="font-display font-semibold w-24 text-right">{inr(e.amount)}</div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
