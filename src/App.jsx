import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import './App.css'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Trenink from './pages/Trenink'
import Vyziva from './pages/Vyziva'
import Pokrok from './pages/Pokrok'
import Premium from './pages/Premium'

function App() {
  const [uzivatel, setUzivatel] = useState(null)
  const [nacitam, setNacitam] = useState(true)
  const [activePage, setActivePage] = useState('home')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUzivatel(session?.user ?? null)
      setNacitam(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUzivatel(session?.user ?? null)
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: existing } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single()
        if (!existing) {
          await supabase.from('profiles').insert({
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || '',
            email: session.user.email,
          })
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const odhlasit = async () => {
    await supabase.auth.signOut()
    setActivePage('home')
  }

  if (nacitam) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 32, color: 'var(--accent)', letterSpacing: 4 }}>FITPRO</div>
      </div>
    )
  }

  if (!uzivatel) {
    return <Auth />
  }

  const navItems = [
    { id: 'home', icon: '🏠', label: 'Přehled' },
    { id: 'trenink', icon: '💪', label: 'Trénink' },
    { id: 'vyziva', icon: '🥗', label: 'Výživa' },
    { id: 'pokrok', icon: '📈', label: 'Pokrok' },
    { id: 'premium', icon: '⭐', label: 'Premium' },
  ]

  const pages = {
    home: <Home uzivatel={uzivatel} />,
    trenink: <Trenink />,
    vyziva: <Vyziva />,
    pokrok: <Pokrok />,
    premium: <Premium />,
  }

  const jmeno = uzivatel.user_metadata?.full_name || uzivatel.email?.split('@')[0] || 'Uživatel'
  const avatar = uzivatel.user_metadata?.avatar_url || null

  return (
    <div className="web-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">💪 FITPRO</div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            {avatar
              ? <img src={avatar} className="user-avatar" alt="avatar" />
              : <div className="user-avatar-placeholder">{jmeno[0].toUpperCase()}</div>
            }
            <div className="user-info">
              <div className="user-name">{jmeno}</div>
              <div className="user-email">{uzivatel.email}</div>
            </div>
          </div>
          <button className="btn-odhlasit" onClick={odhlasit}>Odhlásit se</button>
        </div>
      </aside>

      {/* HLAVNÍ OBSAH */}
      <main className="main-content">
        {pages[activePage]}
      </main>
    </div>
  )
}

export default App