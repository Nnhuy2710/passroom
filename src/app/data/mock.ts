export type Profile = { id: string; name: string; year: number; area: string; gender: "f" | "m"; budget: number; dist: number; time: number; clean: number; habit: number; guest: number; pet: number; bio: string; av: string };
export const profiles: Profile[] = [
  { id: "1", name: "Minh Anh", year: 2, area: "Thủ Đức", gender: "f", budget: 1, dist: 0, time: 0, clean: 0, habit: 0, guest: 1, pet: 1, bio: "Hay học bài ban đêm, thích phòng gọn gàng.", av: "👩" },
  { id: "2", name: "Hà My", year: 3, area: "Dĩ An", gender: "f", budget: 1, dist: 1, time: 1, clean: 1, habit: 1, guest: 1, pet: 0, bio: "Dậy sớm, đi học 7h, ít khi ở nhà cuối tuần.", av: "👧" },
  { id: "3", name: "Quốc Bảo", year: 1, area: "Thủ Đức", gender: "m", budget: 0, dist: 0, time: 0, clean: 1, habit: 0, guest: 0, pet: 1, bio: "Sinh viên năm nhất, tìm bạn ở ghép tiết kiệm.", av: "👦" },
  { id: "4", name: "Thu Trang", year: 4, area: "Quận 9", gender: "f", budget: 2, dist: 1, time: 0, clean: 0, habit: 1, guest: 1, pet: 0, bio: "Nuôi một bé mèo, yêu thích nấu ăn.", av: "🧑" },
];
export type Product = { id: string; name: string; cat: string; price: number; fresh: number; place: string; by: string; when: string; desc: string; em: string };
export const cats = [
  { id: "elec", em: "🔌", vi: "Điện tử / Gia dụng", en: "Electronics / Appliances", items: "Nồi cơm, quạt, tủ lạnh mini, bếp từ, ấm siêu tốc" },
  { id: "furn", em: "🛏️", vi: "Nội thất / Phòng ở", en: "Furniture / Room", items: "Tủ vải, bàn học, nệm, kệ sách, gương" },
  { id: "study", em: "📚", vi: "Học tập", en: "Study", items: "Giáo trình, tài liệu, đồng hồ, máy tính bỏ túi" },
  { id: "free", em: "🎁", vi: "Góc 0Đ", en: "Free corner", items: "Đồ miễn phí cho sinh viên" },
];
export const products: Product[] = [
  { id: "1", name: "Nồi cơm Sunhouse 1.2L", cat: "elec", price: 250000, fresh: 85, place: "Cổng phụ cơ sở 1", by: "Minh Anh", when: "2 giờ trước", desc: "Dùng 1 năm, còn bảo hành tem, nấu tốt.", em: "🍚" },
  { id: "2", name: "Bàn học gấp gọn", cat: "furn", price: 180000, fresh: 80, place: "KTX khu B", by: "Quốc Bảo", when: "Hôm qua", desc: "Bàn gỗ ép, có một vết xước nhỏ.", em: "🪑" },
  { id: "3", name: "Giáo trình Giải tích 1", cat: "study", price: 40000, fresh: 90, place: "Thư viện", by: "Hà My", when: "3 ngày trước", desc: "Có ghi chú bút chì, đầy đủ trang.", em: "📘" },
  { id: "4", name: "Quạt đứng mini", cat: "free", price: 0, fresh: 70, place: "Cổng chính", by: "Thu Trang", when: "1 tuần trước", desc: "Tặng bạn nào cần, quạt chạy êm.", em: "🌀" },
];
