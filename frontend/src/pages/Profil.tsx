import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getProfile } from '../api'
import '../css/Profil.css'

type User = {
  email: string
  name: string | null
  role: string
}

function Profil() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data)
        setMessage('')
      })
      .catch(() => setMessage('Vous devez être connecté.'))
  }, [])

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    setMessage('Vous êtes déconnecté.')
    navigate('/connexion')
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <h1>Mon profil</h1>

        {user ? (
          <>
            <p>
              <strong>Nom :</strong> {user.name ?? 'Non renseigné'}
            </p>
            <p>
              <strong>Email :</strong> {user.email}
            </p>
            <p>
              <strong>Rôle :</strong> {user.role}
            </p>
            <button onClick={logout}>Se déconnecter</button>
          </>
        ) : (
          <>
            <p>{message}</p>
            <Link to="/connexion">Aller à la connexion</Link>
          </>
        )}
      </section>
    </main>
  )
}

export default Profil
