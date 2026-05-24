const SKILLS = [
  { name: "React / Next.js", level: "Advanced" },
  { name: "TypeScript", level: "Advanced" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Web Security", level: "Intermediate" },
  { name: "Docker / K8s", level: "Intermediate" },
  { name: "Algorithms", level: "Intermediate" },
];

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ARTICLES } from "../content/articles";
import { CATEGORIES } from "../content/categories";
import { ButtonPrimary, ButtonGhost } from "../components/Button";
import ArticleCard from "../components/ArticleCard";

export default function About() {
  const navigate = useNavigate();

  const byCategory = useMemo(() => {
    const map = {};
    ARTICLES.forEach((a) => {
      if (!map[a.category]) map[a.category] = [];
      if (map[a.category].length < 3) map[a.category].push(a);
    });
    return map;
  }, []);

  return (
    <div className="pt-14 min-h-screen">
      <div className="max-w-175 mx-auto px-8 py-16">
        {/* Avatar & Name & Description */}
        <img
          src="https://avatars.githubusercontent.com/u/108007761?v=4"
          alt="Developer J"
          className="w-40 h-40 rounded-full flex items-center justify-center mb-7 border-2"
        />

        <h1 className="font-serif text-[34px] mb-1.5">rlaxogh76</h1>
        <div
          className="text-[12px] font-mono tracking-widest uppercase mb-6"
          style={{ color: "var(--accent)" }}
        >
          Frontend Developer & Tech Blogger
        </div>

        <p
          className="text-[15px] leading-[1.85] mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          프론트엔드 개발을 주로 하며, 보안과 성능에 관심이 많습니다. 배운 것을
          글로 정리하는 것을 좋아하며, 이 블로그는 그 기록입니다. 좋은 코드와
          좋은 아키텍처에 대해 항상 고민합니다.
        </p>

        <hr
          className="border-t my-10"
          style={{ borderColor: "var(--border-light)" }}
        />

        <div className="pt-14 min-h-screen">
          {/* Category Sections */}
          <div className="max-w-275 mx-auto px-8 py-14">
            {Object.entries(byCategory).map(([catKey, articles]) => {
              const cat = CATEGORIES[catKey];
              return (
                <div key={catKey} className="mb-14">
                  <div className="flex items-baseline justify-between mb-6">
                    <h2
                      className="font-serif text-[22px]"
                      style={{ color: cat.color }}
                    >
                      {cat.label}
                    </h2>
                    <button
                      className="text-[12px] font-mono tracking-[0.08em] transition-all"
                      style={{ color: "var(--accent)" }}
                      onClick={() => navigate(`/articles?category=${catKey}`)}
                      onMouseEnter={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      전체 보기 →
                    </button>
                  </div>
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                    }}
                  >
                    {articles.map((a) => (
                      <ArticleCard
                        key={a.slug}
                        article={a}
                        onClick={() => navigate(`/articles/${a.id}`)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <footer
            className="border-t py-8 text-center text-[12px] font-mono"
            style={{
              borderColor: "var(--border-light)",
              color: "var(--text-muted)",
            }}
          >
            © 2025 dev.log · 꾸준히 쌓아가는 기록
          </footer>
        </div>
      </div>
    </div>
  );
}
