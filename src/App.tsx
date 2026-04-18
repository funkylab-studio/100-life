import { useEffect, useState } from 'react'
import type { SiteContent } from './types'
import Marquee from './components/Marquee'
import NavPills from './components/NavPills'
import Intro from './components/Intro'
import SectionHead from './components/SectionHead'
import EpisodeRow from './components/EpisodeRow'
import TrilogyCard from './components/TrilogyCard'
import PlatformPill from './components/PlatformPill'
import BigCTA from './components/BigCTA'
import Footer from './components/Footer'
import Editor, { loadOverride } from './components/Editor'

export default function App() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)

  /* Fetch content.json at runtime (with optional local override) */
  useEffect(() => {
    const override = loadOverride()
    if (override) {
      setContent(override)
      return
    }
    fetch('/content.json', { cache: 'no-store' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<SiteContent>
      })
      .then(setContent)
      .catch((e) => setError(String(e)))
  }, [])

  /* Edit mode toggled by ?edit, #edit or Ctrl/Cmd + E */
  useEffect(() => {
    const check = () => {
      const s = window.location.search + window.location.hash
      if (/[?#&]edit(?:$|&|=)/i.test(s)) setEditing(true)
    }
    check()
    window.addEventListener('hashchange', check)
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault()
        setEditing((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('hashchange', check)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  if (error) {
    return (
      <div className="loader-state">
        <h1>Content failed to load</h1>
        <p>{error}</p>
        <p><code>/content.json</code> must be served at the site root.</p>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="loader-state" role="status" aria-live="polite">
        <div className="loader-bg" aria-hidden="true">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="loader-bg-row">
              {'人森百態 · 100 LIFE · '.repeat(10)}
            </div>
          ))}
        </div>
        <div className="loader-core">
          <div className="loader-brand">
            <span className="loader-zh">
              {['人', '森', '百', '態'].map((c, i) => (
                <span key={i} className="loader-char" style={{ animationDelay: `${i * 120}ms` }}>{c}</span>
              ))}
            </span>
            <span className="loader-lat">100 <em>Life.</em></span>
          </div>
          <div className="loader-bar"><span /></div>
          <div className="loader-meta">
            <span className="loader-dot" />
            <span>LOADING · 載入中</span>
          </div>
        </div>
        <span className="sr-only">Loading content…</span>
      </div>
    )
  }

  return (
    <>
      <Marquee text={content.marquee} />
      <NavPills />
      <button
        className="edit-fab"
        onClick={() => setEditing(true)}
        aria-label="Open content editor"
        title="Edit content (⌘/Ctrl + E)"
      >
        ✎
      </button>

      <main>
        <Intro
          intro={content.intro}
          cover={content.coverImage}
          caption={content.coverCaption}
          status={content.status}
          lastUpdate={content.lastUpdate}
          totalEpisodes={content.stats.totalEpisodes}
        />

        <section className="sec" id="latest">
          <SectionHead
            kicker="Ⅰ · Now Playing"
            titlePlain="Latest"
            titleAccent="drops."
            meta={<>Two featured · <b>{content.stats.totalEpisodes}</b> total</>}
          />
          <div>
            {content.episodes.map((ep, i) => (
              <EpisodeRow key={ep.number} ep={ep} index={i} />
            ))}
          </div>
        </section>

        <section className="sec" id="series">
          <SectionHead
            kicker="Ⅱ · Coming Next"
            titlePlain="2025 —"
            titleAccent="a trilogy."
            meta={<>In Production · 製作中</>}
          />
          <div className="tri">
            {content.upcoming.map((s) => (
              <TrilogyCard key={s.roman} s={s} />
            ))}
          </div>
        </section>

        <section className="sec" id="platforms" style={{ borderBottom: 'none' }}>
          <SectionHead
            kicker="Ⅲ · Listen Elsewhere"
            titlePlain="Every"
            titleAccent="platform."
            meta={<>{content.platforms.length} channels · 全平台</>}
          />
          <div className="plat-grid">
            {content.platforms.map((p, i) => (
              <PlatformPill key={p.name} p={p} index={i} />
            ))}
          </div>
        </section>
      </main>

      <BigCTA cta={content.bigCta} ctaUrl={content.ctaUrl} />
      <Footer />

      {editing && (
        <Editor
          initial={content}
          onApply={(next) => setContent(next)}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  )
}
