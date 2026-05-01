import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Articles from "./pages/Articles";
import Reader from "./pages/Reader";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ paddingTop: "3.5rem", minHeight: "100vh" }}>
        <div
          style={{
            display: "flex",
            maxWidth: 1380,
            margin: "0 auto",
            padding: "28px 24px",
            gap: 20,
            alignItems: "flex-start",
          }}
        >
          <div style={{ position: "sticky", top: 76, flexShrink: 0 }}>
            <Sidebar />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Routes>
              <Route path="/" element={<Articles />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<Reader />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
