export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="foot-inner">
        <div className="foot-brand">
          <b>人森</b>百態
          <br />
          100 <b>Life.</b>
        </div>
        <div className="foot-col">
          <h4>Sections</h4>
          <a href="#latest">Latest episodes</a>
          <a href="#series">2025 Trilogy</a>
          <a href="#platforms">Platforms</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="foot-col">
          <h4>Social</h4>
          <a href="https://www.instagram.com/amidonenfrance/" target="_blank">Instagram</a>
          <a href="https://www.threads.com/@shi8jarvis" target="_blank">Threads</a>
          <a href="https://open.spotify.com/show/3jKdp27RZwoO493dUvWJv0" target="_blank">Spotify</a>
        </div>
        {/* <div className="foot-col">
          <h4>Contact</h4>
          <p>Taipei — Paris</p>
        </div> */}
      </div>
      <div className="foot-bottom">
        <span>
          © 2024–{year} · <b style={{ color: 'var(--gold-light)' }}>人森百態</b> · Amidon
        </span>
        <span>Made with tape, light and patience</span>
      </div>
    </footer>
  )
}
