import { FORTUNES } from "@/constants/fortunes";

export function getRandomFortune(excluded: string[] = []) {
  const available = FORTUNES.filter(f => !excluded.includes(f));
  if (available.length === 0) return null;

  return available[Math.floor(Math.random() * available.length)];
}
