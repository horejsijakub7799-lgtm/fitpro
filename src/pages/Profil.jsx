import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Profil({ uzivatel }) {
  const [nacitam, setNacitam] = useState(true)
  const [ulozeno, setUlozeno] = useState(false)
  const [profil, setProfil] = useState({
    full_name: '',
    birth_date: '',
    vaha_aktualni: '',
    vaha_cil: '',
    vyska: '',
    kcal_cil: 2000,
    bil_cil: 150,
    sach_cil: 200,
    tuk_cil: 65,
    cil: 'hubnout',
  })

  useEffect(() => {
    const nacistProfil = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', uzivatel.id)
        .single()
      if (data) {
        setProfil(prev => ({ ...prev, ...data }))
      }
      setNacitam(false)
    }
    nacistProfil()
  }, [uzivatel.id])

  const ulozitProfil = async () => {
    const { error } = await supabase
      .from('profiles')
      .upsert({ id: uzivatel.id, ...profil })
    if (!error) {
      setUlozeno(true)
      setTimeout(() => setUlozeno(false), 2500)
    }
  }

  const zmenit = (pole, hodnota) => {
    setProfil(prev => ({ ...prev, [pole]: hodnota }))
  }

  const avatar = uzivatel.user_metadata?.avatar_url || null
  const jmeno = profil.full_name || uzivatel.email?.split('@')[0]

  if (nacitam) return <div className="page"><div style={{ color: 'var(--muted)' }}>Načítám profil...</div></div>

  return (
    <div className="page">
      <div className="page-title">PROFIL</div>

      {/* Avatar + jméno */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        {avatar
          ? <img src={avatar} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} alt="avatar" />
          : <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>
              {jmeno?.[0]?.toUpperCase()}
            </div>
        }
        <div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{jmeno}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>{uzivatel.email}</div>
        </div>
      </div>

      {/* Osobní údaje */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">OSOBNÍ ÚDAJE</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Celé jméno</div>
            <input
              type="text"
              value={profil.full_name || ''}
              onChange={e => zmenit('full_name', e.target.value)}
              placeholder="Jakub Novák"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Datum narození</div>
            <input
              type="date"
              value={profil.birth_date || ''}
              onChange={e => zmenit('birth_date', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Výška (cm)</div>
            <input
              type="number"
              value={profil.vyska || ''}
              onChange={e => zmenit('vyska', e.target.value)}
              placeholder="180"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Cíl</div>
            <select
              value={profil.cil || 'hubnout'}
              onChange={e => zmenit('cil', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            >
              <option value="hubnout">Hubnout</option>
              <option value="nabrat">Nabrat svalovou hmotu</option>
              <option value="udrzet">Udržet váhu</option>
              <option value="vykon">Zlepšit výkon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Váha */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">VÁHA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Aktuální váha (kg)</div>
            <input
              type="number"
              step="0.1"
              value={profil.vaha_aktualni || ''}
              onChange={e => zmenit('vaha_aktualni', e.target.value)}
              placeholder="85.0"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Cílová váha (kg)</div>
            <input
              type="number"
              step="0.1"
              value={profil.vaha_cil || ''}
              onChange={e => zmenit('vaha_cil', e.target.value)}
              placeholder="78.0"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {profil.vaha_aktualni && profil.vaha_cil && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(232,255,71,0.05)', border: '1px solid rgba(232,255,71,0.15)', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Zbývá zhubnout: <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                {Math.max(0, (profil.vaha_aktualni - profil.vaha_cil)).toFixed(1)} kg
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Kalorický cíl */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">KALORICKÝ CÍL A MAKRA</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Denní kalorický cíl (kcal)</div>
            <input
              type="number"
              value={profil.kcal_cil || ''}
              onChange={e => zmenit('kcal_cil', e.target.value)}
              placeholder="2000"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Bílkoviny cíl (g)</div>
            <input
              type="number"
              value={profil.bil_cil || ''}
              onChange={e => zmenit('bil_cil', e.target.value)}
              placeholder="150"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Sacharidy cíl (g)</div>
            <input
              type="number"
              value={profil.sach_cil || ''}
              onChange={e => zmenit('sach_cil', e.target.value)}
              placeholder="200"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Tuky cíl (g)</div>
            <input
              type="number"
              value={profil.tuk_cil || ''}
              onChange={e => zmenit('tuk_cil', e.target.value)}
              placeholder="65"
              style={{ width: '100%', padding: '10px 12px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', fontSize: 14, boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* Uložit */}
      <button
        onClick={ulozitProfil}
        style={{
          width: '100%', padding: '14px', background: ulozeno ? '#4caf50' : 'var(--accent)',
          color: '#000', border: 'none', borderRadius: 10, fontWeight: 700,
          fontSize: 15, cursor: 'pointer', transition: 'background 0.3s'
        }}
      >
        {ulozeno ? '✓ Uloženo!' : 'Uložit profil'}
      </button>
    </div>
  )
}