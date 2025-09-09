import type React from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog/Blog";
import Project from "./pages/Project/Project";
import Footer from "./components/Layout/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="hero-text">
                <h1>Hello world</h1>
              </div>
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
                style={{ "--color": "cyan" } as React.CSSProperties}
              ></div>
              <div
                className="box"
                style={{ "--color": "orange" } as React.CSSProperties}
              ></div>
              <div
                className="box"
                style={{ "--color": "cyan" } as React.CSSProperties}
              ></div>
              <Footer />
            </div>
          }
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Project" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
