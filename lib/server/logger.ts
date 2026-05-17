import pino from "pino";

/**
 * Singleton structured logger for all server-side operations.
 * Uses a globalThis singleton so the same logger instance is reused
 * across Next.js hot reloads in development.
 */

declare global {
   
  var __sx_logger__: pino.Logger | undefined;
}

function createLogger() {
  return pino({
    level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
    transport:
      process.env.NODE_ENV !== "production"
        ? { target: "pino-pretty", options: { colorize: true, ignore: "pid,hostname" } }
        : undefined
  });
}

export const logger = globalThis.__sx_logger__ ?? createLogger();

if (!globalThis.__sx_logger__) {
  globalThis.__sx_logger__ = logger;
}
