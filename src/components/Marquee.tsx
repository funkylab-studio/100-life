interface Props { text: string }

export default function Marquee({ text }: Props) {
  const item = `${text}`
  const repeated = Array.from({ length: 12 }).map(() => item).join('')
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  )
}
