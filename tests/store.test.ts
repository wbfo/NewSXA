import { describe, expect, it, beforeEach } from "vitest";
import { resetStore, readDashboard } from "@/lib/server/store";
import { buildHermesAgents, getHermesStatusSummary } from "@/lib/hermes/runtime";

describe("real store bootstrap", () => {
  beforeEach(async () => {
    await resetStore();
  });

  it("bootstraps an empty dashboard with real Hermes status", async () => {
    const state = await readDashboard();
    expect(state.audits).toHaveLength(0);
    expect(state.pipeline).toHaveLength(0);
    expect(state.agents.length).toBeGreaterThan(0);
  });

  it("detects Hermes installation state", async () => {
    const status = await getHermesStatusSummary();
    const agents = await buildHermesAgents();
    // Intentionally not asserting installed === true — Hermes may not be present in CI.
    expect(typeof status.installed).toBe("boolean");
    expect(Array.isArray(agents)).toBe(true);
  });
});
