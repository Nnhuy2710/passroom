import { BrowserRouter, Routes, Route } from "react-router";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Landing, Auth, Chat, Rules } from "./pages/Misc";
import { ProfileForm, Matches, ProfileDetail } from "./pages/Roommate";
import { Market, ProductDetail, PostItem } from "./pages/Market";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile/new" element={<ProfileForm />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/matches/:id" element={<ProfileDetail />} />
              <Route path="/market" element={<Market />} />
              <Route path="/market/new" element={<PostItem />} />
              <Route path="/market/:id" element={<ProductDetail />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/rules" element={<Rules />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
