import { google } from "googleapis";
import { NextResponse } from "next/server";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      {
        ok: false,
        message: "Missing OAuth code. Complete the Google authorization flow to generate a refresh token.",
      },
      { status: 400 }
    );
  }

  const client = new google.auth.OAuth2(
    requireEnv("GOOGLE_CLIENT_ID"),
    requireEnv("GOOGLE_CLIENT_SECRET"),
    requireEnv("GOOGLE_REDIRECT_URI")
  );

  const { tokens } = await client.getToken(code);

  return NextResponse.json({
    ok: true,
    message: "OAuth exchange complete. Save the refresh token in your environment variables.",
    refresh_token: tokens.refresh_token ?? null,
    scope: tokens.scope ?? null,
    expiry_date: tokens.expiry_date ?? null,
  });
}

