import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id: userId } = await params;

  const { message }: { message: string } = await req.json();

  if (!message?.trim()) {
    return NextResponse.json({ error: "Empty message" }, { status: 400 });
  }

  const msg = await Message.create({
    userId,
    message: message.trim(),
  });

  return NextResponse.json({ success: true, messageId: msg._id });
}

