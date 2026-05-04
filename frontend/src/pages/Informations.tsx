import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
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
      <motion.section
        className="informations-header"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="informations-label">Informations</p>
        <h1>Comprendre et mieux gérer son stress</h1>
      </motion.section>

      {message ? (
        <p className="informations-message">{message}</p>
      ) : (
        <LayoutGroup>
          <motion.section
            className="informations-list"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {informations.length === 0 ? (
              <p className="informations-message">
                Aucune information n'a encore été publiée.
              </p>
            ) : (
              informations.map((information) => (
                <motion.article
                  className="information-card"
                  key={information.id}
                  layoutId={`information-${information.id}`}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                >
                  <motion.h2 layoutId={`information-title-${information.id}`}>
                    {information.title}
                  </motion.h2>
                  <p>{getPreview(information.content)}</p>
                  <motion.button
                    type="button"
                    onClick={() => setSelectedInformation(information)}
                    whileTap={{ scale: 0.96 }}
                  >
                    Lire l'article
                  </motion.button>
                </motion.article>
              ))
            )}
          </motion.section>

          <AnimatePresence>
            {selectedInformation && (
              <motion.div
                className="information-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedInformation(null)}
              >
                <motion.div
                  className="information-modal-aura"
                  initial={{ scale: 0.4, rotate: 0, opacity: 0 }}
                  animate={{ scale: 1, rotate: 180, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />

                <motion.article
                  className="information-modal-content"
                  layoutId={`information-${selectedInformation.id}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <motion.button
                    type="button"
                    className="information-modal-close"
                    onClick={() => setSelectedInformation(null)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    Fermer
                  </motion.button>

                  <motion.h2 layoutId={`information-title-${selectedInformation.id}`}>
                    {selectedInformation.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.16, duration: 0.3 }}
                  >
                    {selectedInformation.content}
                  </motion.p>
                </motion.article>
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      )}
    </main>
  )
}

export default Informations
