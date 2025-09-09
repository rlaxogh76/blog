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
              <div className="hero-text title">
                <h1 className="title">
                  rlaxogh
                  <span style={{ color: "#4979ff" }}>76</span>
                </h1>
              </div>
              {/* <div className="line"></div> */}

              <h1 className="main-text">인기 글</h1>
              <div
                className="box section-box-1"
                style={{ "--color": "white" } as React.CSSProperties}
              ></div>
              <div
                className="box"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box"
                style={{ "--color": "cyan" } as React.CSSProperties}
              ></div>
              <div
                className="box"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div className="Github-link">
                <img
                  src="https://avatars.githubusercontent.com/u/108007761?v=4"
                  className="Github-img"
                  alt="Github image"
                />
              </div>
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
