import React from "react";
import "../../styles/Blog.css";
const Blog: React.FC = () => {
  return (
    <div style={{ color: "#222", textAlign: "center", marginTop: 50 }}>
      <h2 className="text">블로그 페이지</h2>
      <p className="text">여기에 블로그 글 목록이나 내용을 추가하세요.</p>
    </div>
  );
};

export default Blog;
