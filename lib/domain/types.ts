export type ThemeMode = "dark" | "light";
export type AuditType = "Digital Deep" | "Digital Standard" | "X Image Audit" | "Voice Agent";
export type AuditStatus = "IN PROGRESS" | "PENDING APPROVAL" | "READY" | "QUEUED";
export type Priority = "CRITICAL" | "HIGH" | "IMMEDIATE" | "MEDIUM" | "LOW";
export type AgentStatus = "ACTIVE" | "STANDBY";
export type OrderStatus = "NEW" | "REVIEWING" | "CONTACTED" | "IN PROGRESS" | "COMPLETE";
export type WorkflowStatus = "queued" | "running" | "awaiting_approval" | "completed";
export type WorkflowType =
  | "trigger-audit"
  | "dispatch-research"
  | "run-verification"
  | "compile-report"
  | "request-approval"
  | "trigger-outreach";
export type EventType =
  | "workflow.started"
  | "workflow.step"
  | "workflow.awaiting_approval"
  | "workflow.approved"
  | "workflow.completed"
  | "chat.message"
  | "agent.status"
  | "intake.submitted";
export type DeliverableStatus = "Generated" | "Internal Review" | "Ready" | "Sent";

export interface DeliverableAsset {
  id: string;
  name: string;
  type: string;
  driveLink: string;
  version: string;
  status: DeliverableStatus;
  sentAt?: string;
  followUpTriggered?: boolean;
}

export interface AuditLayerFinding {
  title: string;
  detail: string;
  confidence: string;
  flag?: string | null;
}

export interface AuditLayerResult {
  layer: number;
  section: string;
  timestamp?: string;
  business?: string;
  person?: string;
  url?: string;
  category?: string;
  city?: string;
  summary?: Record<string, unknown>;
  findings: AuditLayerFinding[];
  brand_score?: Record<string, unknown>;
  competitors?: unknown[];
  platform_results?: unknown[];
}

export interface Audit {
  id: string;
  accountName: string;
  auditType: AuditType;
  currentStage: string;
  progress: number;
  assignedAgent: string;
  status: AuditStatus;
  priority: Priority;
  commercialValue: number;
  clientId?: string;
  location?: string;
  projectName?: string;
  assets?: DeliverableAsset[];
  websiteUrl?: string;
  category?: string;
  phone?: string;
  socialHandle?: string;
  findings?: AuditLayerResult[];
  diagnosticSummary?: string;
}

export interface Prospect {
  id: string;
  name: string;
  contactPoints: string;
  serviceInterest: string;
  play: string;
  priority: Priority;
  estimatedValue: string;
  relatedAuditIds: string[];
  relatedPipelineIds: string[];
}

export interface ClientOrder {
  id: string;
  submittedAt: string;
  customerName: string;
  businessName: string;
  email: string;
  phone: string;
  packageName: string;
  serviceType: string;
  budget: string;
  notes: string;
  source: string;
  status: OrderStatus;
}

export interface PipelineItem {
  id: string;
  prospectName: string;
  stage: string;
  ageInDays: number;
  temperature: "hot" | "warm" | "cool";
  value: number;
  relatedProspectId: string;
  offerType: string;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  currentTaskCount: number;
  latestEventSummary: string;
}

export interface QueueItem {
  id: string;
  type: string;
  urgency: "urgent" | "normal";
  requiredAction: string;
  linkedEntityId?: string;
  dueAt?: string;
}

export interface CouncilBriefItem {
  id: string;
  source: string;
  note: string;
  createdAt: string;
}

export interface ToolkitDocument {
  id: string;
  category: string;
  title: string;
  body: string;
  tags: string[];
  lastUpdated: string;
}

export interface AgentEvent {
  id: string;
  timestamp: string;
  sourceAgent: string;
  eventType: EventType;
  payloadSummary: string;
  relatedEntityIds: string[];
}

export interface WorkflowStep {
  id: string;
  label: string;
  status: "queued" | "running" | "completed" | "awaiting_approval";
  detail: string;
}

export interface WorkflowRun {
  id: string;
  workflowType: WorkflowType;
  requestedBy: string;
  status: WorkflowStatus;
  currentStep: string;
  stepHistory: WorkflowStep[];
  outputReferences: string[];
  relatedAuditId?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface DashboardSummary {
  month: string;
  survivalTarget: number;
  monthlyReceived: number;
  slotsTotal: number;
  slotsUsed: number;
  activeDeals: number;
  activeAgents: number;
}

export interface ReportItem {
  id: string;
  type: "PROSPECT" | "PR_OPPORTUNITY" | "COLLAB_LEAD" | "SOCIAL_SIGNAL" | "BRAND_AMPLIFIER";
  title: string;
  description: string;
  url?: string;
  handle?: string;
  estimatedValue?: string;
  status: "PENDING" | "APPROVED" | "DISMISSED";
  metadata?: Record<string, string>;
}

export interface AgentReport {
  id: string;
  agentId: string;
  agentName: string;
  reportType: "OUTREACH_SCAN" | "AUDIT_FINDINGS" | "PR_OPPORTUNITIES" | "APPROVAL_REQUEST" | "STATUS_UPDATE";
  title: string;
  summary: string;
  body: string;
  status: "UNREAD" | "READ" | "APPROVED" | "DISMISSED" | "ARCHIVED";
  requiresApproval: boolean;
  items: ReportItem[];
  createdAt: string;
  readAt?: string;
  actionedAt?: string;
  tags: string[];
}

export interface DashboardPayload {
  summary: DashboardSummary;
  audits: Audit[];
  pipeline: PipelineItem[];
  agents: AgentNode[];
  queue: QueueItem[];
  councilBrief: CouncilBriefItem[];
  prospects: Prospect[];
  orders: ClientOrder[];
  toolkit: ToolkitDocument[];
  knowledge: ToolkitDocument[];
  events: AgentEvent[];
  workflowRuns: WorkflowRun[];
  chat: ChatMessage[];
  reports: AgentReport[];
}
