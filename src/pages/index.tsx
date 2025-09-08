import { Routes, Route } from "react-router-dom";
import Blog from "./Blog/Blog";
import Project from "./Project/Project";

export default function Index() {
  return (
    <Routes>
      <Route path="/blog" element={<Blog />} />
      <Route path="/project" element={<Project />} />
    </Routes>
  );
}
