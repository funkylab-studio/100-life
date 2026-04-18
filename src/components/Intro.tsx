import { rich } from '../utils/richText'
import type { SiteContent } from '../types'

interface Props {
  intro: SiteContent['intro']
  cover: string
  caption: string
  status: string
  lastUpdate: string
  totalEpisodes: string
}

export default function Intro({ intro, cover, caption, status, lastUpdate, totalEpisodes }: Props) {
  return (
    <section className="intro">
      <div className="intro-copy">
        <p>{rich(intro.zhLead)}</p>
        <p>{rich(intro.zhDetail)}</p>
        <p className="en-support">{rich(intro.enSupport)}</p>
      </div>
      <div className="intro-cover" data-caption={caption}>
        <img src={cover} alt={caption} loading="lazy" />
      </div>
      <aside className="intro-meta">
        <div className="onair-tag">
          <span className="dot" />
          <span>{status}</span>
        </div>
        <div>
          <div className="label">Dernière mise à jour</div>
          <div className="value">{lastUpdate}</div>
        </div>
        <div>
          <div className="label">Episodes · 集數</div>
          <div className="value">
            <span className="accent">{totalEpisodes}</span>+ <i>episodes</i>
          </div>
        </div>
      </aside>
    </section>
  )
}
