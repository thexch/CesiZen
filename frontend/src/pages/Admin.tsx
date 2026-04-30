import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
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
  createdAt: string
}

type Information = {
  id: number
  title: string
  content: string
}

function Admin() {
  const [users, setUsers] = useState<User[]>([])
  const [informations, setInformations] = useState<Information[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('Chargement...')

  useEffect(() => {
    loadAdminPage()
  }, [])

  async function loadAdminPage() {
    try {
      setUsers(await getAdminUsers())
      setInformations(await getInformations())
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
    setInformations(await getInformations())
  }

  async function handleUpdateInformation(
    event: FormEvent<HTMLFormElement>,
    id: number,
  ) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    await updateInformation(
      id,
      String(formData.get('title')),
      String(formData.get('content')),
    )
    setInformations(await getInformations())
  }

  async function handleDeleteInformation(id: number) {
    await deleteInformation(id)
    setInformations(await getInformations())
  }

  async function handleUpdateUser(event: FormEvent<HTMLFormElement>, id: number) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    await updateAdminUser(
      id,
      String(formData.get('role')),
      formData.get('isActive') === 'on',
    )
    setUsers(await getAdminUsers())
  }

  async function handleDeleteUser(id: number) {
    await deleteAdminUser(id)
    setUsers(await getAdminUsers())
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
          <section className="admin-section">
            <h2>Utilisateurs</h2>

            <div className="admin-table">
              <div className="admin-row admin-row-header">
                <span>Nom</span>
                <span>Email</span>
                <span>Rôle</span>
                <span>Actif</span>
                <span>Actions</span>
              </div>

              {users.map((user) => (
                <form
                  className="admin-row"
                  key={user.id}
                  onSubmit={(event) => handleUpdateUser(event, user.id)}
                >
                  <span>
                    <span className="admin-field-title">Nom</span>
                    {user.name ?? 'Non renseigné'}
                  </span>
                  <span>
                    <span className="admin-field-title">Email</span>
                    {user.email}
                  </span>
                  <label className="admin-field">
                    <span className="admin-field-title">Rôle</span>
                    <select name="role" defaultValue={user.role}>
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </label>
                  <label className="admin-field admin-checkbox">
                    <span className="admin-field-title">Actif</span>
                    <input
                      type="checkbox"
                      name="isActive"
                      defaultChecked={user.isActive}
                    />
                  </label>
                  <span className="admin-actions">
                    <button type="submit">Enregistrer</button>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Supprimer
                    </button>
                  </span>
                </form>
              ))}
            </div>
          </section>

          <section className="admin-section">
            <h2>Informations</h2>

            <form className="admin-form" onSubmit={handleCreateInformation}>
              <label>
                Titre
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </label>

              <label>
                Contenu
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  required
                />
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
                    onSubmit={(event) =>
                      handleUpdateInformation(event, information.id)
                    }
                  >
                    <input
                      name="title"
                      defaultValue={information.title}
                      required
                    />
                    <textarea
                      name="content"
                      defaultValue={information.content}
                      required
                    />
                    <div className="admin-actions">
                      <button type="submit">Modifier</button>
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => handleDeleteInformation(information.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </form>
                ))
              )}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default Admin
