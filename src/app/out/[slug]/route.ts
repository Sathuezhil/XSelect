import { connection } from "next/server";
import { NextResponse } from "next/server";
import { recordOutboundClick } from "@/services/products";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await context.params;
  try {
    const destination = await recordOutboundClick(slug);
    if (!destination) return NextResponse.redirect(new URL("/shop", request.url));
    return NextResponse.redirect(destination, 302);
  } catch {
    return NextResponse.redirect(new URL("/shop", request.url));
  }
}
