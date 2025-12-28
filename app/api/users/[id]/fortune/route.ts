import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { FORTUNES } from "@/constants/fortunes";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  await connectDB();

  const { params } = context;
  const { id: userId } = await params; // ✅ Promise unwrap edildi
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { usedFortunes }: { usedFortunes?: string[] } = await req.json();

  const available = FORTUNES.filter(
    (f) => !(user.fortunes.includes(f) || usedFortunes?.includes(f))
  );

  if (!available.length) {
    return NextResponse.json({ error: "No more fortunes" }, { status: 400 });
  }

  const fortune = available[Math.floor(Math.random() * available.length)];

  user.fortunes.push(fortune);
  await user.save();

  return NextResponse.json({ fortune });
}
