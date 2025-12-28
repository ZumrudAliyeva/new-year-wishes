import { NextResponse } from "next/server";
import { getAllMessages } from "@/services/message.service";

export async function GET() {
  try {
    const messages = await getAllMessages();
    return NextResponse.json(messages);
  } catch {
    return NextResponse.json(
      { error: "Failed to load messages" },
      { status: 500 }
    );
  }
}
