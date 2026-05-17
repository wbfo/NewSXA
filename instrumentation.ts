export async function register() {
  // Only run on Node.js runtime (not edge), and only in production or when explicitly enabled
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  // In development, only run catch-up if ENABLE_AGENT_CATCHUP=true is set
  // In production, always run
  const shouldRun =
    process.env.NODE_ENV === "production" ||
    process.env.ENABLE_AGENT_CATCHUP === "true";

  if (!shouldRun) return;

  // Fire and forget — don't block server startup
  void (async () => {
    try {
      const { runMissedAgents } = await import("@/lib/server/agent-scheduler");
      await runMissedAgents();
    } catch (err) {
      // Never crash the server startup
      console.error("[Scheduler] Catch-up failed during startup:", err);
    }
  })();
}
