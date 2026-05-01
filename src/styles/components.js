/**
 * components.js
 * 재사용 가능한 컴포넌트의 Tailwind 클래스 묶음.
 * 버튼, 태그, 카드 등 공통 UI에서 import해서 사용합니다.
 */

export const btn = {
  primary: [
    'inline-flex items-center gap-1.5',
    'px-[18px] py-2 rounded-md',
    'text-[13px] font-semibold tracking-wide',
    'transition-all duration-150',
    'hover:-translate-y-px hover:opacity-90 active:scale-95',
  ].join(' '),

  ghost: [
    'inline-flex items-center gap-1.5',
    'px-4 py-[7px] rounded-md',
    'text-[13px] border border-[var(--border)]',
    'text-[var(--text-secondary)] bg-transparent',
    'transition-all duration-150',
    'hover:border-[var(--accent-dim)] hover:text-[var(--accent)]',
    'hover:bg-[rgba(200,169,110,0.06)]',
  ].join(' '),
}

export const tag = {
  base: [
    'inline-block px-[10px] py-[3px] rounded',
    'text-[11px] font-medium tracking-widest uppercase',
    'border cursor-pointer transition-all duration-150',
  ].join(' '),
}

export const card = {
  article: [
    'flex flex-col gap-3',
    'bg-[var(--bg-card)] border border-[var(--border-light)]',
    'rounded-[10px] p-6 cursor-pointer',
    'transition-all duration-200',
    'hover:border-[var(--border)] hover:bg-[var(--bg-hover)] hover:-translate-y-0.5',
  ].join(' '),

  row: [
    'grid gap-3 items-center',
    'bg-[var(--bg-card)] border border-[var(--border-light)]',
    'rounded-[10px] px-6 py-5 cursor-pointer',
    'transition-all duration-150',
    'hover:border-[var(--border)] hover:bg-[var(--bg-hover)]',
  ].join(' '),
}

export const toc = {
  item: [
    'block text-[12.5px] py-[5px] pl-3',
    'border-l border-[var(--border-light)]',
    'text-[var(--text-muted)] cursor-pointer',
    'transition-all duration-150 leading-snug',
    'hover:text-[var(--text-secondary)] hover:border-[var(--border)]',
  ].join(' '),

  itemActive: [
    'text-[var(--accent)] border-l border-[var(--accent)]',
  ].join(' '),

  itemH3: 'pl-[22px] text-[11.5px]',
}
