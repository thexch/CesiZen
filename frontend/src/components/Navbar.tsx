import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { clearSession, getProfile } from '../api'
import '../css/Navbar.css'

function Navbar() {
  const location = useLocation()
  const [isConnected, setIsConnected] = useState(Boolean(localStorage.getItem('token')))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'ADMIN')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    setIsMenuOpen(false)
    setIsConnected(Boolean(token))
    setIsAdmin(localStorage.getItem('role') === 'ADMIN')

    if (!token) {
      return
    }

    getProfile()
      .then((user) => {
        localStorage.setItem('role', user.role)
        setIsAdmin(user.role === 'ADMIN')
      })
      .catch(() => {
        clearSession()
        setIsConnected(false)
        setIsAdmin(false)
      })
  }, [location])

  return (
    <header className="navbar">
      <div className="navbar-top">
        <NavLink className="navbar-logo" to="/">
          <img src="/cesizen-logo.svg" alt="CESIZen" />
        </NavLink>
        <p className="slogan">L'application de votre santé mentale</p>

        <button
          type="button"
          className="navbar-menu-button"
          aria-label="Ouvrir le menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <nav
        className={`navbar-links ${isMenuOpen ? 'is-open' : ''}`}
        aria-label="Navigation principale"
      >
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/respiration">Respiration</NavLink>
        <NavLink to="/informations">Informations</NavLink>
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        <NavLink to={isConnected ? '/profil' : '/connexion'}>
          {isConnected ? 'Mon profil' : 'Se connecter'}
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar

/*
  Résumé du fichier :
  - Sert à afficher la barre de navigation du site.
  - Fonctionne en lisant la session locale pour adapter les liens visibles selon le rôle.
*/
