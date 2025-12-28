import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function createUser(name: string) {
  if (!name || name.length < 2 || name.length > 20) {
    throw new Error("Invalid name");
  }

  await connectDB();

  const user = await User.create({
    name: name.trim(),
  });

  return user;
}

export async function addFortuneToUser(
  userId: string,
  fortune: string
) {
  await connectDB();

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // max 3 fortune qaydası
  if (user.fortunes.length >= 3) {
    throw new Error("Fortune limit reached");
  }

  user.fortunes.push(fortune);
  await user.save();

  return user;
}

export async function updateUserFoodChoice(userId: string, food: string) {
  const res = await fetch(`/api/users/${userId}/food`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ food }),
  });

  const data = await res.json();
  return { ok: res.ok, data };
}