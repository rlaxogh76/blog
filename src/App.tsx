import type React from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog/Blog";
import Project from "./pages/Project/Project";
import Footer from "./components/Layout/Footer";
import Portfolio from "./pages/portfolio/Portfolio";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="scroll-container">
              <div className="scroll-area hero-text title">
                <h1 className="title">
                  rlaxogh
                  <span style={{ color: "#4979ff" }}>76</span>
                </h1>
              </div>
              <div className="line"></div>
              <div
                className="box scroll-area"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box scroll-area"
                style={{ "--color": "cyan" } as React.CSSProperties}
              ></div>
              <div
                className="box scroll-area"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box scroll-area"
                style={{ "--color": "cyan" } as React.CSSProperties}
              ></div>
              <div
                className="box scroll-area"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box scroll-area"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box scroll-area"
                style={{ "--color": "cyan" } as React.CSSProperties}
              ></div>
              <Footer />
            </div>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </>
  );
}

export default App;
