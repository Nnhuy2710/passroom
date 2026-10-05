import { createContext, useContext, useState, ReactNode } from "react";
type Lang = "vi" | "en";
type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (vi: string, en: string) => string };
const C = createContext<Ctx>(null!);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, s] = useState<Lang>(() => (localStorage.getItem("passroom-lang") as Lang) || "vi");
  const setLang = (l: Lang) => { localStorage.setItem("passroom-lang", l); s(l); };
  return <C.Provider value={{ lang, setLang, tr: (v, e) => (lang === "vi" ? v : e) }}>{children}</C.Provider>;
}
export const useLang = () => useContext(C);
