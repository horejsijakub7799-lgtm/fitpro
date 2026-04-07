import { useState } from 'react'

const vahaData = [86.2, 85.9, 85.7, 85.5, 85.2, 84.8, 84.6]
const dny = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
const treninkData = [3, 2, 3, 4, 3, 2, 3]

export default function Pokrok() {
  const [novaVaha, setNovaVaha] = useState('')
  const [zaznamy, setZaznamy] = useState(vahaData)

  const pridatVahu = () => {
    if (!novaVaha) return
    setZaznamy(prev => [...prev.slice(-6), parseFloat(novaVaha)])
    setNovaVaha('')
  }

  const min = Math.min(...zaznamy)
  const max = Math.max(...zaznamy)
  const range = max - min || 1
  const pokles = (zaznamy[0] - zaznamy[zaznamy.length - 1]).toFixed(1)

  return (
    <div className="page">
      <div className="page-title">POKROK</div>
      <div className="page-subtitle" style={{ marginBottom: 14 }}>Tvoje výsledky</div>

      <div className="grid2" style={{ marginBottom: 12 }}>
        <div className="card text-center">
          <div className="stat-big accent">{zaznamy[zaznamy.length - 1]}</div>
          <div className="stat-label">aktuální kg</div>
          <div style={{ fontSize: 12, color: 'var(--accent)', marginTop: 4 }}>
            {pokles > 0 ? `▼ −${pokles} kg` : `▲ +${Math.abs(pokles)} kg`}
          </div>
        </div>
        <div className="card text-center">
          <div className="stat-big">18</div>
          <div className="stat-label">tréninků</div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>ze 21 plánovaných</div>
        </div>
      </div>

      {/* PŘIDAT VÁHU */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">ZAPSAT DNEŠNÍ VÁHU</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            className="inp"
            type="number"
            step="0.1"
            placeholder="např. 84.2"
            value={novaVaha}
            onChange={e => setNovaVaha(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && pridatVahu()}
          />
          <button
            className="btn btn-accent"
            style={{ width: 'auto', padding: '0 16px', whiteSpace: 'nowrap' }}
            onClick={pridatVahu}
          >
            Zapsat
          </button>
        </div>
      </div>

      {/* GRAF VÁHY */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">VÁHA — POSLEDNÍCH {zaznamy.length} DNÍ</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 8 }}>
          {zaznamy.map((v, i) => {
            const h = 16 + ((v - min) / range) * 56
            const isLast = i === zaznamy.length - 1
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: '100%', height: h,
                  background: isLast ? 'var(--accent)' : 'var(--border)',
                  borderRadius: 4
                }} />
              </div>
            )
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)' }}>
          {zaznamy.map((v, i) => <span key={i}>{v}</span>)}
        </div>
      </div>

      {/* GRAF TRÉNINKŮ */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">TRÉNINKY TENTO TÝDEN</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 8 }}>
          {treninkData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: '100%',
                height: (v / 4) * 70,
                background: i === 4 ? 'var(--accent)' : 'var(--border)',
                borderRadius: 4
              }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted)' }}>
          {dny.map(d => <span key={d}>{d}</span>)}
        </div>
      </div>

      {/* STATISTIKY */}
      <div className="card">
        <div className="card-title">CELKOVÝ PŘEHLED</div>
        <div className="ex-row">
          <div className="ex-info">
            <div className="ex-name">Splněné tréninky</div>
            <div className="ex-sets">tento měsíc</div>
          </div>
          <div style={{ fontWeight: 700 }}>18 / 21</div>
        </div>
        <div className="ex-row">
          <div className="ex-info">
            <div className="ex-name">Plnění jídelníčku</div>
            <div className="ex-sets">průměr za měsíc</div>
          </div>
          <div style={{ fontWeight: 700, color: 'var(--accent)' }}>86%</div>
        </div>
        <div className="ex-row">
          <div className="ex-info">
            <div className="ex-name">Streak</div>
            <div className="ex-sets">po sobě jdoucí dny</div>
          </div>
          <div style={{ fontWeight: 700, color: 'var(--accent2)' }}>5 dní</div>
        </div>
      </div>
    </div>
  )
}