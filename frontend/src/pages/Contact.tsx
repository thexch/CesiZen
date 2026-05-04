import '../css/Legal.css'

function Contact() {
  return (
    <main className="legal-page">
      <section className="legal-card">
        <p className="legal-label">Contact</p>
        <h1>Nous contacter</h1>

        <p>
          Pour tout questionnement ou demande d'information, n'hésitez pas à nous contacter. Notre équipe est à votre disposition pour vous aider et répondre à vos besoins.
        </p>

        <div className="contact-box">
          <p>
            <strong>Email :</strong> contact@cesizen.test
          </p>
          <p>
            <strong>Téléphone :</strong> 01 23 45 67 89
          </p>
          <p>
            <strong>Adresse :</strong> 10 rue du Bien-être, 75000 Paris
          </p>
        </div>
      </section>
    </main>
  )
}

export default Contact

/*
  Résumé du fichier :
  - Sert à afficher une page de contact factice.
  - Fonctionne comme une page statique avec les informations de contact du projet.
*/
