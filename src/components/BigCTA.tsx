import { rich } from '../utils/richText'
import type { SiteContent } from '../types'

interface Props {
  cta: SiteContent['bigCta']
  ctaUrl: string
}

export default function BigCTA({ cta, ctaUrl }: Props) {
  return (
    <section className="big-cta" id="contact">
      <div className="big-cta-inner">
        <h2>
          <span className="zh">{cta.zhTitle}</span>
          {rich(cta.enTitle)}
        </h2>
        <div className="big-cta-right">
          <img className="big-cta-portrait" src="/assets/portrait.png" alt="" />
          <p>
            {cta.zhBody}
            <br />
            {cta.enBody}
          </p>
          <a className="big-cta-btn" href={ctaUrl}>
            {cta.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
