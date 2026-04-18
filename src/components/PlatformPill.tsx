import type { Platform } from '../types'

export default function PlatformPill({ p, index }: { p: Platform; index: number }) {
  const idx = String(index + 1).padStart(2, '0')
  return (
    <a
      className="plat"
      href={p.url}
      target="_blank"
      rel="noopener"
      aria-label={`Listen on ${p.name}`}
    >
      <span className="idx">{idx}</span>
      {p.name} <em>{p.latin}</em>
    </a>
  )
}
