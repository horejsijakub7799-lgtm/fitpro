import { useState, useEffect } from 'react'

export const CESKA_DB = [
  { id: 'kure_prsa', nazev: 'Kuřecí prsa', kategorie: 'Maso', kcal: 165, bil: 31, sach: 0, tuk: 3.6 },
  { id: 'kure_stehno', nazev: 'Kuřecí stehno', kategorie: 'Maso', kcal: 209, bil: 26, sach: 0, tuk: 11 },
  { id: 'hovezi', nazev: 'Hovězí maso', kategorie: 'Maso', kcal: 250, bil: 26, sach: 0, tuk: 15 },
  { id: 'vepro_panenka', nazev: 'Vepřová panenka', kategorie: 'Maso', kcal: 143, bil: 22, sach: 0, tuk: 6 },
  { id: 'kruti_prsa', nazev: 'Krůtí prsa', kategorie: 'Maso', kcal: 157, bil: 30, sach: 0, tuk: 3 },
  { id: 'losos', nazev: 'Losos', kategorie: 'Ryby', kcal: 208, bil: 20, sach: 0, tuk: 13 },
  { id: 'tunak', nazev: 'Tuňák ve vlastní šťávě', kategorie: 'Ryby', kcal: 116, bil: 26, sach: 0, tuk: 1 },
  { id: 'treska', nazev: 'Treska', kategorie: 'Ryby', kcal: 82, bil: 18, sach: 0, tuk: 0.7 },
  { id: 'sardinky', nazev: 'Sardinky v oleji', kategorie: 'Ryby', kcal: 208, bil: 25, sach: 0, tuk: 11 },
  { id: 'krevety', nazev: 'Krevety', kategorie: 'Ryby', kcal: 99, bil: 24, sach: 0, tuk: 0.3 },
  { id: 'vajicko', nazev: 'Vejce (1 ks)', kategorie: 'Mléčné & Vejce', kcal: 78, bil: 6, sach: 0.6, tuk: 5 },
  { id: 'tvaroh', nazev: 'Tvaroh polotučný', kategorie: 'Mléčné & Vejce', kcal: 103, bil: 13, sach: 4, tuk: 4 },
  { id: 'recky_jogurt', nazev: 'Řecký jogurt (0%)', kategorie: 'Mléčné & Vejce', kcal: 57, bil: 10, sach: 4, tuk: 0 },
  { id: 'recky_jogurt_tuk', nazev: 'Řecký jogurt (2%)', kategorie: 'Mléčné & Vejce', kcal: 73, bil: 10, sach: 4, tuk: 2 },
  { id: 'cottage', nazev: 'Cottage cheese', kategorie: 'Mléčné & Vejce', kcal: 98, bil: 11, sach: 3.4, tuk: 4.5 },
  { id: 'tvaruzky', nazev: 'Olomoucké tvarůžky', kategorie: 'Mléčné & Vejce', kcal: 109, bil: 27, sach: 0, tuk: 0.5 },
  { id: 'eidam', nazev: 'Eidam 30%', kategorie: 'Mléčné & Vejce', kcal: 257, bil: 30, sach: 0, tuk: 15 },
  { id: 'mozzarella', nazev: 'Mozzarella', kategorie: 'Mléčné & Vejce', kcal: 280, bil: 18, sach: 2, tuk: 22 },
  { id: 'mleko', nazev: 'Mléko polotučné', kategorie: 'Mléčné & Vejce', kcal: 46, bil: 3.4, sach: 4.7, tuk: 1.5 },
  { id: 'bila_jogurt', nazev: 'Bílý jogurt', kategorie: 'Mléčné & Vejce', kcal: 61, bil: 3.5, sach: 4.7, tuk: 3.2 },
  { id: 'rýže_var', nazev: 'Rýže bílá (vařená)', kategorie: 'Sacharidy', kcal: 130, bil: 2.7, sach: 28, tuk: 0.3 },
  { id: 'brambory', nazev: 'Brambory (vařené)', kategorie: 'Sacharidy', kcal: 77, bil: 2, sach: 17, tuk: 0.1 },
  { id: 'sladke_brambory', nazev: 'Sladké brambory', kategorie: 'Sacharidy', kcal: 86, bil: 1.6, sach: 20, tuk: 0.1 },
  { id: 'testoviny', nazev: 'Těstoviny (vařené)', kategorie: 'Sacharidy', kcal: 158, bil: 5.5, sach: 31, tuk: 0.9 },
  { id: 'ovesne_vlocky', nazev: 'Ovesné vločky', kategorie: 'Sacharidy', kcal: 366, bil: 13, sach: 58, tuk: 7 },
  { id: 'chleb', nazev: 'Chléb celozrnný (plátek)', kategorie: 'Sacharidy', kcal: 65, bil: 3, sach: 11, tuk: 1 },
  { id: 'rohlik', nazev: 'Rohlík', kategorie: 'Sacharidy', kcal: 270, bil: 9, sach: 53, tuk: 2 },
  { id: 'kuskus', nazev: 'Kuskus (vařený)', kategorie: 'Sacharidy', kcal: 112, bil: 3.8, sach: 23, tuk: 0.2 },
  { id: 'quinoa', nazev: 'Quinoa (vařená)', kategorie: 'Sacharidy', kcal: 120, bil: 4.4, sach: 21, tuk: 1.9 },
  { id: 'brokolice', nazev: 'Brokolice', kategorie: 'Zelenina', kcal: 34, bil: 2.8, sach: 7, tuk: 0.4 },
  { id: 'spinat', nazev: 'Špenát', kategorie: 'Zelenina', kcal: 23, bil: 2.9, sach: 3.6, tuk: 0.4 },
  { id: 'mrkev', nazev: 'Mrkev', kategorie: 'Zelenina', kcal: 41, bil: 0.9, sach: 10, tuk: 0.2 },
  { id: 'paprika', nazev: 'Paprika červená', kategorie: 'Zelenina', kcal: 31, bil: 1, sach: 6, tuk: 0.3 },
  { id: 'rajce', nazev: 'Rajče', kategorie: 'Zelenina', kcal: 18, bil: 0.9, sach: 3.9, tuk: 0.2 },
  { id: 'okurka', nazev: 'Okurka', kategorie: 'Zelenina', kcal: 15, bil: 0.7, sach: 3.6, tuk: 0.1 },
  { id: 'cuketa', nazev: 'Cuketa', kategorie: 'Zelenina', kcal: 17, bil: 1.2, sach: 3.1, tuk: 0.3 },
  { id: 'salat', nazev: 'Ledový salát', kategorie: 'Zelenina', kcal: 14, bil: 1.4, sach: 2.9, tuk: 0.2 },
  { id: 'jablko', nazev: 'Jablko', kategorie: 'Ovoce', kcal: 52, bil: 0.3, sach: 14, tuk: 0.2 },
  { id: 'banan', nazev: 'Banán', kategorie: 'Ovoce', kcal: 89, bil: 1.1, sach: 23, tuk: 0.3 },
  { id: 'jahody', nazev: 'Jahody', kategorie: 'Ovoce', kcal: 32, bil: 0.7, sach: 8, tuk: 0.3 },
  { id: 'boruvky', nazev: 'Borůvky', kategorie: 'Ovoce', kcal: 57, bil: 0.7, sach: 14, tuk: 0.3 },
  { id: 'pomeranc', nazev: 'Pomeranč', kategorie: 'Ovoce', kcal: 47, bil: 0.9, sach: 12, tuk: 0.1 },
  { id: 'avokado', nazev: 'Avokádo', kategorie: 'Ovoce', kcal: 160, bil: 2, sach: 9, tuk: 15 },
  { id: 'olivovy_olej', nazev: 'Olivový olej', kategorie: 'Tuky', kcal: 884, bil: 0, sach: 0, tuk: 100 },
  { id: 'maslo', nazev: 'Máslo', kategorie: 'Tuky', kcal: 717, bil: 0.9, sach: 0.1, tuk: 81 },
  { id: 'arasidove_maslo', nazev: 'Arašídové máslo', kategorie: 'Tuky', kcal: 588, bil: 25, sach: 20, tuk: 50 },
  { id: 'vlasske_orechy', nazev: 'Vlašské ořechy', kategorie: 'Tuky', kcal: 654, bil: 15, sach: 14, tuk: 65 },
  { id: 'mandle', nazev: 'Mandle', kategorie: 'Tuky', kcal: 579, bil: 21, sach: 22, tuk: 50 },
  { id: 'cocka', nazev: 'Čočka (vařená)', kategorie: 'Luštěniny', kcal: 116, bil: 9, sach: 20, tuk: 0.4 },
  { id: 'fazole', nazev: 'Fazole červené', kategorie: 'Luštěniny', kcal: 127, bil: 8.7, sach: 22, tuk: 0.5 },
  { id: 'cizrna', nazev: 'Cizrna (vařená)', kategorie: 'Luštěniny', kcal: 164, bil: 8.9, sach: 27, tuk: 2.6 },
  { id: 'sunka', nazev: 'Šunka dušená', kategorie: 'Ostatní', kcal: 107, bil: 18, sach: 1, tuk: 3.5 },
  { id: 'protein', nazev: 'Protein prášek (1 dávka)', kategorie: 'Ostatní', kcal: 120, bil: 25, sach: 3, tuk: 1.5 },
  { id: 'hummus', nazev: 'Hummus', kategorie: 'Ostatní', kcal: 177, bil: 8, sach: 20, tuk: 8 },
]

function dnesniKlic() {
  const d = new Date()
  return `fp_jidla_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`
}

export default function Vyziva() {
  const [vaha, setVaha] = useState(80)
  const [vyska, setVyska] = useState(180)
  const [vek, setVek] = useState(25)
  const [pohlavi, setPohlavi] = useState('m')
  const [aktivita, setAktivita] = useState(1.55)
  const [cil, setCil] = useState(-400)
  const [hledani, setHledani] = useState('')
  const [vysledky, setVysledky] = useState([])
  const [nacitam, setNacitam] = useState(false)
  const [pridana, setPridana] = useState(() => {
    try { return JSON.parse(localStorage.getItem(dnesniKlic()) || '[]') } catch { return [] }
  })
  const [aktivniTab, setAktivniTab] = useState('jidlo')
  const [filtrKat, setFiltrKat] = useState('Vše')

  useEffect(() => {
    try { localStorage.setItem(dnesniKlic(), JSON.stringify(pridana)) } catch {}
    try { localStorage.setItem('fp_jidla', JSON.stringify(pridana)) } catch {}
  }, [pridana])

  const bmr = pohlavi === 'm'
    ? (10 * vaha) + (6.25 * vyska) - (5 * vek) + 5
    : (10 * vaha) + (6.25 * vyska) - (5 * vek) - 161
  const kcal = Math.round(bmr * aktivita + Number(cil))
  const bil = Math.round(vaha * 1.8)
  const tuk = Math.round(vaha * 0.9)
  const sach = Math.max(0, Math.round((kcal - bil * 4 - tuk * 9) / 4))

  const celkemKcal = pridana.reduce((s, j) => s + Math.round(j.kcal * j.mnozstvi / 100), 0)
  const celkemBil = pridana.reduce((s, j) => s + Math.round(j.bil * j.mnozstvi / 100), 0)
  const celkemSach = pridana.reduce((s, j) => s + Math.round(j.sach * j.mnozstvi / 100), 0)
  const celkemTuk = pridana.reduce((s, j) => s + Math.round(j.tuk * j.mnozstvi / 100), 0)

  const kategorie = ['Vše', ...new Set(CESKA_DB.map(p => p.kategorie))]

  const filtrovanaDB = CESKA_DB.filter(p => {
    const odpovida = p.nazev.toLowerCase().includes(hledani.toLowerCase())
    const katOk = filtrKat === 'Vše' || p.kategorie === filtrKat
    return odpovida && katOk
  })

  const pridatJidlo = (p) => {
    setPridana(prev => [...prev, { ...p, mnozstvi: 100, uid: Date.now() }])
  }

  const hledatOnline = async () => {
    if (!hledani.trim()) return
    setNacitam(true)
    try {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(hledani)}&search_simple=1&action=process&json=1&page_size=8`)
      const data = await res.json()
      const produkty = (data.products || []).filter(p => p.product_name).map(p => ({
        id: `off_${Date.now()}`,
        nazev: p.product_name,
        kategorie: 'Online',
        kcal: Math.round(p.nutriments?.['energy-kcal_100g'] || 0),
        bil: Math.round(p.nutriments?.proteins_100g || 0),
        sach: Math.round(p.nutriments?.carbohydrates_100g || 0),
        tuk: Math.round(p.nutriments?.fat_100g || 0),
      }))
      setVysledky(produkty.slice(0, 6))
    } catch { setVysledky([]) }
    setNacitam(false)
  }

  const JidloRadek = ({ p, onPridat }) => (
    <div className="ex-row" style={{ cursor: 'pointer' }} onClick={() => onPridat(p)}>
      <div className="ex-info">
        <div className="ex-name">{p.nazev}</div>
        <div className="ex-sets">{p.kcal} kcal · {p.bil}g B · {p.sach}g S · {p.tuk}g T / 100g</div>
      </div>
      <div style={{ color: 'var(--accent)', fontSize: 20, fontWeight: 700 }}>+</div>
    </div>
  )

  return (
    <div className="page">
      <div className="page-title" style={{ marginBottom: 4 }}>VÝŽIVA</div>
      <div className="page-subtitle" style={{ marginBottom: 14 }}>Sledování jídla a kalkulačka</div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['jidlo', 'Jídlo'], ['kalkul', 'Kalkulačka']].map(([id, label]) => (
          <button key={id} className={`btn ${aktivniTab === id ? 'btn-accent' : 'btn-ghost'} btn-sm`}
            onClick={() => setAktivniTab(id)}>{label}</button>
        ))}
      </div>

      {aktivniTab === 'jidlo' && (
        <>
          {/* DNEŠNÍ SOUHRN */}
          <div style={{
            background: 'linear-gradient(135deg,#1a1a00,#111)',
            border: '1px solid rgba(232,255,71,0.2)',
            borderRadius: 16, padding: 16, marginBottom: 12
          }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Dnes celkem</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 12 }}>
              {[
                { label: 'kcal', val: celkemKcal, cil: kcal, barva: 'var(--accent)' },
                { label: 'bílk.', val: `${celkemBil}g`, cil: bil, barva: 'var(--accent)' },
                { label: 'sach.', val: `${celkemSach}g`, cil: sach, barva: 'var(--accent2)' },
                { label: 'tuky', val: `${celkemTuk}g`, cil: tuk, barva: '#888' },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 4px' }}>
                  <div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 22, color: m.barva }}>{m.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{m.label}</div>
                  <div style={{ fontSize: 9, color: 'var(--muted)', marginTop: 2 }}>z {m.cil}{i > 0 ? 'g' : ''}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, Math.round((celkemKcal / kcal) * 100))}%`, background: celkemKcal > kcal ? 'var(--accent2)' : 'var(--accent)', borderRadius: 4 }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>
              {celkemKcal} / {kcal} kcal · zbývá {Math.max(0, kcal - celkemKcal)} kcal
            </div>
          </div>

          {/* PŘIDANÁ JÍDLA */}
          {pridana.length > 0 && (
            <div className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div className="card-title" style={{ margin: 0 }}>CO JSI JEDL/A DNES</div>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, color: 'var(--accent2)', borderColor: 'var(--accent2)' }}
                  onClick={() => setPridana([])}>Smazat vše</button>
              </div>
              {pridana.map((j, i) => (
                <div key={j.uid || i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0',
                  borderBottom: i < pridana.length - 1 ? '1px solid var(--border)' : 'none'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{j.nazev}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {Math.round(j.kcal * j.mnozstvi / 100)} kcal · {Math.round(j.bil * j.mnozstvi / 100)}g B · {Math.round(j.sach * j.mnozstvi / 100)}g S · {Math.round(j.tuk * j.mnozstvi / 100)}g T
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <input className="inp" type="number" value={j.mnozstvi}
                      style={{ width: 54, padding: '5px 8px', fontSize: 12, textAlign: 'center' }}
                      onChange={e => {
                        const up = [...pridana]
                        up[i] = { ...up[i], mnozstvi: +e.target.value }
                        setPridana(up)
                      }} />
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>g</span>
                    <div style={{ color: 'var(--accent2)', cursor: 'pointer', fontSize: 18, marginLeft: 4 }}
                      onClick={() => setPridana(p => p.filter((_, idx) => idx !== i))}>×</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HLEDÁNÍ */}
          <div className="card">
            <div className="card-title">PŘIDAT JÍDLO</div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <input className="inp" placeholder="Hledat potravinu..." value={hledani}
                onChange={e => { setHledani(e.target.value); setVysledky([]) }}
                onKeyDown={e => e.key === 'Enter' && hledatOnline()} />
              <button className="btn btn-accent" style={{ width: 'auto', padding: '0 14px', whiteSpace: 'nowrap', fontSize: 13 }}
                onClick={hledatOnline} title="Hledat online">
                {nacitam ? '...' : '🌐'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 10 }}>
              {kategorie.map(k => (
                <button key={k} onClick={() => setFiltrKat(k)}
                  style={{ whiteSpace: 'nowrap', fontSize: 11, padding: '4px 12px', borderRadius: 20, border: '1px solid', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', background: filtrKat === k ? 'var(--accent)' : 'transparent', color: filtrKat === k ? '#000' : 'var(--muted)', borderColor: filtrKat === k ? 'var(--accent)' : 'var(--border)' }}>
                  {k}
                </button>
              ))}
            </div>

            {vysledky.length > 0 && (
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: 'var(--accent)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Online výsledky</div>
                {vysledky.map((p, i) => <JidloRadek key={i} p={p} onPridat={pridatJidlo} />)}
                <div className="sep" />
              </div>
            )}

            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Česká databáze {hledani && `· "${hledani}"`}
            </div>
            <div style={{ maxHeight: 280, overflowY: 'auto' }}>
              {filtrovanaDB.length === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: 20 }}>Nenalezeno — zkus hledat online 🌐</div>
              ) : (
                filtrovanaDB.map((p, i) => <JidloRadek key={i} p={p} onPridat={pridatJidlo} />)
              )}
            </div>
          </div>
        </>
      )}

      {aktivniTab === 'kalkul' && (
        <div className="card">
          <div className="card-title">KALORICKÁ KALKULAČKA</div>
          <div className="grid2" style={{ gap: 10, marginBottom: 10 }}>
            <div><div className="inp-label">Váha (kg)</div><input className="inp" type="number" value={vaha} onChange={e => setVaha(+e.target.value)} /></div>
            <div><div className="inp-label">Výška (cm)</div><input className="inp" type="number" value={vyska} onChange={e => setVyska(+e.target.value)} /></div>
            <div><div className="inp-label">Věk</div><input className="inp" type="number" value={vek} onChange={e => setVek(+e.target.value)} /></div>
            <div><div className="inp-label">Pohlaví</div>
              <select className="inp" value={pohlavi} onChange={e => setPohlavi(e.target.value)}>
                <option value="m">Muž</option><option value="z">Žena</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}><div className="inp-label">Aktivita</div>
            <select className="inp" value={aktivita} onChange={e => setAktivita(+e.target.value)}>
              <option value={1.2}>Sedavé zaměstnání</option>
              <option value={1.375}>Lehká aktivita (1–3× týdně)</option>
              <option value={1.55}>Střední aktivita (3–5× týdně)</option>
              <option value={1.725}>Vysoká aktivita (6–7× týdně)</option>
            </select>
          </div>
          <div style={{ marginBottom: 12 }}><div className="inp-label">Cíl</div>
            <select className="inp" value={cil} onChange={e => setCil(+e.target.value)}>
              <option value={-400}>Hubnutí (−400 kcal)</option>
              <option value={0}>Udržení váhy</option>
              <option value={300}>Nabírání (+300 kcal)</option>
            </select>
          </div>
          <div className="result-box">
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>TVŮJ DENNÍ CÍL</div>
            <div className="grid4">
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 26, color: 'var(--accent)' }}>{kcal}</div><div className="stat-label">kcal</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 26 }}>{bil}g</div><div className="stat-label">bílkoviny</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 26, color: 'var(--accent2)' }}>{sach}g</div><div className="stat-label">sacharidy</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontFamily: 'Bebas Neue,sans-serif', fontSize: 26, color: '#888' }}>{tuk}g</div><div className="stat-label">tuky</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}