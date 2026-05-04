import { AnimatePresence, motion } from 'framer-motion'
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

const tabAnimation = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.22 },
}

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
  const [isSendingInformation, setIsSendingInformation] = useState(false)
  const [deletingInformationId, setDeletingInformationId] = useState<number | null>(null)

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
    setIsSendingInformation(true)

    await createInformation(title, content)
    setTitle('')
    setContent('')
    await refreshInformations()

    setTimeout(() => setIsSendingInformation(false), 1200)
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

  function handleDeleteInformation(id: number) {
    setDeletingInformationId(id)

    setTimeout(async () => {
      await deleteInformation(id)
      await refreshInformations()
      setDeletingInformationId(null)
    }, 550)
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
              {activeTab === 'users' && (
                <motion.span className="admin-tab-background" layoutId="admin-tab-background" />
              )}
              <span>Utilisateurs</span>
            </button>

            <button
              type="button"
              className={activeTab === 'informations' ? 'is-selected' : ''}
              onClick={() => setActiveTab('informations')}
            >
              {activeTab === 'informations' && (
                <motion.span className="admin-tab-background" layoutId="admin-tab-background" />
              )}
              <span>Informations</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'users' && (
              <motion.section className="admin-section" key="users" {...tabAnimation}>
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
              </motion.section>
            )}

            {activeTab === 'informations' && (
              <motion.section className="admin-section" key="informations" {...tabAnimation}>
                <h2>Informations</h2>

                <div className="admin-form-wrapper">
                  <motion.form
                    className="admin-form"
                    onSubmit={handleCreateInformation}
                    animate={
                      isSendingInformation
                        ? { opacity: 0.18, scale: 0.94, filter: 'blur(4px)' }
                        : { opacity: 1, scale: 1, filter: 'blur(0px)' }
                    }
                    transition={{ duration: 0.35 }}
                  >
                    <label>
                      Titre
                      <input value={title} onChange={(event) => setTitle(event.target.value)} required />
                    </label>

                    <label>
                      Contenu
                      <textarea value={content} onChange={(event) => setContent(event.target.value)} required />
                    </label>

                    <button type="submit" disabled={isSendingInformation}>
                      Ajouter
                    </button>
                  </motion.form>

                  <AnimatePresence>
                    {isSendingInformation && (
                      <motion.div
                        className="admin-form-envelope"
                        initial={{ opacity: 0, x: 0, y: 0, scale: 1, rotate: 0 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          x: [0, 60, 220],
                          y: [0, -40, -150],
                          scale: [1, 0.72, 0.28],
                          rotate: [0, -4, 13],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.15, ease: 'easeInOut' }}
                      >
                        <span className="admin-form-envelope-title">Information envoyée</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="admin-information-list">
                  {informations.length === 0 ? (
                    <p className="admin-empty">Aucune information publiée.</p>
                  ) : (
                    <AnimatePresence>
                      {informations.map((information) => (
                      <motion.form
                        className={`admin-information ${deletingInformationId === information.id ? 'is-deleting' : ''}`}
                        key={information.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={
                          deletingInformationId === information.id
                            ? { opacity: 0, x: 120, scale: 0.92, rotate: 2 }
                            : { opacity: 1, x: 0, scale: 1, rotate: 0 }
                        }
                        exit={{ opacity: 0, height: 0, margin: 0 }}
                        transition={{ duration: 0.35 }}
                        onSubmit={(event) => handleUpdateInformation(event, information.id)}
                      >
                        <input name="title" defaultValue={information.title} required />
                        <textarea name="content" defaultValue={information.content} required />
                        <div className="admin-actions">
                          <button type="submit">Modifier</button>
                          <button
                            type="button"
                            className="danger-button"
                            disabled={deletingInformationId === information.id}
                            onClick={() => handleDeleteInformation(information.id)}
                          >
                            {deletingInformationId === information.id ? 'Suppression...' : 'Supprimer'}
                          </button>
                        </div>
                      </motion.form>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </>
      )}
    </main>
  )
}

export default Admin
