/**
 * Shared agent runner functions — pure logic without HTTP Request/Response wrapping.
 * Called both from API route handlers and from the startup catch-up scheduler.
 * Auth checks are NOT performed here; callers are responsible for authorisation.
 */
import { addReport, readDashboard, recordAgentRun } from "@/lib/server/store";
import { runHermesQuery } from "@/lib/hermes/runtime";
import { logger } from "@/lib/server/logger";
import type { AgentReport, ReportItem } from "@/lib/domain/types";

// ── CFO Agent ─────────────────────────────────────────────────────────────────

async function runCfoScan(): Promise<{ items: ReportItem[]; body: string }> {
  const dashboard = await readDashboard();
  const { summary, pipeline } = dashboard;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysRemaining = daysInMonth - now.getDate() + 1;

  const received = summary.monthlyReceived;
  const target = summary.survivalTarget;
  const stillNeeded = Math.max(0, target - received);
  const progressPct = target > 0 ? Math.round((received / target) * 100) : 0;
  const dailyRateNeeded = daysRemaining > 0 ? Math.ceil(stillNeeded / daysRemaining) : stillNeeded;
  const pipelineTotal = pipeline.reduce((sum, item) => sum + item.value, 0);
  const pipelineCoveragePct = stillNeeded > 0 ? Math.round((pipelineTotal / stillNeeded) * 100) : 100;
  const onTrack = received >= (target * (now.getDate() / daysInMonth));

  const body = [
    `Survival Progress: ${progressPct}% ($${received.toLocaleString()} of $${target.toLocaleString()})`,
    `Days Remaining in Month: ${daysRemaining}`,
    `Daily Rate Needed to Hit Target: $${dailyRateNeeded.toLocaleString()}`,
    `Pipeline Coverage: ${pipelineCoveragePct}% (pipeline $${pipelineTotal.toLocaleString()} vs $${stillNeeded.toLocaleString()} still needed)`,
    `Status: ${onTrack ? "On Track" : "Behind — action required"}`,
  ].join("\n");

  const items: ReportItem[] = [
    {
      id: `RI-${crypto.randomUUID()}`,
      type: "SOCIAL_SIGNAL",
      title: `Monthly Progress: ${progressPct}% to target`,
      description: `$${received.toLocaleString()} received of $${target.toLocaleString()} survival target. ${stillNeeded > 0 ? `$${stillNeeded.toLocaleString()} still needed.` : "Target met!"}`,
      status: "PENDING",
    },
    {
      id: `RI-${crypto.randomUUID()}`,
      type: "SOCIAL_SIGNAL",
      title: `Days Remaining: ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}`,
      description: `Daily rate needed for the rest of the month: $${dailyRateNeeded.toLocaleString()}/day to close the gap.`,
      status: "PENDING",
    },
    {
      id: `RI-${crypto.randomUUID()}`,
      type: "COLLAB_LEAD",
      title: `Pipeline Coverage: ${pipelineCoveragePct}%`,
      description: `Active pipeline totals $${pipelineTotal.toLocaleString()} against $${stillNeeded.toLocaleString()} still needed. Coverage ratio: ${pipelineCoveragePct}%.`,
      status: "PENDING",
    },
    {
      id: `RI-${crypto.randomUUID()}`,
      type: onTrack ? "SOCIAL_SIGNAL" : "BRAND_AMPLIFIER",
      title: onTrack ? "Status: On Track" : "Status: Action Required",
      description: onTrack
        ? `Revenue pace is aligned with the monthly survival target. Keep closing.`
        : `Revenue is behind the expected pace for day ${now.getDate()} of ${daysInMonth}. Accelerate closing and pipeline conversion.`,
      status: "PENDING",
    },
  ];

  if (pipeline.length > 0) {
    const hotDeals = pipeline.filter(p => p.temperature === "hot");
    items.push({
      id: `RI-${crypto.randomUUID()}`,
      type: "COLLAB_LEAD",
      title: `Hot Pipeline: ${hotDeals.length} deal${hotDeals.length === 1 ? "" : "s"} ($${hotDeals.reduce((s, p) => s + p.value, 0).toLocaleString()})`,
      description: `${hotDeals.length} hot deal${hotDeals.length === 1 ? "" : "s"} in pipeline: ${hotDeals.map(d => `${d.prospectName} ($${d.value.toLocaleString()})`).join(", ") || "none"}. Prioritize closing these.`,
      status: "PENDING",
    });
  }

  return { items, body };
}

export async function runCfoAgent(): Promise<void> {
  const { items, body } = await runCfoScan();

  const report: AgentReport = {
    id: `R-${crypto.randomUUID()}`,
    agentId: "AG-CFO",
    agentName: "CFO Agent",
    reportType: "STATUS_UPDATE",
    title: `CFO Financial Report — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    summary: `${items.length} financial data point${items.length === 1 ? "" : "s"} compiled. Review survival progress, daily rate needed, and pipeline coverage below.`,
    body,
    status: "UNREAD",
    requiresApproval: false,
    items,
    createdAt: new Date().toISOString(),
    tags: ["financial", "automated", "daily"],
  };

  await addReport(report);
  await recordAgentRun("cfo");
  logger.info({ reportId: report.id, itemCount: items.length }, "CFO scan completed");
}

// ── Follow-Up Agent ───────────────────────────────────────────────────────────

async function runFollowupScan(): Promise<{ items: ReportItem[]; hasOverdue: boolean }> {
  const dashboard = await readDashboard();
  const { audits, prospects } = dashboard;
  const now = Date.now();
  const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

  const items: ReportItem[] = [];

  // Check assets that are Sent, 3+ days ago, no followUpTriggered
  for (const audit of audits) {
    for (const asset of audit.assets ?? []) {
      if (
        asset.status === "Sent" &&
        asset.sentAt &&
        (now - new Date(asset.sentAt).getTime()) > THREE_DAYS_MS &&
        !asset.followUpTriggered
      ) {
        const daysSince = Math.floor((now - new Date(asset.sentAt).getTime()) / (24 * 60 * 60 * 1000));
        items.push({
          id: `RI-${crypto.randomUUID()}`,
          type: "PROSPECT",
          title: `Follow up: ${asset.name} — ${audit.accountName}`,
          description: `"${asset.name}" was sent ${daysSince} day${daysSince === 1 ? "" : "s"} ago for ${audit.accountName} (${audit.auditType}). No follow-up has been triggered yet. Reach out to confirm receipt and gather feedback.`,
          status: "PENDING",
          metadata: {
            auditId: audit.id,
            assetId: asset.id,
            sentAt: asset.sentAt,
          },
        });
      }
    }
  }

  // Check prospects added 7+ days ago that haven't been converted (no relatedPipelineIds)
  for (const prospect of prospects) {
    const isStale =
      prospect.relatedPipelineIds.length === 0 &&
      prospect.play.toLowerCase().includes("follow") === false;

    const needsFollowup =
      prospect.relatedPipelineIds.length === 0 &&
      (prospect.play.toLowerCase().includes("follow up") ||
        prospect.play.toLowerCase().includes("followup") ||
        isStale);

    if (needsFollowup) {
      items.push({
        id: `RI-${crypto.randomUUID()}`,
        type: "PROSPECT",
        title: `Stale prospect: ${prospect.name}`,
        description: `${prospect.name} (${prospect.serviceInterest}) has no active pipeline deals linked. Play: "${prospect.play}". Consider reaching out or converting to a pipeline deal.`,
        estimatedValue: prospect.estimatedValue,
        status: "PENDING",
        metadata: {
          prospectId: prospect.id,
          priority: prospect.priority,
        },
      });
    }
  }

  // Additionally flag prospects that mention follow up in their play
  for (const prospect of prospects) {
    const alreadyFlagged = items.some(i => i.metadata?.prospectId === prospect.id);
    if (!alreadyFlagged) {
      const playLower = prospect.play.toLowerCase();
      if (playLower.includes("follow up") || playLower.includes("followup")) {
        items.push({
          id: `RI-${crypto.randomUUID()}`,
          type: "PROSPECT",
          title: `Follow-up play: ${prospect.name}`,
          description: `${prospect.name} has a follow-up play defined: "${prospect.play}". Service: ${prospect.serviceInterest}. Estimated value: ${prospect.estimatedValue}.`,
          estimatedValue: prospect.estimatedValue,
          status: "PENDING",
          metadata: {
            prospectId: prospect.id,
            priority: prospect.priority,
          },
        });
      }
    }
  }

  // Remove duplicates by prospectId
  const seen = new Set<string>();
  const deduped = items.filter(item => {
    const key = item.metadata?.prospectId ?? item.metadata?.assetId ?? item.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { items: deduped, hasOverdue: deduped.length > 0 };
}

export async function runFollowupAgent(): Promise<void> {
  const { items, hasOverdue } = await runFollowupScan();

  const report: AgentReport = hasOverdue
    ? {
        id: `R-${crypto.randomUUID()}`,
        agentId: "AG-FOLLOWUP",
        agentName: "Follow-Up Agent",
        reportType: "OUTREACH_SCAN",
        title: `Follow-Up Scan — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
        summary: `${items.length} overdue follow-up${items.length === 1 ? "" : "s"} detected. Review and action each item to protect client relationships and pipeline momentum.`,
        body: "Automated follow-up scan completed. Each item below represents a client deliverable or prospect that is overdue for contact. Approve to mark as actioned, or dismiss to skip.",
        status: "UNREAD",
        requiresApproval: true,
        items,
        createdAt: new Date().toISOString(),
        tags: ["followup", "automated", "daily"],
      }
    : {
        id: `R-${crypto.randomUUID()}`,
        agentId: "AG-FOLLOWUP",
        agentName: "Follow-Up Agent",
        reportType: "OUTREACH_SCAN",
        title: `Follow-Up Scan — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
        summary: "All clear — no follow-ups overdue.",
        body: "Automated follow-up scan completed. All sent deliverables and prospects are within their follow-up windows. No action required.",
        status: "UNREAD",
        requiresApproval: false,
        items: [],
        createdAt: new Date().toISOString(),
        tags: ["followup", "automated", "daily"],
      };

  await addReport(report);
  await recordAgentRun("followup");
  logger.info({ reportId: report.id, itemCount: items.length, hasOverdue }, "Follow-up scan completed");
}

// ── Web search utility ────────────────────────────────────────────────────────

type RawLeadItem = {
  type?: string;
  title?: string;
  description?: string;
  url?: string;
  handle?: string;
  estimatedValue?: string;
};

function parseLeadItems(content: string): ReportItem[] {
  try {
    const cleaned = content.replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("[");
    const end = cleaned.lastIndexOf("]");
    if (start === -1 || end === -1) return [];
    const items = JSON.parse(cleaned.slice(start, end + 1)) as RawLeadItem[];
    return items.slice(0, 5).map(item => ({
      id: `RI-${crypto.randomUUID()}`,
      type: (item.type as ReportItem["type"]) ?? "PROSPECT",
      title: item.title ?? "Untitled lead",
      description: item.description ?? "",
      url: item.url,
      handle: item.handle,
      estimatedValue: item.estimatedValue,
      status: "PENDING" as const,
    }));
  } catch {
    return [];
  }
}

const SEARCH_SYSTEM_PROMPT =
  "You are an outreach intelligence agent for Sovereign X Audits, a premium digital and image audit firm. Find real, specific leads and return them as a JSON array. Each item must have: { type: 'PROSPECT'|'PR_OPPORTUNITY'|'COLLAB_LEAD'|'SOCIAL_SIGNAL'|'BRAND_AMPLIFIER', title: string, description: string, url?: string, handle?: string, estimatedValue?: string }. Return ONLY the JSON array, no markdown, no other text.";

async function searchViaPerplexity(query: string, apiKey: string): Promise<ReportItem[]> {
  try {
    const res = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: SEARCH_SYSTEM_PROMPT },
          { role: "user", content: `Search for: ${query}. Return 3-5 specific, real leads as a JSON array.` },
        ],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    return parseLeadItems(data.choices?.[0]?.message?.content ?? "[]");
  } catch {
    return [];
  }
}

async function searchViaOpenAI(query: string, apiKey: string): Promise<ReportItem[]> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-search-preview",
        web_search_options: {},
        messages: [
          { role: "system", content: SEARCH_SYSTEM_PROMPT },
          { role: "user", content: `Search the web for: ${query}. Return 3-5 specific, real leads as a JSON array.` },
        ],
      }),
    });
    if (!res.ok) return [];
    const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
    return parseLeadItems(data.choices?.[0]?.message?.content ?? "[]");
  } catch {
    return [];
  }
}

// Free web search via DuckDuckGo Instant Answer API — no API key required.
// Returns raw snippets which Hermes then interprets as structured leads.
async function searchViaDuckDuckGo(query: string): Promise<string> {
  try {
    const encoded = encodeURIComponent(query);
    const res = await fetch(
      `https://api.duckduckgo.com/?q=${encoded}&format=json&no_html=1&skip_disambig=1`,
      { headers: { "User-Agent": "SovereignXAudits/1.0 (outreach-agent)" } }
    );
    if (!res.ok) return "";
    const data = await res.json() as {
      Abstract?: string;
      AbstractText?: string;
      RelatedTopics?: Array<{ Text?: string; FirstURL?: string }>;
      Results?: Array<{ Text?: string; FirstURL?: string }>;
    };
    const snippets: string[] = [];
    if (data.AbstractText) snippets.push(data.AbstractText);
    for (const t of (data.RelatedTopics ?? []).slice(0, 8)) {
      if (t.Text) snippets.push(`${t.Text}${t.FirstURL ? ` (${t.FirstURL})` : ""}`);
    }
    for (const r of (data.Results ?? []).slice(0, 5)) {
      if (r.Text) snippets.push(`${r.Text}${r.FirstURL ? ` (${r.FirstURL})` : ""}`);
    }
    return snippets.join("\n");
  } catch {
    return "";
  }
}

async function searchViaHermes(query: string): Promise<ReportItem[]> {
  try {
    // First grab real snippets from DuckDuckGo, then have Hermes interpret them
    const webSnippets = await searchViaDuckDuckGo(query);
    const prompt = webSnippets
      ? `You are an outreach intelligence agent for Sovereign X Audits. Using the following real search results, identify 3-5 specific outreach leads. Return ONLY a JSON array, each item: { type: 'PROSPECT'|'PR_OPPORTUNITY'|'COLLAB_LEAD'|'SOCIAL_SIGNAL'|'BRAND_AMPLIFIER', title: string, description: string, url?: string, estimatedValue?: string }\n\nSearch query: ${query}\n\nSearch results:\n${webSnippets}`
      : `You are an outreach intelligence agent for Sovereign X Audits. Based on your knowledge, identify 3-5 specific outreach opportunities. Topic: ${query}. Return ONLY a JSON array, each item: { type: 'PROSPECT'|'PR_OPPORTUNITY'|'COLLAB_LEAD'|'SOCIAL_SIGNAL'|'BRAND_AMPLIFIER', title: string, description: string, estimatedValue?: string }`;
    const result = await runHermesQuery(prompt);
    return parseLeadItems(result);
  } catch {
    return [];
  }
}

async function webSearch(query: string): Promise<ReportItem[]> {
  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  if (perplexityKey) {
    const results = await searchViaPerplexity(query, perplexityKey);
    if (results.length > 0) return results;
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (openaiKey) {
    const results = await searchViaOpenAI(query, openaiKey);
    if (results.length > 0) return results;
  }

  // Always works — DuckDuckGo (free, no key) + Hermes interpretation
  return searchViaHermes(query);
}

// ── Outreach Agent ────────────────────────────────────────────────────────────

async function runOutreachScan(): Promise<ReportItem[]> {
  const queries = [
    "small businesses struggling with digital presence or brand visibility 2026",
    "looking for digital audit or brand consultant collaboration partnership 2026",
    "podcast looking for guests digital marketing brand strategy local business 2026",
  ];

  const results: ReportItem[] = [];
  for (const query of queries) {
    const items = await webSearch(query);
    results.push(...items);
  }

  if (results.length > 0) return results;

  // True last resort — Hermes reasoning with no search
  const fallback = await runHermesQuery(
    "List 5 specific types of businesses or professionals that would benefit most from a premium digital audit or image audit right now. For each, explain why they are a strong prospect and what the estimated engagement value would be. Format as a JSON array: [{ type: 'PROSPECT', title: string, description: string, estimatedValue: string }]"
  ).catch(() => "[]");

  return parseLeadItems(fallback).length > 0
    ? parseLeadItems(fallback)
    : [
        {
          id: `RI-${crypto.randomUUID()}`,
          type: "PROSPECT",
          title: "Outreach agent running in offline mode",
          description: "No search API responded. Add PERPLEXITY_API_KEY or OPENAI_API_KEY to enable live web scanning. Hermes reasoning fallback also unavailable.",
          status: "PENDING",
        },
      ];
}

export async function runOutreachAgent(): Promise<void> {
  const items = await runOutreachScan();

  const report: AgentReport = {
    id: `R-${crypto.randomUUID()}`,
    agentId: "outreach-agent",
    agentName: "Outreach Agent",
    reportType: "OUTREACH_SCAN",
    title: `Outreach Scan — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    summary: `${items.length} signal${items.length === 1 ? "" : "s"} found across prospect, PR, collab, and social channels. Review and approve to add to your pipeline.`,
    body: "Automated scan completed. Each item below represents a potential outreach opportunity. Approve to add to prospects, dismiss to skip.",
    status: "UNREAD",
    requiresApproval: true,
    items,
    createdAt: new Date().toISOString(),
    tags: ["outreach", "automated"],
  };

  await addReport(report);
  await recordAgentRun("outreach");
  logger.info({ reportId: report.id, itemCount: items.length }, "Outreach scan completed");
}

// ── Research Agent ────────────────────────────────────────────────────────────

interface ProspectResearch {
  summary: string;
  onlinePresence: string;
  painPoints: string[];
  opportunities: string[];
  estimatedBudget: string;
}

async function researchProspect(name: string, serviceInterest: string): Promise<ProspectResearch | null> {
  const researchPrompt = `Research this prospect for a premium digital audit sales opportunity: "${name}", service interest: "${serviceInterest}". Return a JSON object with: { summary: string, onlinePresence: string, painPoints: string[], opportunities: string[], estimatedBudget: string }. Return ONLY the JSON object, no markdown.`;

  const perplexityKey = process.env.PERPLEXITY_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let content: string | null = null;

  if (perplexityKey) {
    try {
      const res = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${perplexityKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "sonar",
          messages: [
            { role: "system", content: "You are a research intelligence agent. Return only valid JSON with no markdown or extra text." },
            { role: "user", content: researchPrompt },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
        content = data.choices?.[0]?.message?.content ?? null;
      }
    } catch { /* fall through */ }
  }

  if (!content && openaiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${openaiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o-search-preview",
          web_search_options: {},
          messages: [
            { role: "system", content: "You are a research intelligence agent. Search the web and return only valid JSON with no markdown or extra text." },
            { role: "user", content: researchPrompt },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json() as { choices?: Array<{ message?: { content?: string } }> };
        content = data.choices?.[0]?.message?.content ?? null;
      }
    } catch { /* fall through */ }
  }

  if (!content) {
    try {
      // DuckDuckGo lookup for real snippets, then Hermes interprets
      const webSnippets = await searchViaDuckDuckGo(`${name} ${serviceInterest} business`);
      const prompt = webSnippets
        ? `You are a research intelligence agent. Using the search results below, provide intelligence on this prospect for a premium digital audit engagement: "${name}", interested in "${serviceInterest}". Return ONLY a JSON object: { summary: string, onlinePresence: string, painPoints: string[], opportunities: string[], estimatedBudget: string }\n\nSearch results:\n${webSnippets}`
        : `You are a research intelligence agent. Based on your knowledge, provide intelligence on this prospect: "${name}", interested in "${serviceInterest}". Return ONLY a JSON object: { summary: string, onlinePresence: string, painPoints: string[], opportunities: string[], estimatedBudget: string }`;
      content = await runHermesQuery(prompt);
    } catch { return null; }
  }

  try {
    const cleaned = (content ?? "").replace(/```json|```/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    return JSON.parse(cleaned.slice(start, end + 1)) as ProspectResearch;
  } catch {
    return null;
  }
}

async function runResearchScan(): Promise<ReportItem[]> {
  const dashboard = await readDashboard();
  const { prospects } = dashboard;
  const targetProspects = prospects.slice(0, 5);

  if (targetProspects.length === 0) {
    return [
      {
        id: `RI-${crypto.randomUUID()}`,
        type: "PROSPECT",
        title: "No prospects to research yet",
        description: "Add prospects to the dashboard to enable automated research scans.",
        status: "PENDING",
      },
    ];
  }

  const items: ReportItem[] = [];

  for (const prospect of targetProspects) {
    const research = await researchProspect(prospect.name, prospect.serviceInterest);

    if (research) {
      const description = [
        research.summary,
        `Online Presence: ${research.onlinePresence}`,
        research.painPoints.length > 0 ? `Pain Points: ${research.painPoints.join(", ")}` : "",
        research.opportunities.length > 0 ? `Opportunities: ${research.opportunities.join(", ")}` : "",
      ].filter(Boolean).join("\n");

      items.push({
        id: `RI-${crypto.randomUUID()}`,
        type: "PROSPECT",
        title: `Research: ${prospect.name}`,
        description,
        estimatedValue: research.estimatedBudget || prospect.estimatedValue,
        status: "PENDING",
        metadata: { prospectId: prospect.id, serviceInterest: prospect.serviceInterest },
      });
    } else {
      items.push({
        id: `RI-${crypto.randomUUID()}`,
        type: "PROSPECT",
        title: `Research unavailable: ${prospect.name}`,
        description: `Could not retrieve research data for ${prospect.name}. Service interest: ${prospect.serviceInterest}. Review manually.`,
        estimatedValue: prospect.estimatedValue,
        status: "PENDING",
        metadata: { prospectId: prospect.id, serviceInterest: prospect.serviceInterest },
      });
    }
  }

  return items;
}

export async function runResearchAgent(): Promise<void> {
  const items = await runResearchScan();

  const report: AgentReport = {
    id: `R-${crypto.randomUUID()}`,
    agentId: "AG-RESEARCH",
    agentName: "Research Agent",
    reportType: "AUDIT_FINDINGS",
    title: `Research Scan — ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`,
    summary: `${items.length} prospect${items.length === 1 ? "" : "s"} researched. Intelligence gathered via available search APIs and Hermes. Review findings below.`,
    body: "Automated research scan completed. Each item below contains intelligence gathered on a prospect. Use findings to tailor your outreach and audit proposal.",
    status: "UNREAD",
    requiresApproval: false,
    items,
    createdAt: new Date().toISOString(),
    tags: ["research", "automated"],
  };

  await addReport(report);
  await recordAgentRun("research");
  logger.info(
    { reportId: report.id, itemCount: items.length },
    "Research scan completed"
  );
}
