import type { ChatMessage, WorkflowRun, WorkflowType } from "@/lib/domain/types";

export interface StartWorkflowInput {
  workflowType: WorkflowType;
  requestedBy: string;
  accountName?: string;
  auditType?: string;
  socialHandle?: string;
  websiteUrl?: string;
  city?: string;
  category?: string;
  phone?: string;
  relatedAuditId?: string;
}

export interface HermesGatewayAdapter {
  sendMessage(input: {
    message: string;
    requestedBy: string;
    source?: "dashboard" | "telegram";
    attachments?: { name: string; size: number; type: string }[];
  }): Promise<{ reply: ChatMessage; startedWorkflow?: WorkflowRun }>;
  startWorkflow(input: StartWorkflowInput): Promise<WorkflowRun>;
  approveWorkflow(input: { workflowId: string }): Promise<WorkflowRun | null>;
  fetchActiveRuns(): Promise<WorkflowRun[]>;
}
