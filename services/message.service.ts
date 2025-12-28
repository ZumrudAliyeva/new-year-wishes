import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function createMessage(
  userId: string,
  text: string
) {
  if (!text || text.length > 500) {
    throw new Error("Invalid message");
  }

  await connectDB();

  const message = await Message.create({
    userId,
    text: text.trim(),
  });

  return message;
}

export async function getAllMessages() {
  await connectDB();

  return Message.find()
    .populate("userId", "name")
    .sort({ createdAt: -1 });
}
