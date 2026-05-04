import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register, saveSession } from '../api'
import '../css/Connexion.css'

function Connexion() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const data = isRegister
        ? await register(email, password, name)
        : await login(email, password)

      saveSession(data.token, data.user)
      setMessage(isRegister ? 'Compte créé et connecté.' : 'Connexion réussie.')
      navigate('/profil')
    } catch {
      setMessage(isRegister ? 'Création impossible.' : 'Identifiants invalides.')
    }
  }

  return (
    <main className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>{isRegister ? 'Inscription' : 'Connexion'}</h1>

        <div className="login-tabs">
          <button
            type="button"
            className={!isRegister ? 'is-selected' : ''}
            onClick={() => setIsRegister(false)}
          >
            Connexion
          </button>
          <button
            type="button"
            className={isRegister ? 'is-selected' : ''}
            onClick={() => setIsRegister(true)}
          >
            Inscription
          </button>
        </div>

        {isRegister && (
          <label>
            Nom
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button type="submit">
          {isRegister ? "S'inscrire" : 'Se connecter'}
        </button>

        {message && <p className="login-message">{message}</p>}
      </form>
    </main>
  )
}

export default Connexion
