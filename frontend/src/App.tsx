import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Informations from './pages/Informations'
import NotFound from './pages/NotFound'
import Profil from './pages/Profil'
import Respiration from './pages/Respiration'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/respiration" element={<Respiration />} />
        <Route path="/informations" element={<Informations />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
