import './Footer.css'

function Footer() {

  return (
    <footer>
      <div id="foot-logo">
        <img src="/assets/logo.png" alt="Logo" />
        <h1>Profesional MMA</h1>
      </div>
      <div id="foot-links">
        <div>
          <h2>About</h2>
          <a href="/contact">Email</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <h2>Social</h2>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;