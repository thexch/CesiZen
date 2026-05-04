import { Link } from 'react-router-dom'
import '../css/Accueil.css'

function Accueil() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <img className="hero-logo" src="/cesizen-logo.svg" alt="CESIZen" />
          <p className="hero-label">Bien-être et respiration</p>
          <h1>Retrouver son calme, une respiration à la fois.</h1>
          <p className="hero-text">
            Une application de bien-être pour aider les utilisateurs à mieux
            comprendre leur stress et pratiquer un exercice de respiration guidée.
          </p>
          <Link className="primary-link" to="/respiration">
            Découvrir les exercices
          </Link>
        </div>

        <div className="breathing-card" id="breathing-preview">
          <div className="breathing-circle">
            <span>Respirer</span>
          </div>
          <p>Inspirez doucement, expirez lentement.</p>
        </div>
      </section>

      <section className="intro-section">
        <article className="intro-card">
          <h2>Évaluer</h2>
          <p>Identifier son niveau de stress avec un parcours simple.</p>
        </article>

        <article className="intro-card">
          <h2>Respirer</h2>
          <p>Suivre un exercice guidé pour ralentir le rythme.</p>
        </article>

        <article className="intro-card">
          <h2>Suivre</h2>
          <p>Garder une trace de ses pratiques et de son évolution.</p>
        </article>
      </section>
    </main>
  )
}

export default Accueil
