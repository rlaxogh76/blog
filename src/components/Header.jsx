import { NavLink } from "react-router-dom";

const NAV = [{ to: "/", label: "홈" }];

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 border-b"
      style={{
        background: "rgba(31,31,30,0.92)",
        backdropFilter: "blur(12px)",
        borderColor: "var(--border-light)",
      }}
    >
      <div className="w-full max-w-275 mx-auto px-8 h-full flex items-center justify-between">
        <NavLink
          to="/"
          className="font-serif text-[20px]"
          style={{ color: "var(--text-primary)" }}
        >
          rlaxogh76
        </NavLink>

        <nav className="flex gap-1">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                [
                  "px-3.5 py-1.5 rounded-md text-[13px] transition-all duration-150",
                  isActive
                    ? "text-(--accent)"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-hover)",
                ].join(" ")
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
