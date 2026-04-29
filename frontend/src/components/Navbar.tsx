import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getProfile } from '../api'
import '../css/Navbar.css'

function Navbar() {
  const location = useLocation()
  const [isConnected, setIsConnected] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    setIsConnected(Boolean(token))
    setIsAdmin(false)

    if (token) {
      getProfile()
        .then((user) => setIsAdmin(user.role === 'ADMIN'))
        .catch(() => setIsConnected(false))
    }
  }, [location])

  return (
    <header className="navbar">
      <NavLink className="navbar-logo" to="/">
        CESIZen
      </NavLink>

      <nav className="navbar-links" aria-label="Navigation principale">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/respiration">Respiration</NavLink>
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        <NavLink to={isConnected ? '/profil' : '/connexion'}>
          {isConnected ? 'Mon profil' : 'Se connecter'}
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
