import type {
  AgentNode,
  ChatMessage,
  CouncilBriefItem,
  DashboardPayload,
  ToolkitDocument
} from "@/lib/domain/types";
import { linkedinBody } from "@/content/toolkit/linkedin";
import { matrixBody } from "@/content/toolkit/matrix";
import { objectionsBody } from "@/content/toolkit/objections";
import { outreachBody } from "@/content/toolkit/outreach";
import { pricingBody } from "@/content/toolkit/pricing";
import { promptsBody } from "@/content/toolkit/prompts";
import { researchBody } from "@/content/toolkit/research";

export const seededToolkit: ToolkitDocument[] = [
  {
    id: "offer-pricing",
    category: "TOOLKIT",
    title: "Offer & Pricing",
    body: pricingBody,
    tags: ["pricing", "offer", "commercial"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "research",
    category: "TOOLKIT",
    title: "Research",
    body: researchBody,
    tags: ["research", "layers", "audit"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "qa-prompts",
    category: "TOOLKIT",
    title: "AI QA Prompts",
    body: promptsBody,
    tags: ["prompts", "qa", "website"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "outreach",
    category: "TOOLKIT",
    title: "Outreach",
    body: outreachBody,
    tags: ["outreach", "email", "calls"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "objections",
    category: "TOOLKIT",
    title: "Objections",
    body: objectionsBody,
    tags: ["sales", "objections"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "impact-matrix",
    category: "TOOLKIT",
    title: "Impact Matrix",
    body: matrixBody,
    tags: ["prioritization", "matrix"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "roi-calculator",
    category: "TOOLKIT",
    title: "ROI Calculator",
    body: "Interactive ROI modeling for operational waste and missed after-hours calls.",
    tags: ["roi", "calculator", "voice-agent"],
    lastUpdated: "2026-05-09"
  },
  {
    id: "linkedin",
    category: "TOOLKIT",
    title: "LinkedIn",
    body: linkedinBody,
    tags: ["linkedin", "content"],
    lastUpdated: "2026-05-09"
  }
];

export function createInitialChatMessage(content: string): ChatMessage[] {
  return [
    {
      id: "bootstrap-message",
      role: "assistant",
      content,
      createdAt: new Date().toISOString()
    }
  ];
}

export function createEmptyDashboard(agents: AgentNode[], councilBrief: CouncilBriefItem[], chat: ChatMessage[]): DashboardPayload {
  return {
    summary: {
      month: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date()),
      survivalTarget: 3000,
      monthlyReceived: 0,
      slotsTotal: 10,
      slotsUsed: 0,
      activeDeals: 0,
      activeAgents: agents.filter((agent) => agent.status === "ACTIVE").length
    },
    audits: [],
    pipeline: [],
    agents,
    queue: [],
    councilBrief,
    prospects: [],
    orders: [],
    toolkit: seededToolkit.map((item) => ({ ...item })),
    knowledge: [],
    events: [],
    workflowRuns: [],
    chat,
    reports: []
  };
}
