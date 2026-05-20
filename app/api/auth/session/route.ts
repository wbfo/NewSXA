import { NextResponse } from "next/server";
import { isAllowedEmail, isEmailAdmin } from "@/lib/constants/auth";

type SessionPayload = {
  email?: string;
};

const cookieOptions = {
  httpOnly: false,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

function setSessionCookies(response: NextResponse, email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const role = isEmailAdmin(normalizedEmail) ? "admin" : "client";
  const uid = normalizedEmail;

  response.cookies.set("sx-session-email", normalizedEmail, cookieOptions);
  response.cookies.set("sx-session-uid", uid, cookieOptions);
  response.cookies.set("sx-session-role", role, cookieOptions);
  response.cookies.set("sx-user-email", normalizedEmail, cookieOptions);
  response.cookies.set("sx-user-uid", uid, cookieOptions);
  response.cookies.set("sx-auth-role", role, cookieOptions);
  response.cookies.set("firebase-token", `local-session:${normalizedEmail}`, cookieOptions);
}

export async function POST(request: Request) {
  const raw = (await request.json().catch(() => null)) as SessionPayload | null;
  const email = raw?.email?.trim().toLowerCase() || "";

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  if (!isAllowedEmail(email)) {
    return NextResponse.json({ error: "That email is not approved for access yet." }, { status: 403 });
  }

  const response = NextResponse.json({
    ok: true,
    email,
    role: isEmailAdmin(email) ? "admin" : "client",
  });

  setSessionCookies(response, email);
  return response;
}
