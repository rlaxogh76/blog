/**
 * articles.js
 * Vite의 import.meta.glob을 사용해 content/articles/*.md 파일을
 * 동적으로 로드하고 frontmatter를 파싱합니다.
 */

// Vite glob import — 빌드 타임에 모든 .md 파일을 번들에 포함 (하위 폴더 포함)
const modules = import.meta.glob('./articles/**/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const meta = {}
  match[1].split(/\r?\n/).forEach((line) => {
    const [key, ...rest] = line.split(': ')
    if (key && rest.length) meta[key.trim()] = rest.join(': ').trim()
  })

  return { meta, content: match[2] }
}

function extractFirstImage(content) {
  const htmlImg = content.match(/<img[^>]+src=["']([^"']+)["']/)
  if (htmlImg) return htmlImg[1]
  const mdImg = content.match(/!\[[^\]]*\]\(([^)]+)\)/)
  if (mdImg) return mdImg[1]
  return null
}

// 모든 아티클을 파싱해서 배열로 반환 (첫 번째 폴더명을 카테고리로 사용)
// 날짜 오름차순으로 ID를 고정 부여한 뒤 표시용으로 내림차순 재정렬
export const ARTICLES = Object.entries(modules).map(([path, raw]) => {
  const { meta, content } = parseFrontmatter(raw)

  const segments = path.replace('./articles/', '').split('/')
  const category = segments.length > 1 ? segments[0] : (meta.category || 'frontend')
  const slug = segments[segments.length - 1].replace('.md', '')

  return {
    slug,
    title: meta.title || '',
    category,
    date: meta.date || '',
    readTime: meta.readTime || '',
    desc: meta.desc || '',
    tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    thumbnail: meta.thumbnail || extractFirstImage(content) || null,
    content,
  }
})
.sort((a, b) => new Date(a.date) - new Date(b.date))
.map((article, index) => ({ ...article, id: index + 1 }))
.sort((a, b) => new Date(b.date) - new Date(a.date))
