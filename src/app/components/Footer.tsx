import { Link } from "react-router";
import { useLang } from "../context/LanguageContext";
export function Footer() {
  const { tr } = useLang();
  return (
    <footer className="border-t py-8 mt-12 text-sm text-muted-foreground">
      <div className="container mx-auto px-4 flex flex-wrap justify-between gap-3">
        <span>© 2026 PassRoom · hello@passroom.vn</span>
        <span className="flex gap-4"><Link to="/rules">{tr("Chính sách", "Policy")}</Link><Link to="/rules">{tr("Quy chuẩn cộng đồng", "Community standards")}</Link></span>
      </div>
    </footer>
  );
}
