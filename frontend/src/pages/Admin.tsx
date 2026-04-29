import { useEffect, useState } from 'react'
import { getAdminUsers } from '../api'
import '../css/Admin.css'

type User = {
  id: number
  email: string
  name: string | null
  role: string
  createdAt: string
}

function Admin() {
  const [users, setUsers] = useState<User[]>([])
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    getAdminUsers()
      .then((data) => {
        setUsers(data)
        setMessage('')
      })
      .catch(() => setMessage('Accès réservé aux administrateurs.'))
  }, [])

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="admin-label">Administration</p>
        <h1>Gestion des utilisateurs</h1>
      </section>

      {message ? (
        <p className="admin-message">{message}</p>
      ) : (
        <section className="admin-table">
          <div className="admin-row admin-row-header">
            <span>Nom</span>
            <span>Email</span>
            <span>Rôle</span>
            <span>Création</span>
          </div>

          {users.map((user) => (
            <div className="admin-row" key={user.id}>
              <span>{user.name ?? 'Non renseigné'}</span>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <span>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

export default Admin
