import "../../styles/Layout/Footer.css";
import bmcLogo from "../../assets/bmc-logo.svg";

const Footer: React.FC = () => {
  return (
    <footer className="custom-footer">
      <p>© 2025 rlaxogh76. All rights reserved.</p>
      <a
        href="https://www.buymeacoffee.com/rlaxogh76"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={bmcLogo} className="footer-img" alt="Buy Me a Coffee logo" />
      </a>
    </footer>
  );
};

export default Footer;
