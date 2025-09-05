import React from "react";
import "../../styles/Header.css";

const Header: React.FC = () => {
  return (
    <header className="custom-header">
      <div className="logo text">rlaxogh76</div>
      <nav>
        <ul className="nav-list">
          <li>
            <a href="#" className="nav-link text tooltip">
              홈
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text">
              블로그
            </a>
          </li>
          <li>
            <a href="#" className="nav-link text">
              프로젝트
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
