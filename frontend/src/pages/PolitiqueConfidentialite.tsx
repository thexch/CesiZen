import '../css/Legal.css'

function PolitiqueConfidentialite() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <p className="legal-label">Données personnelles</p>
        <h1>Politique de confidentialité</h1>

        <h2>Données collectées</h2>
        <p>
          L'application peut enregistrer l'email, le nom et le mot de passe
          chiffré des utilisateurs afin de permettre la connexion au compte.
        </p>

        <h2>Utilisation des données</h2>
        <p>
          Ces données servent uniquement à gérer l'authentification, le profil
          utilisateur et les droits d'accès à l'espace administrateur.
        </p>

        <h2>Sécurité</h2>
        <p>
          Les mots de passe ne sont pas stockés en clair. Ils sont hachés avant
          l'enregistrement en base de données.
        </p>
      </section>
    </main>
  )
}

export default PolitiqueConfidentialite
