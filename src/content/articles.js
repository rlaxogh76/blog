/**
 * articles.js
 * Vite의 import.meta.glob을 사용해 content/articles/*.md 파일을
 * 동적으로 로드하고 frontmatter를 파싱합니다.
 */

// Vite glob import — 빌드 타임에 모든 .md 파일을 번들에 포함
const modules = import.meta.glob('./articles/*.md', { query: '?raw', import: 'default', eager: true })

/**
 * frontmatter 파싱 (간단한 YAML 서브셋)
 * ---
 * key: value
 * ---
 * 형식만 지원합니다.
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const meta = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(': ')
    if (key && rest.length) meta[key.trim()] = rest.join(': ').trim()
  })

  return { meta, content: match[2] }
}

// 모든 아티클을 파싱해서 배열로 반환
export const ARTICLES = Object.entries(modules).map(([path, raw]) => {
  const { meta, content } = parseFrontmatter(raw)
  const slug = path.replace('./articles/', '').replace('.md', '')

  return {
    id: Number(meta.id) || slug,
    slug,
    title: meta.title || '',
    category: meta.category || 'frontend',
    date: meta.date || '',
    readTime: meta.readTime || '',
    desc: meta.desc || '',
    tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    content,
  }
}).sort((a, b) => (a.id > b.id ? 1 : -1))
