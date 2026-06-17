import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ARTICLES } from "../content/articles";
import { CATEGORIES } from "../content/categories";
import { toc as tocStyle } from "../styles/components";
import Tag from "../components/Tag";

// 커스텀 마크다운 컴포넌트
const markdownComponents = {
  code({ node, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";

    if (!match) {
      return (
        <code
          style={{
            padding: "2px 6px",
            borderRadius: "4px",
            background: "var(--bg-hover)",
            color: "var(--accent)",
            fontFamily: "'Source Code Pro', monospace",
            fontSize: "0.9em",
          }}
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          background: "#EDEDED",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "16px",
          fontSize: "13px",
          lineHeight: "1.5",
        }}
        codeTagProps={{ style: { background: "#EDEDED" } }}
        wrapLongLines
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  pre({ children }) {
    return <>{children}</>;
  },
  h2({ children, node }) {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        style={{
          fontSize: "24px",
          fontWeight: 700,
          marginTop: "32px",
          marginBottom: "16px",
          color: "var(--text-primary)",
          borderBottom: "1px solid var(--border-light)",
          paddingBottom: "8px",
        }}
      >
        <span data-heading-text>{children}</span>
      </h2>
    );
  },
  h3({ children, node }) {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        style={{
          fontSize: "18px",
          fontWeight: 600,
          marginTop: "24px",
          marginBottom: "12px",
          color: "var(--text-primary)",
        }}
      >
        <span data-heading-text>{children}</span>
      </h3>
    );
  },
  p({ children }) {
    return (
      <p
        style={{
          marginBottom: "16px",
          lineHeight: "1.7",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </p>
    );
  },
  ul({ children }) {
    return (
      <ul
        style={{
          marginLeft: "24px",
          marginBottom: "16px",
          listStyleType: "disc",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </ul>
    );
  },
  ol({ children }) {
    return (
      <ol
        style={{
          marginLeft: "24px",
          marginBottom: "16px",
          listStyleType: "decimal",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </ol>
    );
  },
  li({ children }) {
    return <li style={{ marginBottom: "8px" }}>{children}</li>;
  },
  blockquote({ children }) {
    return (
      <blockquote
        style={{
          borderLeft: "6px solid var(--accent)",
          paddingLeft: "16px",
          paddingTop: "0px",
          paddingBottom: "0px",
          marginLeft: "-6px",
          marginBottom: "16px",
          color: "var(--text-secondary)",
        }}
      >
        {children}
      </blockquote>
    );
  },
  table({ children }) {
    return (
      <div style={{ overflowX: "auto", marginBottom: "16px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid var(--border)",
            fontSize: "14px",
            tableLayout: "fixed",
          }}
        >
          {children}
        </table>
      </div>
    );
  },
  thead({ children }) {
    return (
      <thead
        style={{
          background: "var(--bg-hover)",
          borderBottom: "2px solid var(--border)",
        }}
      >
        {children}
      </thead>
    );
  },
  tbody({ children }) {
    return <tbody>{children}</tbody>;
  },
  tr({ children }) {
    return (
      <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
        {children}
      </tr>
    );
  },
  th({ children }) {
    return (
      <th
        style={{
          padding: "14px 16px",
          textAlign: "left",
          fontWeight: 600,
          color: "var(--text-primary)",
          lineHeight: "1.5",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          minWidth: "120px",
          whiteSpace: "normal",
        }}
      >
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td
        style={{
          padding: "14px 16px",
          color: "var(--text-primary)",
          lineHeight: "1.5",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          minWidth: "120px",
          whiteSpace: "normal",
        }}
      >
        {children}
      </td>
    );
  },
  a: null, // overridden inside Reader with navigate access
  img({ src, alt }) {
    return (
      <figure style={{ margin: 0, marginBottom: "16px" }}>
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "100%",
            height: "auto",
            border: "1px solid var(--border)",
            display: "block",
          }}
        />
        {alt && (
          <figcaption
            style={{
              textAlign: "center",
              fontSize: "0.78em",
              color: "var(--text-muted, #888)",
              marginTop: "6px",
            }}
          >
            {alt}
          </figcaption>
        )}
      </figure>
    );
  },
};

function extractText(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }
  if (children?.props?.children) {
    return extractText(children.props.children);
  }
  return "";
}

function buildToc(markdown) {
  const items = [];
  const lines = markdown.split("\n");
  lines.forEach((line) => {
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    if (h2) {
      const text = h2[1];
      items.push({ level: 2, text, id: slugify(text) });
    } else if (h3) {
      const text = h3[1];
      items.push({ level: 3, text, id: slugify(text) });
    }
  });
  return items;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^가-힣a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");
}

function TableOfContents({ items, activeId }) {
  if (items.length === 0) return null;

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = document.querySelector("header")?.offsetHeight ?? 56;
    const top =
      el.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });

    const spanEl = el.querySelector("[data-heading-text]") ?? el;
    spanEl.style.animation = "none";
    void spanEl.offsetWidth;
    spanEl.style.animation = "heading-highlight 1.1s ease-out forwards";

    setTimeout(() => {
      spanEl.style.animation = "";
    }, 1000);
  };

  return (
    <aside
      style={{
        width: "100%",
        position: "sticky",
        top: 76,
        maxHeight: "calc(100vh - 100px)",
        overflowY: "auto",
        paddingTop: 32,
        alignSelf: "flex-start",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          marginBottom: 10,
          paddingLeft: 12,
        }}
      >
        목차
      </p>
      <nav>
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              tocStyle.item,
              item.level === 3 ? tocStyle.itemH3 : "",
              activeId === item.id ? tocStyle.itemActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={(e) => handleClick(e, item.id)}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default function Reader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState("");
  const [tocVisible, setTocVisible] = useState(false);
  const contentRef = useRef(null);

  const handleTocToggle = useCallback(() => {
    setTocVisible((v) => !v);
  }, []);

  const article = useMemo(
    () => ARTICLES.find((a) => a.id === Number(id)),
    [id],
  );

  const components = useMemo(
    () => ({
      ...markdownComponents,
      a({ href, children }) {
        if (
          href &&
          !href.startsWith("http") &&
          !href.startsWith("/") &&
          href.endsWith(".md")
        ) {
          const slug = decodeURIComponent(
            href.replace(/^.*\//, "").replace(".md", ""),
          );
          const target = ARTICLES.find((a) => a.slug === slug);
          if (target) {
            return (
              <a
                href={`/articles/${target.id}`}
                style={{
                  color: "var(--accent)",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/articles/${target.id}`);
                }}
              >
                {children}
              </a>
            );
          }
        }
        return (
          <a
            href={href}
            style={{
              color: "var(--accent)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      },
    }),
    [navigate],
  );
  const toc = useMemo(
    () => (article ? buildToc(article.content) : []),
    [article],
  );

  // IntersectionObserver로 활성 섹션 추적
  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h2, h3");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-(--text-muted) mb-4">아티클을 찾을 수 없습니다.</p>
          <button
            className="text-(--accent) text-sm underline"
            onClick={() => navigate("/articles")}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const cat = CATEGORIES[article.category];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr 220px",
        gap: "0 40px",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 32px",
        boxSizing: "border-box",
        alignItems: "start",
        width: "100%",
      }}
    >
      {/* Left spacer — mirrors TOC column to true-center the article */}
      <div />

      {/* Main article */}
      <article className="px-4 py-8" style={{ minWidth: 0 }}>
        <div className="mb-5">
          <Tag category={article.category} active />
        </div>

        <h1
          className="font-bold leading-[1.15] mb-4"
          style={{
            fontSize: "clamp(26px, 4vw, 42px)",
            color: "var(--text-primary)",
            fontFamily: "'DM Serif Display', bold",
          }}
        >
          {article.title}
        </h1>

        <div
          className="text-[12px] font-bold mb-10 pb-7 border-b"
          style={{
            color: "var(--text-muted)",
            borderColor: "var(--border-light)",
          }}
        >
          {article.date} · {article.readTime} 읽기
        </div>

        {/* Markdown body */}
        <div ref={contentRef} className="markdown-body">
          <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Right TOC */}
      <TableOfContents items={toc} activeId={activeId} />
    </div>
  );
}
