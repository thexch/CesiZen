import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ZenFlow from '../components/ZenFlow'
import '../css/Accueil.css'

function Accueil() {
  return (
    <main className="home-page">
      <ZenFlow />

      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            className="hero-logo"
            src="/cesizen-logo.svg"
            alt="CESIZen"
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <p className="hero-label">Bien-être et respiration</p>
          <h1>Retrouver son calme, une respiration à la fois.</h1>
          <p className="hero-text">
            Une application de bien-être pour aider les utilisateurs à mieux
            comprendre leur stress et pratiquer un exercice de respiration guidée.
          </p>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link className="primary-link" to="/respiration">
              Découvrir les exercices
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="breathing-card"
          id="breathing-preview"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            opacity: { duration: 0.7, delay: 0.15 },
            scale: { duration: 0.7, delay: 0.15 },
          }}
        >
          <motion.div
            className="breathing-circle"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Respirer</span>
          </motion.div>
          <p>Inspirez doucement, expirez lentement.</p>
        </motion.div>
      </section>

      <motion.section
        className="intro-section"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {[
          ['Évaluer', 'Identifier son niveau de stress avec un parcours simple.'],
          ['Respirer', 'Suivre un exercice guidé pour ralentir le rythme.'],
          ['Suivre', 'Garder une trace de ses pratiques et de son évolution.'],
        ].map(([title, text]) => (
          <motion.article
            className="intro-card"
            key={title}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6 }}
          >
            <h2>{title}</h2>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.section>

    </main>
  )
}

export default Accueil

/*
  Résumé du fichier :
  - Sert à afficher la page d'accueil de CESIZen.
  - Fonctionne avec une présentation, un lien vers la respiration et des animations Framer Motion.
*/
