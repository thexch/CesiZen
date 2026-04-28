import { NavLink } from 'react-router-dom'
import '../css/Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="navbar-logo" to="/">
        CESIZen
      </NavLink>

      <nav className="navbar-links" aria-label="Navigation principale">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/respiration">Respiration</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
