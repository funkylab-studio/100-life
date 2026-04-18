import type { Series } from '../types'

export default function TrilogyCard({ s }: { s: Series }) {
  return (
    <div className="tri-card" data-roman={s.roman}>
      <div className="tri-tag">{s.roman} · {s.tag}</div>
      <div>
        <div className="tri-title">{s.title}</div>
        <div className="tri-desc">{s.desc}</div>
      </div>
    </div>
  )
}
