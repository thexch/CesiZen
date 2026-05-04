import { Link } from 'react-router-dom'
import '../css/NotFound.css'

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <p>Erreur 404</p>
        <h1>Page introuvable</h1>
        <Link to="/">Retour à l'accueil</Link>
      </section>
    </main>
  )
}

export default NotFound

/*
  Résumé du fichier :
  - Sert à afficher une page quand l'URL n'existe pas.
  - Fonctionne avec la route "*" déclarée dans App.tsx.
*/
