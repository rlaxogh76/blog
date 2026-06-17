import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Articles from "./pages/Articles";
import Reader from "./pages/Reader";

import { useEffect, useRef } from "react";

function Layout() {
  const { pathname } = useLocation();
  const isReader = /^\/articles\/.+/.test(pathname);
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      console.log(`
██████╗ ██╗      █████╗ ██╗  ██╗ ██████╗  ██████╗ ██╗  ██╗███████╗ ██████╗
██╔══██╗██║     ██╔══██╗╚██╗██╔╝██╔═══██╗██╔════╝ ██║  ██║╚════██║██╔════╝
██████╔╝██║     ███████║ ╚███╔╝ ██║   ██║██║  ███╗███████║    ██╔╝███████╗
██╔══██╗██║     ██╔══██║ ██╔██╗ ██║   ██║██║   ██║██╔══██║   ██╔╝ ██╔═══██╗
██║  ██║███████╗██║  ██║██╔╝ ██╗╚██████╔╝╚██████╔╝██║  ██║   ██║  ╚██████╔╝
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═════╝
                                                                           `);
      console.log(
        `%c블로그에 오신 것을 환영합니다!`,
        "color: #FFAC1C; font-size: 30px; font-weight: bold;",
      );
      hasLogged.current = true;
    }
  }, []);

  return (
    <div
      style={{
        paddingTop: "3.5rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          maxWidth: isReader ? 1600 : 1380,
          width: "100%",
          margin: "0 auto",
          padding: isReader ? "28px 0" : "28px 24px",
          gap: 20,
          alignItems: "flex-start",
        }}
      >
        {!isReader && (
          <div style={{ position: "sticky", top: 76, flexShrink: 0 }}>
            <Sidebar />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<Reader />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Layout />
    </BrowserRouter>
  );
}
