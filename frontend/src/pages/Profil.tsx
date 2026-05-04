import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { clearSession, deleteProfile, getProfile, updateProfile } from '../api'
import '../css/Profil.css'

type User = {
  email: string
  name: string | null
  role: string
}

function Profil() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    getProfile()
      .then((data) => {
        setUser(data)
        setName(data.name ?? '')
        setEmail(data.email)
        setMessage('')
      })
      .catch(() => setMessage('Vous devez être connecté.'))
  }, [])

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()

    try {
      const updatedUser = await updateProfile(email, name)
      setUser(updatedUser)
      localStorage.setItem('role', updatedUser.role)
      setMessage('Profil modifié.')
    } catch {
      setMessage('Modification impossible.')
    }
  }

  async function handleDelete(event: FormEvent) {
    event.preventDefault()

    try {
      await deleteProfile(password)
      logout()
    } catch {
      setMessage('Mot de passe incorrect.')
    }
  }

  function logout() {
    clearSession()
    navigate('/connexion')
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <h1>Mon profil</h1>

        {user ? (
          <>
            <p>
              <strong>Rôle :</strong> {user.role}
            </p>

            <form className="profile-form" onSubmit={handleUpdate}>
              <label>
                Nom
                <input value={name} onChange={(event) => setName(event.target.value)} />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <button type="submit">Modifier mes informations</button>
            </form>

            <form className="profile-form" onSubmit={handleDelete}>
              <label>
                Mot de passe
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>

              <button type="submit" className="danger-button">
                Supprimer mon compte
              </button>
            </form>

            <button onClick={logout}>Se déconnecter</button>
            {message && <p>{message}</p>}
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
