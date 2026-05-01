import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ARTICLES } from "../content/articles";
import { CATEGORIES } from "../content/categories";
import { card } from "../styles/components";

export default function Articles() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setFilter(cat);
  }, [searchParams]);

  const handleFilter = (key) => {
    setFilter(key);
    if (key === "all") setSearchParams({});
    else setSearchParams({ category: key });
  };

  const filtered =
    filter === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === filter);

  return (
    <div>
      <div className="max-w-275 mx-auto px-4 py-8">
        {/* Filter bar */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <span
            className="inline-block px-2.5 py-0.75 rounded text-[11px] font-medium tracking-widest uppercase border cursor-pointer transition-all"
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

        {/* Article list */}
        <div className="flex flex-col gap-3">
          {filtered.map((a) => {
            const cat = CATEGORIES[a.category];
            return (
              <div
                key={a.id}
                className={card.row}
                style={{ gridTemplateColumns: "1fr auto" }}
                onClick={() => navigate(`/articles/${a.slug}`)}
              >
                <div>
                  <div className="font-serif text-[17px] mb-1">{a.title}</div>
                  <div
                    className="text-[13px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {a.desc}
                  </div>
                </div>
                <div
                  className="text-[11px] font-mono text-right"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span
                    className="block text-[10px] tracking-widest uppercase mb-1"
                    style={{ color: cat?.color }}
                  >
                    {cat?.label}
                  </span>
                  <span className="block">{a.date}</span>
                  <span className="block">{a.readTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
