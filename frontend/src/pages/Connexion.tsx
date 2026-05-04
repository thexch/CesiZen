import { AnimatePresence, motion } from 'framer-motion'
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
      <motion.form
        className="login-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="login-header">
          <span className="login-icon">{isRegister ? '+' : '✓'}</span>
          <div>
            <p>{isRegister ? 'Créer un accès' : 'Bienvenue'}</p>
            <h1>{isRegister ? 'Inscription' : 'Connexion'}</h1>
          </div>
        </div>

        <div className="login-tabs">
          <button
            type="button"
            className={!isRegister ? 'is-selected' : ''}
            onClick={() => setIsRegister(false)}
          >
            {!isRegister && <motion.span className="login-tab-background" layoutId="login-tab" />}
            <span>Connexion</span>
          </button>

          <button
            type="button"
            className={isRegister ? 'is-selected' : ''}
            onClick={() => setIsRegister(true)}
          >
            {isRegister && <motion.span className="login-tab-background" layoutId="login-tab" />}
            <span>Inscription</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isRegister && (
            <motion.label
              key="name"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              Nom
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </motion.label>
          )}
        </AnimatePresence>

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
      </motion.form>
    </main>
  )
}

export default Connexion
