"use client";

import { useState } from "react";
import type { WeeklyActivityPoint } from "@/types/pulsa";

const SERIES = [
  { key: "feed", label: "Feed", color: "bg-foreground" },
  { key: "carrossel", label: "Carrossel", color: "bg-brand" },
  { key: "reels", label: "Reels", color: "bg-amber-500" },
  { key: "stories", label: "Stories", color: "bg-zinc-300 dark:bg-zinc-600" },
] as const;

export function ActivityChart({ data }: { data: WeeklyActivityPoint[] }) {
  const [activeWeek, setActiveWeek] = useState<string | null>(null);

  const maxTotal = Math.max(
    ...data.map((d) => d.feed + d.carrossel + d.reels + d.stories),
    1,
  );

  const inspected =
    data.find((d) => d.week === activeWeek) ?? data[data.length - 1];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {SERIES.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5 text-[11px] text-foreground-secondary">
              <span className={`h-2 w-2 rounded-sm ${item.color}`} aria-hidden="true" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        {inspected && (
          <div className="text-[11px] text-foreground-muted tabular-nums">
            <span className="font-medium text-foreground">{inspected.week}:</span>{" "}
            {inspected.feed + inspected.carrossel + inspected.reels + inspected.stories}{" "}
            peças
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 pt-2 sm:gap-5">
        {data.map((point) => {
          const total = point.feed + point.carrossel + point.reels + point.stories;
          const heightPct = Math.round((total / maxTotal) * 100);
          const isSelected = inspected?.week === point.week;

          return (
            <button
              key={point.week}
              type="button"
              onMouseEnter={() => setActiveWeek(point.week)}
              onFocus={() => setActiveWeek(point.week)}
              onClick={() => setActiveWeek(point.week)}
              className="group flex flex-col items-center gap-2 text-left focus:outline-none cursor-pointer"
            >
              <div className="flex h-36 w-full items-end justify-center rounded-lg bg-surface-muted/50 px-3 pt-4 pb-2 transition-colors group-hover:bg-surface-muted">
                <div
                  className={`flex w-full max-w-[44px] flex-col-reverse overflow-hidden rounded-md transition-all duration-200 ${
                    isSelected ? "ring-2 ring-brand/40 ring-offset-2 ring-offset-surface" : ""
                  }`}
                  style={{ height: `${Math.max(heightPct, 16)}%` }}
                >
                  {SERIES.map((s) => {
                    const value = point[s.key];
                    if (value === 0) return null;
                    const segPct = (value / total) * 100;
                    return (
                      <div
                        key={s.key}
                        className={`${s.color} w-full transition-opacity`}
                        style={{ height: `${segPct}%` }}
                        title={`${s.label}: ${value}`}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[12px] font-medium ${
                    isSelected ? "text-foreground" : "text-foreground-secondary"
                  }`}
                >
                  {point.week}
                </span>
                <span className="text-[11px] text-foreground-muted tabular-nums">
                  ({total})
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
