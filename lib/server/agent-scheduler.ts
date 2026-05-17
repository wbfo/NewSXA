import { getAgentLastRuns } from "@/lib/server/store";
import { logger } from "@/lib/server/logger";

type AgentId = "cfo" | "followup" | "outreach" | "research";

interface AgentSchedule {
  hour: number;       // UTC hour
  days: number[];     // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
  label: string;
}

const SCHEDULES: Record<AgentId, AgentSchedule> = {
  cfo:      { hour: 7, days: [0,1,2,3,4,5,6], label: "CFO Agent (daily 07:00 UTC)" },
  followup: { hour: 8, days: [0,1,2,3,4,5,6], label: "Follow-Up Agent (daily 08:00 UTC)" },
  outreach: { hour: 9, days: [0,1,2,3,4,5,6], label: "Outreach Agent (daily 09:00 UTC)" },
  research: { hour: 6, days: [1,3,5],          label: "Research Agent (Mon/Wed/Fri 06:00 UTC)" },
};

/**
 * Returns the most recent datetime when this agent SHOULD have run,
 * looking back up to 7 days. Returns null if no scheduled time found.
 */
function getLastScheduledTime(schedule: AgentSchedule, now: Date): Date | null {
  for (let daysBack = 0; daysBack <= 7; daysBack++) {
    const candidate = new Date(now);
    candidate.setUTCDate(candidate.getUTCDate() - daysBack);
    candidate.setUTCHours(schedule.hour, 0, 0, 0);
    candidate.setUTCMinutes(0);
    candidate.setUTCSeconds(0);
    candidate.setUTCMilliseconds(0);

    const dayOfWeek = candidate.getUTCDay();
    if (schedule.days.includes(dayOfWeek) && candidate <= now) {
      return candidate;
    }
  }
  return null;
}

export async function runMissedAgents(): Promise<void> {
  const now = new Date();
  const lastRuns = await getAgentLastRuns();

  const { runCfoAgent, runFollowupAgent, runOutreachAgent, runResearchAgent } = await import("@/lib/agents/runner");

  const runners: Record<AgentId, () => Promise<void>> = {
    cfo:      runCfoAgent,
    followup: runFollowupAgent,
    outreach: runOutreachAgent,
    research: runResearchAgent,
  };

  for (const [id, schedule] of Object.entries(SCHEDULES) as [AgentId, AgentSchedule][]) {
    const lastScheduled = getLastScheduledTime(schedule, now);
    if (!lastScheduled) continue;

    const lastRan = lastRuns[id] ? new Date(lastRuns[id]!) : null;
    const isMissed = !lastRan || lastRan < lastScheduled;

    if (isMissed) {
      const missedBy = lastRan
        ? `last ran ${Math.round((now.getTime() - lastRan.getTime()) / 60000)} min ago, scheduled ${Math.round((now.getTime() - lastScheduled.getTime()) / 60000)} min ago`
        : "never ran before";
      logger.info({ agentId: id, missedBy }, `[Scheduler] Catch-up: running missed ${schedule.label}`);
      try {
        await runners[id]();
        logger.info({ agentId: id }, `[Scheduler] Catch-up complete for ${id}`);
      } catch (err) {
        logger.error({ agentId: id, error: err }, `[Scheduler] Catch-up failed for ${id}`);
      }
    } else {
      logger.info({ agentId: id, lastRan: lastRan?.toISOString() }, `[Scheduler] ${id} is up to date, skipping`);
    }
  }
}
