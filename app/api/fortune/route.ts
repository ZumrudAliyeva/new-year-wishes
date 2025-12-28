// app/api/fortune/route.ts
import { NextResponse } from "next/server";
import { FORTUNES } from "@/constants/fortunes";

export async function POST(req: Request) {
  const { usedFortunes } = await req.json();

  const available = FORTUNES.filter(f => !usedFortunes.includes(f));
  if (!available.length) {
    return NextResponse.json({ error: "No more fortunes" }, { status: 400 });
  }

  const fortune = available[Math.floor(Math.random() * available.length)];

  return NextResponse.json({ fortune });
}
