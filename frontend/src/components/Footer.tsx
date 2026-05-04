import { Link } from 'react-router-dom'
import '../css/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src="/cesizen-logo.svg" alt="CESIZen" />
        <div>
          <strong>CESIZen</strong>
          <p>Respiration guidée et prévention du stress.</p>
        </div>
      </div>

      <nav className="footer-links" aria-label="Navigation secondaire">
        <Link to="/">Accueil</Link>
        <Link to="/respiration">Respiration</Link>
        <Link to="/informations">Informations</Link>
        <Link to="/cgu">CGU</Link>
        <Link to="/confidentialite">Confidentialité</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  )
}

export default Footer
