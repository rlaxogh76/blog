import { CATEGORIES } from '../content/categories'
import { tag } from '../styles/components'

export default function Tag({ category, onClick, active }) {
  const cat = CATEGORIES[category]
  if (!cat) return null

  return (
    <span
      className={tag.base}
      style={{
        color: cat.color,
        background: active ? cat.bg : 'transparent',
        borderColor: active ? cat.color : 'var(--border)',
        fontWeight: active ? 600 : 400,
      }}
      onClick={onClick}
    >
      {cat.label}
    </span>
  )
}
