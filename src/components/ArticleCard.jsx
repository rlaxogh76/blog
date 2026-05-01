import { CATEGORIES } from "../content/categories";
import { card } from "../styles/components";

export default function ArticleCard({ article, onClick }) {
  const cat = CATEGORIES[article.category];

  return (
    <div className={card.article} onClick={onClick}>
      <div
        className="text-[10px] font-mono tracking-[0.12em] uppercase"
        style={{ color: cat?.color }}
      >
        {cat?.label}
      </div>

      <div className="font-serif text-[18px] leading-snug">{article.title}</div>

      <div
        className="text-[13px] leading-relaxed flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {article.desc}
      </div>

      <div
        className="flex items-center gap-2 text-[11px] font-mono mt-auto pt-3 border-t"
        style={{
          color: "var(--text-muted)",
          borderColor: "var(--border-light)",
        }}
      >
        <span>{article.date}</span>
        <span className="w-0.75 h-0.75 rounded-full bg-(--text-muted)" />
        <span>{article.readTime} 읽기</span>
      </div>
    </div>
  );
}
