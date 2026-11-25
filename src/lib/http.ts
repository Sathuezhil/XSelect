import { NextResponse } from "next/server";
import type { ServiceResult } from "@/types";

export function apiResult<T>(result: ServiceResult<T>, successStatus = 200) {
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, issues: result.issues ?? [] },
      { status: result.status },
    );
  }
  return NextResponse.json(result.data, { status: successStatus });
}

export async function readJson(request: Request) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return null;
  }
}
