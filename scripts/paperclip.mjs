#!/usr/bin/env node
/**
 * Paperclip — Management Infrastructure Gateway
 *
 * Runs on port 3100 alongside the Next.js dev server.
 * Provides health, task tracking, and event relay endpoints
 * used by the Sovereign X Audits command center.
 *
 * Usage:  node scripts/paperclip.mjs
 *         npm run paperclip
 */

import { createServer } from "node:http";
import { randomUUID } from "node:crypto";

const PORT = Number(process.env.PAPERCLIP_PORT ?? 3100);
const SX_API_SERVER_KEY = process.env.SX_API_SERVER_KEY ?? "sx-local-dev-key";
const startedAt = new Date().toISOString();
const version = "1.0.0";

// In-memory task log (resets on restart — intentional for local dev)
const tasks = [];
const events = [];

// ── Helpers ───────────────────────────────────────────────────────────────────

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

function isAuthorized(req) {
  const authHeader = req.headers["authorization"] ?? "";
  const apiKeyHeader = req.headers["x-api-key"] ?? "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  return bearerToken === SX_API_SERVER_KEY || apiKeyHeader === SX_API_SERVER_KEY;
}

// ── Request router ────────────────────────────────────────────────────────────

async function handle(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const path = url.pathname;
  const method = req.method.toUpperCase();

  // CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-API-Key",
    });
    return res.end();
  }

  // ── GET /api/health ─────────────────────────────────────────────────────────
  if (path === "/api/health" && method === "GET") {
    return json(res, 200, {
      status: "ok",
      service: "paperclip",
      version,
      startedAt,
      taskCount: tasks.length,
      eventCount: events.length,
      uptime: Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000),
    });
  }

  // ── GET /api/status ─────────────────────────────────────────────────────────
  if (path === "/api/status" && method === "GET") {
    return json(res, 200, {
      service: "paperclip",
      version,
      startedAt,
      tasks: { total: tasks.length, pending: tasks.filter(t => t.status === "pending").length, done: tasks.filter(t => t.status === "done").length },
      events: { total: events.length, recent: events.slice(-5) },
    });
  }

  // All routes below require auth
  if (!isAuthorized(req)) {
    return json(res, 401, { error: "Unauthorized. Provide SX_API_SERVER_KEY via Authorization: Bearer or X-API-Key header." });
  }

  // ── POST /api/tasks ─────────────────────────────────────────────────────────
  if (path === "/api/tasks" && method === "POST") {
    let body;
    try { body = await readBody(req); }
    catch { return json(res, 400, { error: "Invalid JSON body" }); }

    const task = {
      id: `TASK-${randomUUID()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
      type: body.type ?? "generic",
      payload: body.payload ?? {},
      source: body.source ?? "unknown",
    };
    tasks.push(task);
    if (tasks.length > 500) tasks.shift(); // cap memory
    console.log(`[paperclip] task created: ${task.id} type=${task.type}`);
    return json(res, 201, { task });
  }

  // ── GET /api/tasks ──────────────────────────────────────────────────────────
  if (path === "/api/tasks" && method === "GET") {
    const status = url.searchParams.get("status");
    const filtered = status ? tasks.filter(t => t.status === status) : tasks;
    return json(res, 200, { tasks: filtered.slice(-100), total: filtered.length });
  }

  // ── POST /api/tasks/:id/complete ────────────────────────────────────────────
  const taskCompleteMatch = path.match(/^\/api\/tasks\/([^/]+)\/complete$/);
  if (taskCompleteMatch && method === "POST") {
    const taskId = taskCompleteMatch[1];
    const task = tasks.find(t => t.id === taskId);
    if (!task) return json(res, 404, { error: "Task not found" });
    task.status = "done";
    task.completedAt = new Date().toISOString();
    console.log(`[paperclip] task completed: ${taskId}`);
    return json(res, 200, { task });
  }

  // ── POST /api/events ────────────────────────────────────────────────────────
  if (path === "/api/events" && method === "POST") {
    let body;
    try { body = await readBody(req); }
    catch { return json(res, 400, { error: "Invalid JSON body" }); }

    const event = {
      id: `EVT-${randomUUID()}`,
      receivedAt: new Date().toISOString(),
      type: body.type ?? "generic",
      source: body.source ?? "unknown",
      payload: body.payload ?? {},
    };
    events.push(event);
    if (events.length > 200) events.shift(); // cap memory
    console.log(`[paperclip] event received: ${event.id} type=${event.type}`);
    return json(res, 201, { event });
  }

  // ── GET /api/events ─────────────────────────────────────────────────────────
  if (path === "/api/events" && method === "GET") {
    return json(res, 200, { events: events.slice(-50), total: events.length });
  }

  return json(res, 404, { error: `No route for ${method} ${path}` });
}

// ── Start server ──────────────────────────────────────────────────────────────

const server = createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error("[paperclip] unhandled error:", err);
    json(res, 500, { error: "Internal server error" });
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\n[paperclip] Management Infrastructure Gateway`);
  console.log(`[paperclip] Listening on http://127.0.0.1:${PORT}`);
  console.log(`[paperclip] Health: http://127.0.0.1:${PORT}/api/health`);
  console.log(`[paperclip] Version: ${version} | Started: ${startedAt}\n`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`[paperclip] Port ${PORT} is already in use. Is Paperclip already running?`);
  } else {
    console.error("[paperclip] Server error:", err);
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("\n[paperclip] Shutting down gracefully...");
  server.close(() => process.exit(0));
});

process.on("SIGTERM", () => {
  server.close(() => process.exit(0));
});
