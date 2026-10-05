import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Action, ProfileCard, Score, Tag, budgets, useTags } from "../components/Common";
import { useLang } from "../context/LanguageContext";
import { profiles } from "../data/mock";
import { defaultMe, getMe, score } from "../lib/matching";

export function ProfileForm() {
  const { tr } = useLang(); const go = useNavigate();
  const [me, setMe] = useState({ ...getMe() });
  const groups: [keyof typeof defaultMe, string, string[][]][] = [
    ["gender", "Giới tính / Gender", [["Nữ", "Female"], ["Nam", "Male"]]],
    ["budget", "Ngân sách / Budget", budgets.map((b) => [b, b])],
    ["dist", "Vị trí / Location", [["Trong 2km", "Within 2km"], ["Trong 5km", "Within 5km"], ["Khác", "Other"]]],
    ["time", "Giờ giấc / Schedule", [["Tự do / Khóa riêng", "Free / own key"], ["Về trước 23h", "Home by 11pm"]]],
    ["clean", "Vệ sinh / Cleanliness", [["Cực kỳ ngăn nắp", "Very tidy"], ["Dọn 1 lần/tuần", "Weekly"]]],
    ["habit", "Thói quen / Habit", [["Thức khuya", "Night owl"], ["Dậy sớm", "Early bird"]]],
    ["guest", "Khách đến chơi / Guests", [["Hạn chế / Không", "Limited / none"], ["Cho phép", "Allowed"]]],
    ["pet", "Thú cưng & hút thuốc / Pets & smoking", [["Không thuốc & không thú cưng", "No smoking, no pets"], ["Có thú cưng", "Has pets"]]],
  ];
  const val = (k: string, i: number) => (k === "gender" ? (i === 0 ? "f" : "m") : i);
  const save = () => localStorage.setItem("passroom-me", JSON.stringify(me));
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">{tr("Tạo hồ sơ lối sống", "Lifestyle profile")}</h1>
      {groups.map(([k, t, o]) => (
        <Card key={k}><CardContent className="p-4 space-y-2"><div className="text-sm font-medium">{t}</div>
          <div className="flex flex-wrap gap-2">{o.map((x, i) => <Button key={i} size="sm" variant={(me as any)[k] === val(k, i) ? "default" : "outline"} onClick={() => setMe({ ...me, [k]: val(k, i) })}>{tr(x[0], x[1])}</Button>)}</div></CardContent></Card>
      ))}
      <Textarea maxLength={200} placeholder={tr("Mô tả (tối đa 200 ký tự)", "About you (max 200 chars)")} value={me.bio} onChange={(e) => setMe({ ...me, bio: e.target.value })} />
      <div className="flex gap-2"><Button variant="outline" onClick={() => go("/")}>{tr("Quay lại", "Back")}</Button>
        <Button variant="secondary" onClick={save}>{tr("Lưu hồ sơ", "Save profile")}</Button>
        <Button onClick={() => { save(); go("/matches"); }}>{tr("Tìm người phù hợp", "Find matches")}</Button></div>
    </div>
  );
}

export function Matches() {
  const { tr } = useLang(); const me = getMe();
  const [b, setB] = useState(-1);
  const list = profiles.filter((p) => b < 0 || p.budget === b).map((p) => ({ p, s: score(me, p) })).sort((x, y) => y.s - x.s);
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">{tr("Kết quả ghép đôi", "Your matches")}</h1>
      <div className="flex flex-wrap gap-2 items-center text-sm">{tr("Ngân sách:", "Budget:")}
        {[-1, 0, 1, 2].map((i) => <Button key={i} size="sm" variant={b === i ? "default" : "outline"} onClick={() => setB(i)}>{i < 0 ? tr("Tất cả", "All") : budgets[i]}</Button>)}</div>
      <p className="text-xs text-muted-foreground">{tr("Điểm: giới tính + ngân sách 30% · vị trí 30% · lối sống 40%", "Score: gender + budget 30% · location 30% · lifestyle 40%")}</p>
      <div className="grid md:grid-cols-2 gap-4">{list.map(({ p, s }) => <ProfileCard key={p.id} p={p} s={s} />)}</div>
    </div>
  );
}

export function ProfileDetail() {
  const { tr } = useLang(); const tags = useTags(); const { id } = useParams();
  const p = profiles.find((x) => x.id === id) ?? profiles[0];
  return (
    <div className="container mx-auto px-4 py-8 max-w-xl space-y-4">
      <div className="flex items-center gap-3"><span className="text-6xl">{p.av}</span><div><h1 className="text-2xl font-semibold">{p.name}</h1><div className="text-sm text-muted-foreground">{tr("Năm", "Year")} {p.year} · {p.area} · {budgets[p.budget]}</div></div></div>
      <div className="flex flex-wrap gap-1.5">{tags(p).map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <p>{p.bio}</p><Score v={score(getMe(), p)} />
      <div className="flex gap-2"><Button>{tr("Kết nối", "Connect")}</Button><Button asChild variant="outline"><Link to="/chat">{tr("Nhắn tin", "Message")}</Link></Button><Action label={tr("Báo cáo hồ sơ", "Report profile")} /></div>
    </div>
  );
}
