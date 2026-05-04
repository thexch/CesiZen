import { motion } from 'framer-motion'
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
      <motion.section
        className="profile-card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="profile-header">
          <span className="profile-avatar">
            {(user?.name ?? user?.email ?? '?').charAt(0).toUpperCase()}
          </span>
          <div>
            <p>Compte utilisateur</p>
            <h1>Mon profil</h1>
          </div>
        </div>

        {user ? (
          <>
            <div className="profile-summary">
              <span>
                <strong>Rôle</strong>
                {user.role}
              </span>
              <span>
                <strong>Email actuel</strong>
                {user.email}
              </span>
            </div>

            <form className="profile-form" onSubmit={handleUpdate}>
              <h2>Modifier mes informations</h2>

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

              <button type="submit">Enregistrer</button>
            </form>

            <form className="profile-form profile-danger-zone" onSubmit={handleDelete}>
              <h2>Supprimer mon compte</h2>

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
                Confirmer la suppression
              </button>
            </form>

            <div className="profile-footer">
              <button type="button" onClick={logout}>
                Se déconnecter
              </button>
              {message && <p>{message}</p>}
            </div>
          </>
        ) : (
          <div className="profile-empty">
            <p>{message}</p>
            <Link to="/connexion">Aller à la connexion</Link>
          </div>
        )}
      </motion.section>
    </main>
  )
}

export default Profil

/*
  Résumé du fichier :
  - Sert à afficher et modifier le profil connecté.
  - Fonctionne avec l'API pour charger, mettre à jour, supprimer le compte ou se déconnecter.
*/
