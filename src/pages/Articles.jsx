import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTICLES } from "../content/articles";
import { CATEGORIES } from "../content/categories";
import { card } from "../styles/components";

export default function Articles() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("category") || "all");
  const [activeTag, setActiveTag] = useState(searchParams.get("tag") || "");

  useEffect(() => {
    const cat = searchParams.get("category");
    const tag = searchParams.get("tag");
    setFilter(cat || "all");
    setActiveTag(tag || "");
  }, [searchParams]);

  const handleFilter = (key) => {
    setFilter(key);
    setActiveTag("");
    if (key === "all") setSearchParams({});
    else setSearchParams({ category: key });
  };

  const clearTag = () => {
    setActiveTag("");
    setSearchParams({});
  };

  const filtered = ARTICLES.filter((a) => {
    if (activeTag) return (a.tags || []).includes(activeTag);
    if (filter !== "all") return a.category === filter;
    return true;
  });

  return (
    <div>
      <div className="max-w-275 mx-auto px-4 py-0">
        {/* Filter bar */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <span
            className="inline-block px-2.5 py-0.75 rounded text-[11px] font-bold tracking-widest uppercase border cursor-pointer transition-all"
            style={{
              color:
                filter === "all" ? "var(--accent)" : "var(--text-secondary)",
              background:
                filter === "all" ? "rgba(200,169,110,0.1)" : "transparent",
              borderColor: filter === "all" ? "var(--accent)" : "var(--border)",
              fontWeight: filter === "all" ? 600 : 400,
            }}
            onClick={() => handleFilter("all")}
          >
            전체
          </span>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <span
              key={key}
              className="inline-block px-2.5 py-0.75 rounded text-[11px] font-medium tracking-widest uppercase border cursor-pointer transition-all"
              style={{
                color: filter === key ? cat.color : "var(--text-secondary)",
                background: filter === key ? cat.bg : "transparent",
                borderColor: filter === key ? cat.color : "var(--border)",
                fontWeight: filter === key ? 600 : 400,
              }}
              onClick={() => handleFilter(key)}
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Active tag badge */}
        {activeTag && (
          <div className="flex items-center gap-2 mb-5">
            <span
              className="text-[12px] font-bold"
              style={{ color: "var(--text-muted)" }}
            >
              태그:
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded"
              style={{
                background: "rgba(200,169,110,0.12)",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
              }}
            >
              #{activeTag}
              <button
                onClick={clearTag}
                style={{
                  lineHeight: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--accent)",
                  padding: 0,
                }}
              >
                ×
              </button>
            </span>
            <span
              className="text-[12px]"
              style={{ color: "var(--text-muted)" }}
            >
              {filtered.length}개
            </span>
          </div>
        )}

        {/* Article list */}
        <div className="flex flex-col gap-4">
          {filtered.map((a) => {
            const cat = CATEGORIES[a.category];
            return (
              <div
                key={a.slug}
                className={card.row}
                style={{
                  gridTemplateColumns: "1fr auto",
                  padding: "20px 24px",
                }}
                onClick={() => navigate(`/articles/${a.id}`)}
              >
                <div className="min-w-0 py-1 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: cat?.color }}
                    >
                      {cat?.label}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {a.date}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {a.readTime}
                    </span>
                  </div>
                  <div
                    className="font-bold text-[19px] mb-2 truncate"
                    style={{ fontFamily: "'BlackHanSans', sans-serif" }}
                  >
                    {a.title}
                  </div>
                  <div
                    className="text-[13.5px] line-clamp-2 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {a.desc}
                  </div>
                </div>
                {a.thumbnail && (
                  <div className="shrink-0 pl-4">
                    <img
                      src={a.thumbnail}
                      alt=""
                      className="rounded-xl object-cover"
                      style={{
                        width: 120,
                        height: 90,
                        border: "1px solid var(--border-light)",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
