import { NextResponse } from "next/server";
import { getVisitor, profileFor } from "@/lib/gamification";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") ?? undefined;
  return NextResponse.json(profileFor(getVisitor(userId)));
}
