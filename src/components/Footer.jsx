import { SiGithub, SiNotion } from "react-icons/si";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-light)",
        background: "var(--bg-card)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: 1380,
          margin: "0 auto",
          padding: "20px 24px",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} rlaxogh76. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
