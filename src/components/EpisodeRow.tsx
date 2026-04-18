import type { Episode } from '../types'

interface Props { ep: Episode; index: number }

export default function EpisodeRow({ ep, index }: Props) {
  const shortNo = ep.number.replace('EP', '')
  const saisonNo = String(index + 1).padStart(2, '0')

  return (
    <article className="ep-row">
      <div className="ep-thumb" aria-hidden="true">
        {ep.image && <img src={ep.image} alt="" loading="lazy" />}
        <span className="thumb-meta">SAISON 1 · EP {saisonNo}</span>
        {!ep.image && <span className="thumb-no">{shortNo}</span>}
      </div>
      <div className="ep-info">
        <span className={`ep-stamp ${ep.badgeLive ? '' : 'dark'}`}>{ep.title}</span>
        <div className="ep-brackets">{ep.subtitle}</div>
      </div>
      <div className="ep-meta-line">
        ÉPISODE <b>{shortNo}</b> — {ep.duration}
      </div>
      <a
        className="listen-stamp"
        href={ep.embed}
        target="_blank"
        rel="noopener"
        aria-label={`Écouter ${ep.title}`}
      >
        Écouter · 收聽
      </a>
      <div className="ep-embed">
        <iframe
          src={ep.embed}
          height={ep.height ?? 152}
          style={{ colorScheme: 'light', background: '#fff' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={ep.title}
        />
      </div>
    </article>
  )
}
