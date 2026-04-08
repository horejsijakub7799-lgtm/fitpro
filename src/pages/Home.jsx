import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const POTRAVINY_CZ = [
  { nazev: 'Kuřecí prsa', kcal: 165, bil: 31, sach: 0, tuk: 3.6 },
  { nazev: 'Vejce', kcal: 155, bil: 13, sach: 1.1, tuk: 11 },
  { nazev: 'Tvaroh 0%', kcal: 69, bil: 12, sach: 3.5, tuk: 0.2 },
  { nazev: 'Ovesné vločky', kcal: 370, bil: 13, sach: 62, tuk: 7 },
  { nazev: 'Rýže bílá', kcal: 130, bil: 2.7, sach: 28, tuk: 0.3 },
  { nazev: 'Brambory', kcal: 77, bil: 2, sach: 17, tuk: 0.1 },
  { nazev: 'Losos', kcal: 208, bil: 20, sach: 0, tuk: 13 },
  { nazev: 'Tuňák v nálevu', kcal: 116, bil: 26, sach: 0, tuk: 1 },
  { nazev: 'Hovězí mleté', kcal: 250, bil: 26, sach: 0, tuk: 16 },
  { nazev: 'Chléb celozrnný', kcal: 247, bil: 9, sach: 41, tuk: 3.4 },
  { nazev: 'Mléko 1.5%', kcal: 46, bil: 3.4, sach: 4.8, tuk: 1.5 },
  { nazev: 'Jogurt bílý', kcal: 61, bil: 3.5, sach: 4.7, tuk: 3.2 },
  { nazev: 'Banán', kcal: 89, bil: 1.1, sach: 23, tuk: 0.3 },
  { nazev: 'Jablko', kcal: 52, bil: 0.3, sach: 14, tuk: 0.2 },
  { nazev: 'Mandle', kcal: 579, bil: 21, sach: 22, tuk: 50 },
  { nazev: 'Arašídové máslo', kcal: 588, bil: 25, sach: 20, tuk: 50 },
  { nazev: 'Pasta těstoviny', kcal: 131, bil: 5, sach: 25, tuk: 1.1 },
  { nazev: 'Cottage cheese', kcal: 98, bil: 11, sach: 3.4, tuk: 4.3 },
  { nazev: 'Krůtí prsa', kcal: 135, bil: 30, sach: 0, tuk: 1 },
  { nazev: 'Šunka vařená', kcal: 107, bil: 17, sach: 1.5, tuk: 3.8 },
]

function dnesniKlic() {
  const d = new Date()
  return `fp_jidla_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`
}

export default function Home({ uzivatel }) {
  const [pridana, setPridana] = useState([])
  const [hledani, setHledani] = useState('')
  const [vysledky, setVysledky] = useState([])
  const [vybranaP, setVybranaP] = useState(null)
  const [mnozstvi, setMnozstvi] = useState(100)
  const [nacitaAPI, setNacitaAPI] = useState(false)

  const [kcalCil, setKcalCil] = useState(2000)
const [bilCil, setBilCil] = useState(150)
const [sachCil, setSachCil] = useState(200)
const [tukCil, setTukCil] = useState(65)

  useEffect(() => {
    try {
      const ulozena = JSON.parse(localStorage.getItem(dnesniKlic()) || '[]')
      setPridana(ulozena)
    } catch {}
const nacistProfil = async () => {
  if (!uzivatel) return
  const { data } = await supabase
    .from('profiles')
    .select('kcal_cil, bil_cil, sach_cil, tuk_cil')
    .eq('id', uzivatel.id)
    .single()
  if (data) {
    if (data.kcal_cil) setKcalCil(data.kcal_cil)
    if (data.bil_cil) setBilCil(data.bil_cil)
    if (data.sach_cil) setSachCil(data.sach_cil)
    if (data.tuk_cil) setTukCil(data.tuk_cil)
  }
}
nacistProfil()  
}, [])

  const celkemKcal = pridana.reduce((s, j) => s + Math.round(j.kcal * j.mnozstvi / 100), 0)
  const celkemBil = pridana.reduce((s, j) => s + Math.round(j.bil * j.mnozstvi / 100), 0)
  const celkemSach = pridana.reduce((s, j) => s + Math.round(j.sach * j.mnozstvi / 100), 0)
  const celkemTuk = pridana.reduce((s, j) => s + Math.round(j.tuk * j.mnozstvi / 100), 0)

  const hledatPotraviny = async (q) => {
    setHledani(q)
    if (q.length < 2) { setVysledky([]); return }
    const local = POTRAVINY_CZ.filter(p => p.nazev.toLowerCase().includes(q.toLowerCase()))
    setVysledky(local)
    if (local.length < 3) {
      setNacitaAPI(true)
      try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=5&lc=cs`)
        const data = await res.json()
        const api = (data.products || [])
          .filter(p => p.product_name && p.nutriments)
          .map(p => ({
            nazev: p.product_name,
            kcal: Math.round(p.nutriments['energy-kcal_100g'] || 0),
            bil: Math.round(p.nutriments['proteins_100g'] || 0),
            sach: Math.round(p.nutriments['carbohydrates_100g'] || 0),
            tuk: Math.round(p.nutriments['fat_100g'] || 0),
          }))
        setVysledky([...local, ...api])
      } catch {}
      setNacitaAPI(false)
    }
  }

  const pridatJidlo = () => {
    if (!vybranaP) return
    const nove = [...pridana, { ...vybranaP, mnozstvi: Number(mnozstvi) }]
    setPridana(nove)
    localStorage.setItem(dnesniKlic(), JSON.stringify(nove))
    setVybranaP(null)
    setHledani('')
    setVysledky([])
    setMnozstvi(100)
  }

  const odebratJidlo = (i) => {
    const nove = pridana.filter((_, idx) => idx !== i)
    setPridana(nove)
    localStorage.setItem(dnesniKlic(), JSON.stringify(nove))
  }

  const dny = [
    { d: 'Po', n: '31', stav: 'done' },
    { d: 'Út', n: '1', stav: 'rest' },
    { d: 'St', n: '2', stav: 'done' },
    { d: 'Čt', n: '3', stav: 'done' },
    { d: 'Pá', n: '4', stav: 'dnes' },
    { d: 'So', n: '5', stav: 'rest' },
    { d: 'Ne', n: '6', stav: 'rest' },
  ]

  const makra = [
    { nazev: 'Bílkoviny', hodnota: celkemBil, cil: bilCil, barva: '#e8ff47' },
    { nazev: 'Sacharidy', hodnota: celkemSach, cil: sachCil, barva: '#ff6b35' },
    { nazev: 'Tuky', hodnota: celkemTuk, cil: tukCil, barva: '#888' },
  ]

  return (
    <div className="page">

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)' }}>
          {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ background: 'rgba(232,255,71,0.1)', border: '1px solid rgba(232,255,71,0.3)', color: 'var(--accent)', fontSize: 12, padding: '5px 12px', borderRadius: 20 }}>🔥 5 dní streak</span>
          <span style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', color: '#ff6b35', fontSize: 12, padding: '5px 12px', borderRadius: 20 }}>−2.4 kg tento měsíc</span>
        </div>
      </div>

      {/* KALORIE KARTA — kompaktní */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a00 0%, #111 100%)',
        border: '1px solid rgba(232,255,71,0.2)',
        borderRadius: 14, padding: '14px 18px', marginBottom: 12
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>Kalorie dnes</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 34, color: 'var(--accent)', lineHeight: 1 }}>{celkemKcal}</span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>/ {kcalCil} kcal</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>Zbývá</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: celkemKcal > kcalCil ? '#ff6b35' : 'var(--text)' }}>
              {Math.max(0, kcalCil - celkemKcal)} <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Sans' }}>kcal</span>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 6, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, Math.round((celkemKcal / kcalCil) * 100))}%`,
            background: celkemKcal > kcalCil ? '#ff6b35' : 'var(--accent)',
            borderRadius: 4, transition: 'width 0.5s'
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {makra.map((m, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 2, textTransform: 'uppercase' }}>{m.nazev}</div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: m.barva }}>
                {m.hodnota}<span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'DM Sans' }}> / {m.cil}g</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 3, height: 3, overflow: 'hidden', marginTop: 4 }}>
                <div style={{ height: '100%', width: `${Math.min(100, Math.round((m.hodnota / m.cil) * 100))}%`, background: m.barva, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KALORICKÁ TABULKA */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-title">PŘIDAT JÍDLO</div>

        {/* Hledání */}
        <div style={{ position: 'relative', marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Hledat potravinu (kuřecí prsa, rýže...)"
            value={hledani}
            onChange={e => hledatPotraviny(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', background: 'var(--bg3)',
              border: '1px solid var(--border)', borderRadius: 10,
              color: 'var(--text)', fontSize: 14, boxSizing: 'border-box'
            }}
          />
          {nacitaAPI && <div style={{ position: 'absolute', right: 12, top: 11, fontSize: 12, color: 'var(--muted)' }}>🔍</div>}
        </div>

        {/* Výsledky hledání */}
        {vysledky.length > 0 && !vybranaP && (
          <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}>
            {vysledky.slice(0, 6).map((p, i) => (
              <div key={i}
                onClick={() => { setVybranaP(p); setVysledky([]) }}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 14px', cursor: 'pointer',
                  borderBottom: i < vysledky.slice(0, 6).length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.nazev}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>B: {p.bil}g · S: {p.sach}g · T: {p.tuk}g</div>
                </div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)' }}>{p.kcal} <span style={{ fontSize: 10, fontFamily: 'DM Sans', color: 'var(--muted)' }}>kcal</span></div>
              </div>
            ))}
          </div>
        )}

        {/* Vybraná potravina */}
        {vybranaP && (
          <div style={{ background: 'rgba(232,255,71,0.05)', border: '1px solid rgba(232,255,71,0.2)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{vybranaP.nazev}</div>
              <button onClick={() => setVybranaP(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <input
                type="number"
                value={mnozstvi}
                onChange={e => setMnozstvi(e.target.value)}
                style={{
                  width: 90, padding: '8px 12px', background: 'var(--bg3)',
                  border: '1px solid var(--border)', borderRadius: 8,
                  color: 'var(--text)', fontSize: 14
                }}
              />
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>g →</span>
              <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>
                {Math.round(vybranaP.kcal * mnozstvi / 100)} kcal
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                B:{Math.round(vybranaP.bil * mnozstvi / 100)}g S:{Math.round(vybranaP.sach * mnozstvi / 100)}g T:{Math.round(vybranaP.tuk * mnozstvi / 100)}g
              </span>
              <button onClick={pridatJidlo} style={{
                marginLeft: 'auto', padding: '8px 18px', background: 'var(--accent)',
                color: '#000', border: 'none', borderRadius: 8, fontWeight: 700,
                fontSize: 13, cursor: 'pointer'
              }}>Přidat</button>
            </div>
          </div>
        )}

        {/* Seznam přidaných jídel */}
        {pridana.length > 0 && (
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Dnešní jídla</div>
            {pridana.map((j, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: i < pridana.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{j.nazev}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {j.mnozstvi}g · B:{Math.round(j.bil * j.mnozstvi / 100)}g · S:{Math.round(j.sach * j.mnozstvi / 100)}g · T:{Math.round(j.tuk * j.mnozstvi / 100)}g
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)' }}>
                    {Math.round(j.kcal * j.mnozstvi / 100)} <span style={{ fontSize: 10, fontFamily: 'DM Sans', color: 'var(--muted)' }}>kcal</span>
                  </span>
                  <button onClick={() => odebratJidlo(i)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 14 }}>✕</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {pridana.length === 0 && !vybranaP && hledani.length === 0 && (
          <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>
            Zatím žádné jídlo dnes — začni hledáním výše 👆
          </div>
        )}
      </div>

      {/* TÝDENNÍ PŘEHLED */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div className="card-title" style={{ margin: 0 }}>TENTO TÝDEN</div>
          <span style={{ fontSize: 12, color: 'var(--accent)' }}>3 / 4 tréninky</span>
        </div>
        <div className="days">
          {dny.map((day, i) => (
            <div key={i} className={`day ${day.stav === 'dnes' ? 'active' : ''} ${day.stav === 'done' ? 'done' : ''}`}>
              <span className="dn">{day.d}</span>
              <span className="dd">{day.n}{day.stav === 'done' ? '✓' : ''}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--muted)', marginTop: 8 }}>
          <span><span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(232,255,71,0.3)', display: 'inline-block', marginRight: 4 }} />Splněno</span>
          <span><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--accent)', display: 'inline-block', marginRight: 4 }} />Dnes</span>
          <span><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--border)', display: 'inline-block', marginRight: 4 }} />Volno</span>
        </div>
      </div>

    </div>
  )
}