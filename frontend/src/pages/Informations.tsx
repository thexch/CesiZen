import { useEffect, useState } from 'react'
import { getInformations } from '../api'
import '../css/Informations.css'

type Information = {
  id: number
  title: string
  content: string
}

function Informations() {
  const [informations, setInformations] = useState<Information[]>([])
  const [message, setMessage] = useState('Chargement...')
  const [selectedInformation, setSelectedInformation] = useState<Information | null>(null)

  function getPreview(content: string) {
    return content.length <= 150 ? content : `${content.slice(0, 150)}...`
  }

  useEffect(() => {
    getInformations()
      .then((data) => {
        setInformations(data)
        setMessage('')
      })
      .catch(() => setMessage('Impossible de charger les informations.'))
  }, [])

  return (
    <main className="informations-page">
      <section className="informations-header">
        <p className="informations-label">Informations</p>
        <h1>Comprendre et mieux gérer son stress</h1>
      </section>

      {message ? (
        <p className="informations-message">{message}</p>
      ) : (
        <section className="informations-list">
          {informations.length === 0 ? (
            <p className="informations-message">
              Aucune information n'a encore été publiée.
            </p>
          ) : (
            informations.map((information) => (
              <article className="information-card" key={information.id}>
                <h2>{information.title}</h2>
                <p>{getPreview(information.content)}</p>
                <button type="button" onClick={() => setSelectedInformation(information)}>
                  Lire l'article
                </button>
              </article>
            ))
          )}
        </section>
      )}

      {selectedInformation && (
        <div className="information-modal">
          <article className="information-modal-content">
            <button
              type="button"
              className="information-modal-close"
              onClick={() => setSelectedInformation(null)}
            >
              Fermer
            </button>
            <h2>{selectedInformation.title}</h2>
            <p>{selectedInformation.content}</p>
          </article>
        </div>
      )}
    </main>
  )
}

export default Informations
