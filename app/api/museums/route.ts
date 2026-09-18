import { NextResponse } from "next/server";
import { listMuseums } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json({ results: listMuseums(), total: listMuseums().length });
}
