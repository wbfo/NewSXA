"use client";

import type { PropsWithChildren } from "react";

export function Panel({ title, children, aside }: PropsWithChildren<{ title: string; aside?: React.ReactNode }>) {
  return (
    <section className="panel">
      <div className="split-row" style={{ marginBottom: 12 }}>
        <div className="panel-title">{title}</div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function Badge({ label, tone = "default" }: { label: string; tone?: "default" | "green" | "red" | "orange" | "teal" | "purple" }) {
  const colorMap = {
    default: "var(--subtle)",
    green: "var(--green)",
    red: "var(--red)",
    orange: "var(--orange)",
    teal: "var(--teal)",
    purple: "var(--purple)"
  };
  return (
    <span className="pill" style={{ color: colorMap[tone], borderColor: `${colorMap[tone]}55` }}>
      {label}
    </span>
  );
}

export function ProgressBar({ value, color = "var(--gold)" }: { value: number; color?: string }) {
  return (
    <div className="progress">
      <span style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }} />
    </div>
  );
}
