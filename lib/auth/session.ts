import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextResponse } from "next/server";
import type { AuthRole } from "@/lib/auth/users";

const SESSION_COOKIE_NAME = "sx-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

export interface SessionPayload {
  email: string;
  role: AuthRole;
  displayName?: string;
  exp: number;
}

function getSessionSecret(): string {
  return process.env.AUTH_SESSION_SECRET || "dev-only-session-secret-change-me";
}

function base64url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function unbase64url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string): string {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function createSignedSessionToken(payload: Omit<SessionPayload, "exp">): string {
  const fullPayload: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  const encodedPayload = base64url(JSON.stringify(fullPayload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifySignedSessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null;
  const [encodedPayload, providedSignature] = token.split(".");
  if (!encodedPayload || !providedSignature) return null;

  const expectedSignature = sign(encodedPayload);
  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (providedBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(unbase64url(encodedPayload)) as SessionPayload;
    if (!payload.email || !payload.role || !payload.exp) return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export function setSignedSessionCookies(
  response: NextResponse,
  payload: Omit<SessionPayload, "exp">
) {
  const token = createSignedSessionToken(payload);
  response.cookies.set(SESSION_COOKIE_NAME, token, cookieOptions);
  response.cookies.set("sx-session-email", payload.email, { ...cookieOptions, httpOnly: false });
  response.cookies.set("sx-session-role", payload.role, { ...cookieOptions, httpOnly: false });
  response.cookies.set("sx-session-uid", payload.email, { ...cookieOptions, httpOnly: false });
}

export function clearSignedSessionCookies(response: NextResponse) {
  for (const name of [SESSION_COOKIE_NAME, "sx-session-email", "sx-session-role", "sx-session-uid"]) {
    response.cookies.set(name, "", {
      path: "/",
      maxAge: 0,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: name === SESSION_COOKIE_NAME,
    });
  }
}

export const sessionCookieName = SESSION_COOKIE_NAME;
