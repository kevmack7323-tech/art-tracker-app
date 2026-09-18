import { NextResponse } from "next/server";
import { listMapPins } from "@/lib/catalog";

export async function GET() {
  const pins = listMapPins();
  return NextResponse.json({ results: pins, total: pins.length });
}
