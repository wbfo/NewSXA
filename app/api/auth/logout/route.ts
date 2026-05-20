import { NextResponse } from "next/server";

const cookieNames = [
  "sx-session-email",
  "sx-session-uid",
  "sx-session-role",
  "firebase-token",
  "sx-user-email",
  "sx-user-uid",
  "sx-auth-role",
];

const clearOptions = {
  path: "/",
};

export async function POST(_req?: Request) {
  const response = NextResponse.json({ ok: true });
  for (const name of cookieNames) {
    response.cookies.set(name, "", { ...clearOptions, maxAge: 0 });
  }
  return response;
}
