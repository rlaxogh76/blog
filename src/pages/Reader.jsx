import { useState, useEffect, useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { marked } from 'marked'
import { ARTICLES } from '../content/articles'
import { CATEGORIES } from '../content/categories'
import { toc as tocStyle } from '../styles/components'
import Tag from '../components/Tag'

// marked 설정 — 코드 블록에 언어 클래스 추가
marked.setOptions({ gfm: true, breaks: false })

function buildToc(markdown) {
  const items = []
  const lines = markdown.split('\n')
  lines.forEach((line) => {
    const h2 = line.match(/^## (.+)/)
    const h3 = line.match(/^### (.+)/)
    if (h2) {
      const text = h2[1]
      items.push({ level: 2, text, id: slugify(text) })
    } else if (h3) {
      const text = h3[1]
      items.push({ level: 3, text, id: slugify(text) })
    }
  })
  return items
}

function slugify(str) {
  return str.toLowerCase().replace(/[^가-힣a-z0-9]+/gi, '-').replace(/^-|-$/g, '')
}

export default function Reader() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeId, setActiveId] = useState('')
  const contentRef = useRef(null)

  const article = useMemo(() => ARTICLES.find((a) => a.slug === slug), [slug])
  const html = useMemo(() => (article ? marked.parse(article.content) : ''), [article])
  const toc = useMemo(() => (article ? buildToc(article.content) : []), [article])

  // ID를 헤딩에 붙이고 IntersectionObserver로 활성 섹션 추적
  useEffect(() => {
    if (!contentRef.current) return
    const headings = contentRef.current.querySelectorAll('h2, h3')
    headings.forEach((h) => {
      h.id = slugify(h.textContent)
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '-15% 0px -60% 0px' }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [html])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--text-muted)] mb-4">아티클을 찾을 수 없습니다.</p>
          <button
            className="text-[var(--accent)] text-sm underline"
            onClick={() => navigate('/articles')}
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const cat = CATEGORIES[article.category]

  return (
    <div>
      <div
        className="max-w-[1100px] mx-auto px-4 py-8 gap-10"
        style={{ display: 'grid', gridTemplateColumns: '1fr 220px', alignItems: 'start' }}
      >
        {/* Main content */}
        <article className="min-w-0">
          {/* Back */}
          <button
            className="flex items-center gap-2 text-[13px] font-mono mb-8 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => navigate('/articles')}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            아티클 목록
          </button>

          <div className="mb-5">
            <Tag category={article.category} active />
          </div>

          <h1
            className="font-serif leading-[1.15] mb-4"
            style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--text-primary)' }}
          >
            {article.title}
          </h1>

          <div
            className="text-[12px] font-mono mb-10 pb-7 border-b"
            style={{ color: 'var(--text-muted)', borderColor: 'var(--border-light)' }}
          >
            {article.date} · {article.readTime} 읽기
          </div>

          {/* Markdown body */}
          <div
            ref={contentRef}
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>

        {/* TOC sidebar */}
        <aside style={{ position: 'sticky', top: '80px' }}>
          <div
            className="text-[10px] font-mono tracking-[0.12em] uppercase mb-3.5"
            style={{ color: 'var(--text-muted)' }}
          >
            목차
          </div>
          {toc.map((item) => {
            const isActive = activeId === item.id
            return (
              <div
                key={item.id}
                className={[
                  tocStyle.item,
                  item.level === 3 ? tocStyle.itemH3 : '',
                  isActive ? tocStyle.itemActive : '',
                ].join(' ')}
                onClick={() => {
                  const el = document.getElementById(item.id)
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                {item.text}
              </div>
            )
          })}
        </aside>
      </div>
    </div>
  )
}
