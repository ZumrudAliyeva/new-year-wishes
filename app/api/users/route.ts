import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.create({
      name,
      role: "user",
      fortuneMessages: [],
    });

    return NextResponse.json({
      userId: user._id.toString(), // ⚠️ ÇOX VACİB
      name: user.name,
    });
  } catch (err) {
    console.error("POST /api/users error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
