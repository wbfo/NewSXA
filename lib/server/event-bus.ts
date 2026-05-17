import { EventEmitter } from "node:events";
import type { AgentEvent } from "@/lib/domain/types";

declare global {
   
  var __sx_event_bus__: EventEmitter | undefined;
}

const emitter = globalThis.__sx_event_bus__ ?? new EventEmitter();
emitter.setMaxListeners(100);
globalThis.__sx_event_bus__ = emitter;

export function publishEvent(event: AgentEvent) {
  emitter.emit("agent-event", event);
}

export function subscribeToEvents(listener: (event: AgentEvent) => void) {
  emitter.on("agent-event", listener);
  return () => emitter.off("agent-event", listener);
}
