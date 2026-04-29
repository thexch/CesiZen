import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Profil from './pages/Profil'
import Respiration from './pages/Respiration'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/respiration" element={<Respiration />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
