import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import CGU from './pages/CGU'
import Contact from './pages/Contact'
import CustomCursor from './components/CustomCursor'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Informations from './pages/Informations'
import NotFound from './pages/NotFound'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import Profil from './pages/Profil'
import Respiration from './pages/Respiration'

function App() {
  return (
    <>
      <CustomCursor />

      <div className="app-content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/respiration" element={<Respiration />} />
          <Route path="/informations" element={<Informations />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App
