import { useEffect, useState, type FormEvent } from 'react'
import {
  createInformation,
  deleteAdminUser,
  deleteInformation,
  getAdminUsers,
  getInformations,
  updateAdminUser,
  updateInformation,
} from '../api'
import '../css/Admin.css'

type User = {
  id: number
  email: string
  name: string | null
  role: string
  isActive: boolean
}

type Information = {
  id: number
  title: string
  content: string
}

function Admin() {
  const [activeTab, setActiveTab] = useState<'users' | 'informations'>('users')
  const [users, setUsers] = useState<User[]>([])
  const [informations, setInformations] = useState<Information[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    loadAdminPage()
  }, [])

  async function refreshUsers() {
    setUsers(await getAdminUsers())
  }

  async function refreshInformations() {
    setInformations(await getInformations())
  }

  async function loadAdminPage() {
    try {
      await Promise.all([refreshUsers(), refreshInformations()])
      setMessage('')
    } catch {
      setMessage('Accès réservé aux administrateurs.')
    }
  }

  async function handleCreateInformation(event: FormEvent) {
    event.preventDefault()

    await createInformation(title, content)
    setTitle('')
    setContent('')
    await refreshInformations()
  }

  async function handleUpdateInformation(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    await updateInformation(
      id,
      String(formData.get('title')),
      String(formData.get('content')),
    )
    await refreshInformations()
  }

  async function handleUpdateUser(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    await updateAdminUser(
      id,
      String(formData.get('role')),
      formData.get('isActive') === 'on',
    )
    await refreshUsers()
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="admin-label">Administration</p>
        <h1>Gestion du site</h1>
      </section>

      {message ? (
        <p className="admin-message">{message}</p>
      ) : (
        <>
          <div className="admin-tabs">
            <button
              type="button"
              className={activeTab === 'users' ? 'is-selected' : ''}
              onClick={() => setActiveTab('users')}
            >
              Utilisateurs
            </button>
            <button
              type="button"
              className={activeTab === 'informations' ? 'is-selected' : ''}
              onClick={() => setActiveTab('informations')}
            >
              Informations
            </button>
          </div>

          {activeTab === 'users' && (
            <section className="admin-section">
              <h2>Utilisateurs</h2>

              <div className="admin-table">
                <div className="admin-row admin-row-header">
                  <span>Utilisateur</span>
                  <span>Rôle</span>
                  <span>Statut</span>
                  <span>Actions</span>
                </div>

                {users.map((user) => (
                  <form
                    className="admin-row"
                    key={user.id}
                    onSubmit={(event) => handleUpdateUser(event, user.id)}
                  >
                    <span className="admin-user">
                      <span className="admin-avatar">
                        {(user.name ?? user.email).charAt(0).toUpperCase()}
                      </span>
                      <span>
                        <span className="admin-field-title">Utilisateur</span>
                        <strong>{user.name ?? 'Non renseigné'}</strong>
                        <small>{user.email}</small>
                      </span>
                    </span>

                    <label className="admin-field admin-role-field">
                      <span className="admin-field-title">Rôle</span>
                      <select name="role" defaultValue={user.role}>
                        <option value="USER">Utilisateur</option>
                        <option value="ADMIN">Administrateur</option>
                      </select>
                    </label>

                    <label className="admin-switch">
                      <span className="admin-field-title">Statut</span>
                      <input type="checkbox" name="isActive" defaultChecked={user.isActive} />
                      <span className="admin-switch-track"></span>
                      <span className="admin-switch-text">Compte actif</span>
                    </label>

                    <span className="admin-actions">
                      <button type="submit">Enregistrer</button>
                      <button
                        type="button"
                        className="danger-button"
                        onClick={async () => {
                          await deleteAdminUser(user.id)
                          await refreshUsers()
                        }}
                      >
                        Supprimer
                      </button>
                    </span>
                  </form>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'informations' && (
            <section className="admin-section">
              <h2>Informations</h2>

              <form className="admin-form" onSubmit={handleCreateInformation}>
                <label>
                  Titre
                  <input value={title} onChange={(event) => setTitle(event.target.value)} required />
                </label>

                <label>
                  Contenu
                  <textarea value={content} onChange={(event) => setContent(event.target.value)} required />
                </label>

                <button type="submit">Ajouter</button>
              </form>

              <div className="admin-information-list">
                {informations.length === 0 ? (
                  <p className="admin-empty">Aucune information publiée.</p>
                ) : (
                  informations.map((information) => (
                    <form
                      className="admin-information"
                      key={information.id}
                      onSubmit={(event) => handleUpdateInformation(event, information.id)}
                    >
                      <input name="title" defaultValue={information.title} required />
                      <textarea name="content" defaultValue={information.content} required />
                      <div className="admin-actions">
                        <button type="submit">Modifier</button>
                        <button
                          type="button"
                          className="danger-button"
                          onClick={async () => {
                            await deleteInformation(information.id)
                            await refreshInformations()
                          }}
                        >
                          Supprimer
                        </button>
                      </div>
                    </form>
                  ))
                )}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default Admin
