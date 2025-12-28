import { fortunes } from "@/constants/fortunes";

export function getRandomFortune(exclude: string[] = []) {
  const available = fortunes.filter(
    (f) => !exclude.includes(f)
  );

  if (available.length === 0) {
    throw new Error("No fortunes left");
  }

  const index = Math.floor(Math.random() * available.length);
  return available[index];
}
