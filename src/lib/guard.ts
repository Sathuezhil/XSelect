import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Unauthorised" }, { status: 401 }) };
  }
  return { session, response: null };
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function originError() {
  return NextResponse.json({ error: "The request origin was rejected." }, { status: 403 });
}
