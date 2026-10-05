import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { useLang } from "../context/LanguageContext";

export function Navbar() {
  const { tr, lang, setLang } = useLang();
  const items = [["/", tr("Trang chủ", "Home")], ["/profile/new", tr("Tìm bạn ở ghép", "Find roommate")], ["/market", tr("Chợ Pass Đồ", "Pass Market")], ["/rules", tr("Quy định cộng đồng", "Community rules")]];
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 py-3 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold"><span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"><Home className="w-4 h-4" /></span>PassRoom</Link>
        <nav className="flex flex-wrap gap-4 text-sm">{items.map(([to, l]) => <Link key={to} to={to} className="hover:text-primary">{l}</Link>)}</nav>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setLang(lang === "vi" ? "en" : "vi")}>{lang === "vi" ? "EN" : "VI"}</Button>
          <Button asChild size="sm"><Link to="/auth">{tr("Đăng nhập / Đăng ký", "Log in / Sign up")}</Link></Button>
        </div>
      </div>
    </header>
  );
}
