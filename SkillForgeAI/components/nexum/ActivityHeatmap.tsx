import { activityData } from "@/lib/mock-data";
import { useMemo } from "react";

export function ActivityHeatmap({ seed = 42 }: { seed?: number }) {
  const days = useMemo(() => activityData(seed), [seed]);
  // group into 53 weeks of 7 days starting from sunday
  const weeks: typeof days[] = [];
  let current: typeof days = [];
  // pad start to align to sunday
  const firstDow = days[0].date.getDay();
  for (let i = 0; i < firstDow; i++) current.push({ date: new Date(0), count: -1 });
  for (const d of days) {
    current.push(d);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length) weeks.push(current);

  const colorFor = (c: number) => {
    if (c < 0) return "transparent";
    if (c === 0) return "oklch(0.26 0.035 260)";
    if (c === 1) return "oklch(0.42 0.10 230)";
    if (c === 2) return "oklch(0.55 0.14 230)";
    if (c === 3) return "oklch(0.66 0.16 230)";
    return "oklch(0.78 0.18 225)";
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-[3px] min-w-fit">
        {weeks.map((w, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {w.map((d, di) => (
              <div
                key={di}
                title={d.count >= 0 ? `${d.date.toDateString()}: ${d.count} contributions` : ""}
                className="size-[11px] rounded-[3px] transition-all hover:scale-[1.4] hover:ring-1 hover:ring-primary/60"
                style={{ background: colorFor(d.count) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((n) => (
          <div key={n} className="size-3 rounded-sm" style={{ background: colorFor(n) }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
