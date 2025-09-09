import "../../styles/Layout/Footer.css";
import gmail from "../../assets/gmail.svg";
// import bmcLogo from "../../assets/bmc-logo.svg";
import github from "../../assets/github.svg";

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <img src={gmail} className="footer-icon" alt="footer image" />
          <img src={github} className="footer-icon" alt="footer image" />
        </div>
        <p style={{ margin: "8px 0 0 0" }}>
          © 2025 rlaxogh76. All rights reserved.
        </p>
        <a
          href="https://www.buymeacoffee.com/rlaxogh76"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <img src={bmcLogo} className="footer-icon" alt="Buy Me a Coffee logo" /> */}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
