import { useState } from "react";
import { useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import { Action, ProductCard, Tag, vnd } from "../components/Common";
import { useLang } from "../context/LanguageContext";
import { cats, products } from "../data/mock";

export function Market() {
  const { tr, lang } = useLang(); const [c, setC] = useState("");
  return (
    <div className="container mx-auto px-4 py-8 space-y-5">
      <div className="flex justify-between"><h1 className="text-2xl font-semibold">{tr("Chợ Pass Đồ", "Pass Market")}</h1><Button asChild><a href="/market/new">{tr("Đăng bài", "Post item")}</a></Button></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{cats.map((x) =>
        <Card key={x.id} onClick={() => setC(c === x.id ? "" : x.id)} className={`cursor-pointer ${c === x.id ? "border-primary" : ""}`}><CardContent className="p-4"><div className="text-2xl">{x.em}</div><div className="font-medium text-sm">{x[lang]}</div><div className="text-xs text-muted-foreground">{x.items}</div></CardContent></Card>)}</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{products.filter((p) => !c || p.cat === c).map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </div>
  );
}

export function ProductDetail() {
  const { tr } = useLang(); const { id } = useParams();
  const p = products.find((x) => x.id === id) ?? products[0];
  return (
    <div className="container mx-auto px-4 py-8 max-w-xl space-y-3">
      <div className="text-8xl text-center bg-secondary rounded-xl py-10">{p.em}</div>
      <h1 className="text-2xl font-semibold">{p.name}</h1>
      <div className="flex gap-2 items-center"><span className="text-xl font-semibold text-primary">{p.price ? vnd(p.price) : tr("TẶNG 0Đ", "FREE")}</span><Tag>{p.fresh}% {tr("mới", "new")}</Tag></div>
      <p>{p.desc}</p><div className="text-sm text-muted-foreground">📍 {p.place} · {p.by} · {p.when}</div>
      <div className="flex gap-2"><Action label={tr("Hẹn qua xem đồ", "Arrange a visit")} primary /><Button variant="outline">{tr("Lưu bài", "Save")}</Button><Action label={tr("Báo cáo", "Report")} /></div>
    </div>
  );
}

export function PostItem() {
  const { tr } = useLang(); const [prev, setPrev] = useState(false); const [f, setF] = useState({ name: "", price: "", fresh: "85", place: "", desc: "" });
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });
  if (prev) return (
    <div className="container mx-auto px-4 py-8 max-w-xl space-y-3"><h1 className="text-xl font-semibold">{tr("Xem trước bài đăng", "Preview")}</h1>
      <Card><CardContent className="p-5 space-y-1"><div className="font-medium">{f.name}</div><div className="text-primary">{+f.price ? vnd(+f.price) : tr("TẶNG 0Đ", "FREE")} · {f.fresh}%</div><div className="text-sm">📍 {f.place}</div><p className="text-sm">{f.desc}</p></CardContent></Card>
      <div className="flex gap-2"><Button variant="outline" onClick={() => setPrev(false)}>{tr("Quay lại", "Back")}</Button><Button>{tr("Đăng bài", "Publish")}</Button></div></div>
  );
  return (
    <div className="container mx-auto px-4 py-8 max-w-xl space-y-3">
      <h1 className="text-2xl font-semibold">{tr("Đăng bài Pass Đồ", "Post an item")}</h1>
      <div className="border border-dashed rounded-lg p-6 text-center text-sm text-muted-foreground">📷 {tr("Tải lên 1–3 hình ảnh", "Upload 1–3 photos")}</div>
      <Input placeholder={tr("Tên sản phẩm", "Item name")} value={f.name} onChange={set("name")} />
      <div className="flex gap-2"><Input type="number" placeholder={tr("Giá (0 = Tặng 0Đ)", "Price (0 = free)")} value={f.price} onChange={set("price")} /><Input type="number" placeholder={tr("Độ mới %", "Condition %")} value={f.fresh} onChange={set("fresh")} /></div>
      <Input placeholder={tr("Địa điểm giao nhận", "Pickup place")} value={f.place} onChange={set("place")} />
      <Textarea placeholder={tr("Mô tả tình trạng", "Condition notes")} value={f.desc} onChange={set("desc")} />
      <Button onClick={() => setPrev(true)}>{tr("Xem trước bài đăng", "Preview")}</Button>
    </div>
  );
}
