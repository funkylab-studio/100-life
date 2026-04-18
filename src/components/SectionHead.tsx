import type { ReactNode } from 'react'

interface Props {
  kicker: string
  titlePlain: string
  titleAccent: string
  meta?: ReactNode
}

export default function SectionHead({ kicker, titlePlain, titleAccent, meta }: Props) {
  return (
    <div className="sec-head">
      <div>
        <span className="sec-kicker">{kicker}</span>
        <h2 className="sec-title">
          {titlePlain} <span className="gold">{titleAccent}</span>
        </h2>
      </div>
      {meta && <div className="sec-meta">{meta}</div>}
    </div>
  )
}
