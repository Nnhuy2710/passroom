import { ReactNode } from "react";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useLang } from "../context/LanguageContext";
import { Profile, Product } from "../data/mock";

export const Tag = ({ children }: { children: ReactNode }) => <Badge variant="secondary" className="rounded-md font-normal">{children}</Badge>;
export const Score = ({ v }: { v: number }) => <span className="text-sm font-semibold text-primary">Matching Score: {v}%</span>;
export const vnd = (n: number) => n.toLocaleString("vi-VN") + "đ";

export function useTags() {
  const { tr } = useLang();
  return (p: Pick<Profile, "time" | "clean" | "habit" | "guest" | "pet">) => [
    p.habit === 0 ? tr("🌙 Thức khuya", "🌙 Night owl") : tr("☀️ Dậy sớm", "☀️ Early bird"),
    p.clean === 0 ? tr("🧹 Ngăn nắp", "🧹 Very tidy") : tr("🧺 Dọn 1 lần/tuần", "🧺 Tidy weekly"),
    p.pet === 0 ? tr("🚫 Không thú cưng/thuốc", "🚫 No pets/smoking") : tr("🐶 Có thú cưng", "🐶 Has pets"),
    p.guest === 0 ? tr("🙅 Hạn chế khách", "🙅 No guests") : tr("👥 Cho khách", "👥 Guests OK"),
  ];
}
export const budgets = ["< 1.5tr", "1.5 – 2.5tr", "> 2.5tr"];

export function ProfileCard({ p, s }: { p: Profile; s: number }) {
  const { tr } = useLang(); const tags = useTags();
  return (
    <Card><CardContent className="p-5 space-y-3">
      <div className="flex items-center gap-3"><span className="text-4xl">{p.av}</span>
        <div><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{tr("Năm", "Year")} {p.year} · {p.area} · {budgets[p.budget]}</div></div></div>
      <div className="flex flex-wrap gap-1.5">{tags(p).map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <Score v={s} />
      <div className="flex gap-2"><Button asChild variant="outline" size="sm"><Link to={`/matches/${p.id}`}>{tr("Xem hồ sơ", "View profile")}</Link></Button>
        <Button asChild size="sm"><Link to="/chat">{tr("Kết nối", "Connect")}</Link></Button></div>
    </CardContent></Card>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { tr } = useLang();
  return (
    <Card><CardContent className="p-5 space-y-2">
      <div className="text-5xl text-center py-4 bg-secondary rounded-lg">{p.em}</div>
      <div className="font-medium">{p.name}</div>
      <div className="flex items-center gap-2"><span className="font-semibold text-primary">{p.price ? vnd(p.price) : ""}</span>
        {!p.price && <Badge>{tr("TẶNG 0Đ", "FREE 0Đ")}</Badge>}<Tag>{p.fresh}% {tr("mới", "new")}</Tag></div>
      <div className="text-xs text-muted-foreground">📍 {p.place} · {p.by} · {p.when}</div>
      <div className="flex gap-2 pt-1"><Button asChild variant="outline" size="sm"><Link to={`/market/${p.id}`}>{tr("Xem chi tiết", "Details")}</Link></Button>
        <Action label={tr("Hẹn qua xem đồ", "Arrange a visit")} primary /><Action label={tr("Báo cáo", "Report")} /></div>
    </CardContent></Card>
  );
}

// Dialog dùng chung cho "Hẹn qua xem đồ", "Báo cáo", "Hẹn gặp", "Báo cáo / Chặn"
export function Action({ label, primary }: { label: string; primary?: boolean }) {
  const { tr } = useLang();
  return (
    <Dialog><DialogTrigger asChild><Button size="sm" variant={primary ? "default" : "ghost"}>{label}</Button></DialogTrigger>
      <DialogContent><DialogTitle>{label}</DialogTitle>
        <p className="text-sm text-muted-foreground">{tr("Chức năng demo cho prototype. Hãy gặp ở nơi công cộng và không chuyển tiền trước.", "Prototype demo. Meet in public places and never pay in advance.")}</p>
      </DialogContent></Dialog>
  );
}
