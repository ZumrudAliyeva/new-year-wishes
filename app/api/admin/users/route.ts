import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Message } from "@/models/Message";

function checkAuth(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return false;

  const base64Credentials = auth.split(" ")[1];
  const [user, pass] = atob(base64Credentials).split(":");

  return (
    user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS
  );
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return new NextResponse("Unauthorized", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="Admin"' } });
  }

  await connectDB();

  const users = await User.find().lean();

  const usersWithMessages = await Promise.all(
    users.map(async (user) => {
      const messages = await Message.find({ userId: user._id }).lean();
      return {
        ...user,
        messages: messages.map((m) => m.text),
      };
    })
  );

  return NextResponse.json(usersWithMessages);
}
