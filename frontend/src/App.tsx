import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Accueil from './pages/Accueil'
import Respiration from './pages/Respiration'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/respiration" element={<Respiration />} />
      </Routes>
    </>
  )
}

export default App
