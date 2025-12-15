import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CardScanner from './pages/CardScanner'
import Meetings from './pages/Meetings'
import Emails from './pages/Emails'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/card-scanner" element={<CardScanner />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/emails" element={<Emails />} />
      </Routes>
    </div>
  )
}

export default App

