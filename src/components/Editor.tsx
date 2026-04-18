import { useEffect, useMemo, useState } from 'react'
import type { SiteContent } from '../types'

interface Props {
  initial: SiteContent
  onApply: (next: SiteContent) => void
  onClose: () => void
}

const LS_KEY = '100life:content-override'

export function loadOverride(): SiteContent | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as SiteContent) : null
  } catch {
    return null
  }
}

export function clearOverride() {
  localStorage.removeItem(LS_KEY)
}

export default function Editor({ initial, onApply, onClose }: Props) {
  const [text, setText] = useState<string>(() => JSON.stringify(initial, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const parsed = useMemo<SiteContent | null>(() => {
    try {
      const v = JSON.parse(text)
      return v
    } catch {
      return null
    }
  }, [text])

  useEffect(() => {
    setError(parsed ? null : 'Invalid JSON — fix syntax to enable actions.')
  }, [parsed])

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const applyPreview = () => {
    if (!parsed) return
    localStorage.setItem(LS_KEY, JSON.stringify(parsed))
    onApply(parsed)
    flash('Preview applied · stored locally')
  }

  const revert = () => {
    clearOverride()
    flash('Local override cleared · reload to see server version')
  }

  const download = () => {
    if (!parsed) return
    const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'content.json'
    a.click()
    URL.revokeObjectURL(url)
    flash('content.json downloaded — upload it to replace /content.json on your server')
  }

  const copy = async () => {
    if (!parsed) return
    await navigator.clipboard.writeText(JSON.stringify(parsed, null, 2))
    flash('JSON copied to clipboard')
  }

  const reset = async () => {
    const r = await fetch('/content.json', { cache: 'no-store' })
    const j = await r.json()
    setText(JSON.stringify(j, null, 2))
    flash('Reloaded from server /content.json')
  }

  return (
    <div className="editor-overlay" role="dialog" aria-modal="true" aria-label="Content editor">
      <div className="editor-panel">
        <header className="editor-head">
          <div>
            <h2>Content Editor</h2>
            <p>Edits apply live via localStorage. Download the JSON and upload to <code>/content.json</code> to publish.</p>
          </div>
          <button className="editor-close" onClick={onClose} aria-label="Close editor">×</button>
        </header>

        <div className="editor-actions">
          <button onClick={applyPreview} disabled={!parsed} className="btn btn-primary">Apply preview</button>
          <button onClick={download} disabled={!parsed} className="btn">Download JSON</button>
          <button onClick={copy} disabled={!parsed} className="btn">Copy</button>
          <button onClick={reset} className="btn btn-ghost">Reload from server</button>
          <button onClick={revert} className="btn btn-ghost">Clear local override</button>
          {error && <span className="editor-err">{error}</span>}
          {toast && <span className="editor-toast">{toast}</span>}
        </div>

        <textarea
          className="editor-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />

        <footer className="editor-foot">
          <small>
            Tip · access this editor anytime with <kbd>?edit</kbd> or <kbd>#edit</kbd> in the URL.
          </small>
        </footer>
      </div>
    </div>
  )
}
