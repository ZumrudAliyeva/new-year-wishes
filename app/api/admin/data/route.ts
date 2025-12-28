import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Message } from "@/models/Message";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  const [type, credentials] = authHeader.split(" ");

  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  if (type !== "Basic" || !credentials) {
    return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin"' } });
  }

  const decoded = Buffer.from(credentials, "base64").toString();
  const [user, pass] = decoded.split(":");

  if (user !== adminUser || pass !== adminPass) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  await connectDB();

  const users = await User.find({}, { name: 1, fortunes: 1, foodChoice: 1 });
  const messages = await Message.find({}, { userId: 1, message: 1, createdAt: 1 });

  return NextResponse.json({ users, messages });
}
