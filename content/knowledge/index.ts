import { auditProtocol } from "./audits";
import { structuralismPhilosophy } from "./structuralism";
import { operatingProtocols } from "./protocols";
import { glossary } from "./glossary";
import { HERMES_KNOWLEDGE_BASE } from "./hermes-kb";

const NOW = new Date().toISOString();

export const knowledgeContent = [
  {
    id: "audit-protocol",
    category: "KNOWLEDGE",
    title: "Audit Protocol — Full KB",
    body: HERMES_KNOWLEDGE_BASE,
    tags: ["audit", "protocol", "hermes", "knowledge-base", "aicc"],
    lastUpdated: NOW
  },
  {
    id: "structuralism",
    category: "KNOWLEDGE",
    title: "Tactical Structuralism",
    body: structuralismPhilosophy,
    tags: ["philosophy", "design", "strategy"],
    lastUpdated: NOW
  },
  {
    id: "protocols",
    category: "KNOWLEDGE",
    title: "Operating Protocols",
    body: operatingProtocols,
    tags: ["ops", "sop", "pipeline"],
    lastUpdated: NOW
  },
  {
    id: "glossary",
    category: "KNOWLEDGE",
    title: "System Glossary",
    body: glossary,
    tags: ["lexicon", "terminology"],
    lastUpdated: NOW
  }
];
