// app/api/messages/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function POST(req: Request) {
  const { userId, userName, message } = await req.json();

  if (!message || message.length < 3) {
    return NextResponse.json(
      { error: "Message too short" },
      { status: 400 }
    );
  }

  await connectDB();

  const msg = await Message.create({
    userId,
    userName,
    message,
  });

  return NextResponse.json({ success: true, id: msg._id });
}
