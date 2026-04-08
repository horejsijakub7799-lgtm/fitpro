import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Treneri({ uzivatel, isPremium }) {
  const [treneri, setTreneri] = useState([])
  const [vybranY, setVybrany] = useState(null)
  const [showPremium, setShowPremium] = useState(false)

  useEffect(() => {
    const nacist = async () => {
      const { data } = await supabase
        .from('treneri')
        .select('*')
        .eq('schvaleno', true)
      if (data) setTreneri(data)
    }
    nacist()
  }, [])

  const handleKontakt = () => {
    if (!isPremium) {
      setShowPremium(true)
      return
    }
    // TODO: otevřít chat
  }

  return (
    <div className="page">
      <div className="page-title">TRENÉŘI</div>
      <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>
        Najdi svého osobního trenéra a posuň své výsledky na další úroveň.
      </div>

      {/* Premium modal */}
      {showPremium && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 20, padding: 36, maxWidth: 400, width: '90%', textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 28, color: 'var(--accent)', marginBottom: 8 }}>
              PREMIUM FUNKCE
            </div>
            <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24, lineHeight: 1.6 }}>
              Kontaktování trenérů a chat jsou dostupné pouze pro Premium uživatele.
              Odemkni plný přístup za <strong style={{ color: 'var(--text)' }}>249 Kč/měsíc</strong>.
            </div>
            <button
              onClick={() => setShowPremium(false)}
              style={{
                width: '100%', padding: '14px', background: 'var(--accent)',
                color: '#000', border: 'none', borderRadius: 10,
                fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 10
              }}
            >
              Přejít na Premium
            </button>
            <button
              onClick={() => setShowPremium(false)}
              style={{
                width: '100%', padding: '10px', background: 'none',
                color: 'var(--muted)', border: '1px solid var(--border)',
                borderRadius: 10, fontSize: 14, cursor: 'pointer'
              }}
            >
              Zavřít
            </button>
          </div>
        </div>
      )}

      {/* Detail trenéra */}
      {vybranY && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }}>
          <div style={{
            background: 'var(--bg2)', border: '1px solid var(--border)',
            borderRadius: 20, padding: 32, maxWidth: 500, width: '90%',
            maxHeight: '80vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: 'var(--accent)', color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 700
                }}>
                  {vybranY.jmeno[0]}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{vybranY.jmeno}</div>
                  <div style={{ fontSize: 12, color: 'var(--accent)' }}>📍 {vybranY.lokace}</div>
                </div>
              </div>
              <button onClick={() => setVybrany(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>O mně</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text)' }}>{vybranY.popis}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>Specializace</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {vybranY.specializace?.split(',').map((s, i) => (
                  <span key={i} style={{ background: 'rgba(232,255,71,0.1)', border: '1px solid rgba(232,255,71,0.3)', color: 'var(--accent)', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>Certifikáty</div>
              <div style={{ fontSize: 14, color: 'var(--text)' }}>🏅 {vybranY.certifikaty}</div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 6 }}>Úspěchy</div>
              <div style={{ fontSize: 14, color: 'var(--text)' }}>🏆 {vybranY.uspěchy}</div>
            </div>

            <button
              onClick={handleKontakt}
              style={{
                width: '100%', padding: '14px',
                background: isPremium ? 'var(--accent)' : 'var(--bg3)',
                color: isPremium ? '#000' : 'var(--muted)',
                border: isPremium ? 'none' : '1px solid var(--border)',
                borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer'
              }}
            >
              {isPremium ? '💬 Zahájit chat' : '🔒 Chat (pouze Premium)'}
            </button>
          </div>
        </div>
      )}

      {/* Seznam trenérů */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {treneri.map((t) => (
          <div
            key={t.id}
            className="card"
            style={{ cursor: 'pointer', transition: 'border-color 0.2s' }}
            onClick={() => setVybrany(t)}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'var(--accent)', color: '#000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, flexShrink: 0
              }}>
                {t.jmeno[0]}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{t.jmeno}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>📍 {t.lokace}</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 12 }}>
              {t.popis?.slice(0, 100)}...
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
              {t.specializace?.split(',').slice(0, 2).map((s, i) => (
                <span key={i} style={{ background: 'rgba(232,255,71,0.08)', color: 'var(--accent)', padding: '3px 8px', borderRadius: 20, fontSize: 11 }}>
                  {s.trim()}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={e => { e.stopPropagation(); setVybrany(t) }}
                style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}
              >
                Zobrazit profil
              </button>
              <button
                onClick={e => { e.stopPropagation(); if (!isPremium) { setShowPremium(true) } }}
                style={{
                  background: isPremium ? 'var(--accent)' : 'var(--bg3)',
                  color: isPremium ? '#000' : 'var(--muted)',
                  border: isPremium ? 'none' : '1px solid var(--border)',
                  padding: '7px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer'
                }}
              >
                {isPremium ? '💬 Chat' : '🔒 Chat'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {treneri.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
          Žádní trenéři nejsou zatím k dispozici.
        </div>
      )}
    </div>
  )
}