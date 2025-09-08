import React from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="custom-header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link text tooltip">
              홈
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-link text">
              블로그
            </Link>
          </li>
          <li>
            <Link to="/project" className="nav-link text">
              프로젝트
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
