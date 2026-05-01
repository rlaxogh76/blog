import { btn } from '../styles/components'

export function ButtonPrimary({ children, onClick, style }) {
  return (
    <button className={btn.primary} onClick={onClick} style={style}>
      {children}
    </button>
  )
}

export function ButtonGhost({ children, onClick, style }) {
  return (
    <button className={btn.ghost} onClick={onClick} style={style}>
      {children}
    </button>
  )
}
