import { NextResponse } from "next/server";
import { getServerAuth } from "@/lib/auth/server-auth";

export async function GET() {
  const session = await getServerAuth();
  if (!session.user) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
    isAdmin: session.isAdmin,
  });
}
