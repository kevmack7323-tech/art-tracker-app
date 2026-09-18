import { NextResponse } from "next/server";
import { leaderboard } from "@/lib/gamification";

export async function GET() {
  return NextResponse.json({ results: leaderboard() });
}
