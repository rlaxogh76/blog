import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTICLES } from "../content/articles";
import { CATEGORIES } from "../content/categories";

const PROFILE = {
  name: "rlaxogh76",
  specialty: "양보다 질 좋은 글을 작성하기 위해 노력하는 개발자.",
  avatar: "https://avatars.githubusercontent.com/u/108007761?v=4",
  github: "https://github.com/rlaxogh76",
};

const CAT_LIMIT = 4;

function SectionTitle({ children }) {
  return (
    <div
      className="flex items-center gap-2 text-[13px] font-semibold mb-3"
      style={{ color: "var(--text-primary)" }}
    >
      <span
        style={{
          width: 3,
          height: 14,
          background: "var(--accent)",
          borderRadius: 2,
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      {children}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderRadius: 10,
        border: "1px solid var(--border)",
        padding: "16px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTags = new Set(searchParams.getAll("tag"));
  const [showAllCats, setShowAllCats] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts = {};
    ARTICLES.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    ARTICLES.forEach((a) => (a.tags || []).forEach((t) => tagSet.add(t)));
    return [...tagSet].sort();
  }, []);

  const catEntries = Object.entries(CATEGORIES).filter(
    ([key]) => categoryCounts[key],
  );
  const visibleCats = showAllCats ? catEntries : catEntries.slice(0, CAT_LIMIT);
  const hasMoreCats = catEntries.length > CAT_LIMIT;

  return (
    <aside
      style={{
        width: 210,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Profile */}
      <Card>
        <div style={{ textAlign: "center" }}>
          <img
            className="hover:scale-110 transition-transform"
            src={PROFILE.avatar}
            alt={PROFILE.name}
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              border: "1px solid var(--border)",
              marginBottom: 10,
              display: "block",
              margin: "0 auto 10px",
            }}
          />
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
            {PROFILE.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              marginBottom: 12,
              lineHeight: 1.5,
            }}
          >
            {PROFILE.specialty}
          </div>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              padding: "5px 14px",
              borderRadius: 6,
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              background: "var(--bg-card)",
              textDecoration: "none",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </Card>

      {/* Categories */}
      {catEntries.length > 0 && (
        <Card>
          <SectionTitle>카테고리</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {visibleCats.map(([key, cat]) => (
              <div
                key={key}
                onClick={() => navigate(`/?category=${key}`)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "5px 6px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 13,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--bg-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#fff",
                    background: cat.color,
                    borderRadius: 999,
                    padding: "1px 7px",
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {categoryCounts[key]}
                </span>
              </div>
            ))}
          </div>
          {hasMoreCats && (
            <button
              onClick={() => setShowAllCats((v) => !v)}
              style={{
                marginTop: 6,
                width: "100%",
                fontSize: 12,
                color: "var(--text-muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              {showAllCats ? "접기" : "··· 더 보기"}
            </button>
          )}
        </Card>
      )}

      {/* Tags */}
      {allTags.length > 0 && (
        <Card>
          <SectionTitle>태그</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {allTags.map((tag) => {
              const isActive = activeTags.has(tag);
              return (
                <span
                  key={tag}
                  onClick={() => {
                    const next = new Set(activeTags);
                    if (isActive) next.delete(tag);
                    else next.add(tag);
                    if (next.size === 0) {
                      navigate("/");
                    } else {
                      const params = new URLSearchParams();
                      next.forEach((t) => params.append("tag", t));
                      navigate(`/?${params.toString()}`);
                    }
                  }}
                  style={{
                    fontSize: 11,
                    padding: "3px 8px",
                    borderRadius: 4,
                    background: isActive
                      ? "rgba(200,169,110,0.12)"
                      : "var(--bg-card)",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                    color: isActive ? "var(--accent)" : "var(--text-secondary)",
                    cursor: "pointer",
                    fontWeight: isActive ? 600 : 400,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </Card>
      )}
    </aside>
  );
}
