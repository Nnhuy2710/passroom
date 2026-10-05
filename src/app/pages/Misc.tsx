import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Action } from "../components/Common";
import { useLang } from "../context/LanguageContext";

export function Landing() {
  const { tr } = useLang();
  const f = [["🏠", tr("Ghép bạn ở theo lối sống", "Lifestyle-based matching"), tr("Điểm tương thích dựa trên ngân sách, vị trí, thói quen.", "Compatibility from budget, location and habits.")],
    ["🎁", tr("Pass đồ sinh viên", "Student item pass"), tr("Mua, bán, tặng đồ dùng ngay trong khu vực của bạn.", "Buy, sell or give away items nearby.")],
    ["🔒", tr("Bảo mật và an toàn", "Privacy and safety"), tr("Quy chuẩn cộng đồng và báo cáo hồ sơ/bài đăng.", "Community rules and easy reporting.")]];
  return (<>
    <section className="container mx-auto px-4 py-20 text-center space-y-6">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">{tr("Tìm người ở ghép – Pass đồ dễ dàng – Sống đúng gu", "Find a roommate – Pass items easily – Live your way")}</h1>
      <div className="flex justify-center gap-3 flex-wrap">
        <Button asChild size="lg"><Link to="/profile/new">{tr("Tìm bạn ở ghép", "Find a roommate")}</Link></Button>
        <Button asChild size="lg" variant="outline"><Link to="/market">{tr("Khám phá chợ Pass Đồ", "Explore Pass Market")}</Link></Button></div>
    </section>
    <section className="container mx-auto px-4 grid md:grid-cols-3 gap-4">{f.map(([e, t, d]) =>
      <Card key={t}><CardContent className="p-6 space-y-2"><div className="text-3xl">{e}</div><div className="font-medium">{t}</div><p className="text-sm text-muted-foreground">{d}</p></CardContent></Card>)}</section>
  </>);
}

export function Auth() {
  const { tr } = useLang(); const go = useNavigate();
  return (
    <div className="container mx-auto px-4 py-16 max-w-sm space-y-3">
      <h1 className="text-2xl font-semibold">{tr("Đăng ký / Đăng nhập", "Sign up / Log in")}</h1>
      <Input placeholder="Email / SĐT" /><Input type="password" placeholder={tr("Mật khẩu", "Password")} />
      <Button className="w-full" onClick={() => go("/profile/new")}>{tr("Tiếp tục", "Continue")}</Button>
      <Button variant="outline" className="w-full">Google</Button>
    </div>
  );
}

export function Chat() {
  const { tr } = useLang();
  const [m, setM] = useState([tr("Chào bạn, mình thấy hồ sơ của bạn rất hợp!", "Hi, your profile looks like a great match!")]);
  const [v, setV] = useState("");
  return (
    <div className="container mx-auto px-4 py-8 max-w-xl space-y-3">
      <div className="flex justify-between items-center"><div className="font-medium">👩 Minh Anh</div><div className="flex gap-1"><Action label={tr("Hẹn gặp", "Meet")} primary /><Action label={tr("Báo cáo / Chặn", "Report / Block")} /></div></div>
      <div className="border rounded-lg p-4 min-h-64 space-y-2">{m.map((x, i) => <div key={i} className="bg-secondary rounded-lg px-3 py-2 w-fit">{x}</div>)}</div>
      <div className="flex gap-2"><Input value={v} onChange={(e) => setV(e.target.value)} placeholder={tr("Nhập tin nhắn…", "Type a message…")} />
        <Button onClick={() => { if (v) { setM([...m, v]); setV(""); } }}>{tr("Gửi", "Send")}</Button></div>
      <p className="text-xs text-muted-foreground">{tr("MVP có thể chuyển sang Zalo/Messenger thay vì chat trong web.", "MVP may hand off to Zalo/Messenger instead of in-app chat.")}</p>
    </div>
  );
}

export function Rules() {
  const { tr } = useLang(); const [ok, setOk] = useState(false);
  const r = [["🔒", "Bảo mật thông tin cá nhân", "Personal data privacy"], ["⚠️", "Cảnh báo lừa đảo", "Scam warnings"], ["🤝", "Quy tắc giao tiếp", "Communication rules"], ["🏠", "Lưu ý khi gặp người ở ghép", "Meeting a roommate"], ["💰", "Lưu ý khi mua bán / nhận đồ", "Buying / selling safely"], ["🚨", "Cách báo cáo tài khoản hoặc bài đăng", "How to report accounts or posts"]];
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl space-y-3">
      <h1 className="text-2xl font-semibold">{tr("Quy chuẩn cộng đồng", "Community standards")}</h1>
      {r.map(([e, v, n]) => <Card key={n}><CardContent className="p-4">{e} {tr(v, n)}</CardContent></Card>)}
      <Button disabled={ok} onClick={() => setOk(true)}>{ok ? "✓" : tr("Tôi đã đọc và đồng ý", "I have read and agree")}</Button>
    </div>
  );
}
