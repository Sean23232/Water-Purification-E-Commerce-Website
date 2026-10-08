"use client";

import { QuoteForm } from "@/components/QuoteForm";

export default function QuotePrefill({
  defaultSystem = "",
  selected = null,
}: {
  defaultSystem?: string;
  selected?: { name: string; sku: string } | null;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <span className="micro text-navy">Quote request form</span>
        <span className="h-px flex-1 bg-rule" />
      </div>
      {selected ? (
        <div className="mb-6 flex flex-wrap items-center gap-3 border border-water/40 bg-water/6 px-4 py-3">
          <span className="micro-sm text-water">Selected product</span>
          <span className="font-display text-[15px] font-bold text-navy">{selected.name}</span>
          <span className="micro-sm text-mute">{selected.sku}</span>
        </div>
      ) : null}
      <QuoteForm defaultSystem={defaultSystem} />
    </div>
  );
}
