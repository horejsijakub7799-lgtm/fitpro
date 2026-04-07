import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Trenink from './pages/Trenink'
import Vyziva from './pages/Vyziva'
import Pokrok from './pages/Pokrok'
import Premium from './pages/Premium'

function App() {
  const [activePage, setActivePage] = useState('home')

  const pages = {
    home: <Home />,
    trenink: <Trenink />,
    vyziva: <Vyziva />,
    pokrok: <Pokrok />,
    premium: <Premium />,
  }

  return (
    <div className="app">
      <div className="topnav">
        <div className="logo">FITPRO</div>
        <div className="topnav-right">
          <span className="tag green">🔥 5 dní</span>
          <span className="badge">PRO</span>
        </div>
      </div>

      <div className="pages">
        {pages[activePage]}
      </div>

      <div className="bottomnav">
        {[
          { id: 'home', icon: '🏠', label: 'Přehled' },
          { id: 'trenink', icon: '💪', label: 'Trénink' },
          { id: 'vyziva', icon: '🥗', label: 'Výživa' },
          { id: 'pokrok', icon: '📈', label: 'Pokrok' },
          { id: 'premium', icon: '⭐', label: 'Premium' },
        ].map(item => (
          <button
            key={item.id}
            className={`bnav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            <span>{item.icon}</span>
            <div className="bnav-label">{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default App