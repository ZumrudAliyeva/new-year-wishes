import { getDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function saveMessage(data: Omit<Message, "createdAt">) {
  const db = await getDB();
  const collection = db.collection("messages");

  const doc = { ...data, createdAt: new Date() };
  await collection.insertOne(doc);
  return { success: true };
}

export async function getAllMessages() {
  const db = await getDB();
  return db.collection("messages").find().sort({ createdAt: -1 }).toArray();
}
