import { Profile } from "../data/mock";
export const defaultMe: Omit<Profile, "id" | "name" | "year" | "area" | "av"> = { gender: "f", budget: 1, dist: 0, time: 0, clean: 0, habit: 0, guest: 1, pet: 1, bio: "" };
export const getMe = () => { try { return { ...defaultMe, ...JSON.parse(localStorage.getItem("passroom-me") || "{}") }; } catch { return defaultMe; } };
// Giới tính + ngân sách 30% · Vị trí 30% · Lối sống 40%
export function score(me: typeof defaultMe, p: Profile) {
  const gb = (me.gender === p.gender ? 15 : 0) + Math.max(0, 15 - 7 * Math.abs(me.budget - p.budget));
  const loc = Math.max(0, 30 - 15 * Math.abs(me.dist - p.dist));
  const life = (["time", "clean", "habit", "guest", "pet"] as const).filter((k) => me[k] === p[k]).length * 8;
  return Math.round(gb + loc + life);
}
