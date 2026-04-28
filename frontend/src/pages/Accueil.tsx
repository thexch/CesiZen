import '../css/Accueil.css'

function Accueil() {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">CESIZen</p>
          <h1>Retrouver son calme, une respiration a la fois.</h1>
          <p className="hero-text">
            Une application de bien-etre pour aider les utilisateurs a mieux
            comprendre leur stress et pratiquer un exercice de respiration guide.
          </p>
          <a className="primary-link" href="#breathing-preview">
            Decouvrir l'exercice
          </a>
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
          <h2>Evaluer</h2>
          <p>Identifier son niveau de stress avec un parcours simple.</p>
        </article>

        <article className="intro-card">
          <h2>Respirer</h2>
          <p>Suivre un exercice guide pour ralentir le rythme.</p>
        </article>

        <article className="intro-card">
          <h2>Suivre</h2>
          <p>Garder une trace de ses pratiques et de son evolution.</p>
        </article>
      </section>
    </main>
  )
}

export default Accueil
