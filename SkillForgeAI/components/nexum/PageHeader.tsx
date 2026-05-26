import { type ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-primary mb-2 px-2 py-1 rounded-md bg-primary/10 border border-primary/30">
            <span className="size-1.5 rounded-full bg-primary pulse-glow" />
            {eyebrow}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1.5 max-w-2xl">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
