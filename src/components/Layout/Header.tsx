import React, { useState, useEffect } from "react";
import "../../styles/Layout/Header.css";
import { Link } from "react-router-dom";
import darkModeIcon from "../../assets/dark-mode.svg";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`custom-header ${isScrolled ? "scrolled" : ""}`}>
      {/* // <header className="custom-header"> */}
      {/* {!isScrolled && <div className="logo">rlaxogh76</div>} */}
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link text tooltip">
              홈
            </Link>
          </li>
          <li>
            <Link to="/portfolio" className="nav-link text tooltip">
              소개
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
          <li>
            <img
              src={darkModeIcon}
              className="dark-mode-icon"
              alt="dark-mode"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
