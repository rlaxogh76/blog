import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Moon, Search, X } from "lucide-react";
import { ARTICLES } from "../content/articles";
import { CATEGORIES } from "../content/categories";

import "../styles/global.css";

import { SiNotion } from "react-icons/si";

function IconButton({ onClick, label, children, onMouseEnter, onMouseLeave }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 34,
        height: 34,
        borderRadius: 8,
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        color: "var(--text-secondary)",
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--bg-hover)";
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--bg-card)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results =
    query.trim().length < 1
      ? []
      : ARTICLES.filter((a) => {
          const q = query.toLowerCase();
          return (
            a.title.toLowerCase().includes(q) ||
            a.desc.toLowerCase().includes(q) ||
            (a.tags || []).some((t) => t.toLowerCase().includes(q))
          );
        });

  const handleSelect = (id) => {
    navigate(`/articles/${id}`);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          margin: "0 16px",
          borderRadius: 12,
          border: "1px solid var(--border)",
          background: "var(--bg-surface)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          overflow: "hidden",
        }}
      >
        {/* 입력창 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderBottom: query.trim() ? "1px solid var(--border)" : "none",
          }}
        >
          <Search
            size={16}
            style={{ color: "var(--text-muted)", flexShrink: 0 }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="아티클 검색..."
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontSize: 15,
              color: "var(--text-primary)",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                display: "flex",
                padding: 2,
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* 결과 목록 */}
        {query.trim().length >= 1 && (
          <div style={{ maxHeight: 360, overflowY: "auto" }}>
            {results.length === 0 ? (
              <div
                style={{
                  padding: "24px 16px",
                  textAlign: "center",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                검색 결과가 없습니다
              </div>
            ) : (
              results.map((a) => {
                const cat = CATEGORIES[a.category];
                return (
                  <div
                    key={a.id}
                    onClick={() => handleSelect(a.id)}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--border-light)",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--bg-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: 3,
                      }}
                    >
                      {a.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text-secondary)",
                        marginBottom: 6,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {a.desc}
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {cat && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: cat.color,
                            background: cat.bg,
                            borderRadius: 4,
                            padding: "1px 6px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                          }}
                        >
                          {cat.label}
                        </span>
                      )}
                      <span
                        style={{ fontSize: 11, color: "var(--text-muted)" }}
                      >
                        {a.date}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 border-b"
        style={{
          background: "transparent",
          backdropFilter: "blur(12px)",
          borderColor: "var(--border-light)",
        }}
      >
        <div className="w-full max-w-335 mx-auto px-6 h-full flex items-center justify-between">
          <NavLink
            to="/"
            className="text-[15px] font-bold"
            style={{
              color: "var(--text-primary)",
              fontWeight: 400,
              fontFamily: "'Monoton', sans-serif",
              letterSpacing: "5px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.classList.add("logo-gradient-hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("logo-gradient-hover")}
          >
            rlaxogh76
          </NavLink>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* 검색 */}
            <button
              onClick={() => setSearchOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 34,
                padding: "0 10px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: 12,
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              aria-label="검색"
            >
              <Search size={14} />
              <span>검색</span>
              <span
                style={{
                  fontSize: 10,
                  padding: "1px 5px",
                  borderRadius: 4,
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  letterSpacing: "0.02em",
                }}
              >
                ⌘K
              </span>
            </button>

            {/* 노션 링크 */}
            <button
              onClick={() =>
                window.open(
                  "https://rlaxogh76-portfolio.notion.site/1f31a96d4e7b80468577ff858a679064?pvs=74",
                  "_blank",
                )
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              aria-label="Notion 페이지로 이동"
            >
              <SiNotion />
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              aria-label="다크 모드 토글"
            >
              <Moon size={16} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
