import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import EasterEgg from './EasterEgg'
import '../css/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <motion.img
          src="/cesizen-logo.svg"
          alt="CESIZen"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div>
          <strong>CESIZen</strong>
          <p>Respiration guidée et prévention du stress.</p>
        </div>
      </div>

      <div className="footer-right">
        <nav className="footer-links" aria-label="Navigation secondaire">
          <Link to="/">Accueil</Link>
          <Link to="/respiration">Respiration</Link>
          <Link to="/informations">Informations</Link>
          <Link to="/cgu">CGU</Link>
          <Link to="/confidentialite">Confidentialité</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <EasterEgg />
      </div>
    </footer>
  )
}

export default Footer

/*
  Résumé du fichier :
  - Sert à afficher le bas de page avec les liens secondaires.
  - Fonctionne avec React Router pour naviguer et avec EasterEgg pour les boutons secrets.
*/
