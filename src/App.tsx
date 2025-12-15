import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CardScanner from './pages/CardScanner'
import Meetings from './pages/Meetings'
import Emails from './pages/Emails'
import Leads from './pages/Leads'

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
        <Route path="/leads" element={<Leads />} />
      </Routes>
    </div>
  )
}

export default App

