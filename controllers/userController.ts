import { getDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function saveUser(name: string) {
  const db = await getDB();
  const collection = db.collection("users");

  const doc: User = { name, createdAt: new Date() };
  await collection.insertOne(doc);
  return { success: true };
}
