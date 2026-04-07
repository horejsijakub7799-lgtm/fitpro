import { useState, useEffect } from 'react'

const TIPY = [
  { ikona: '💡', titulek: 'Bílkoviny jako první', text: 'Při každém jídle začni bílkovinami — tvaroh, maso, vejce. Zasytí tě rychleji a omezíš přejídání.' },
  { ikona: '💧', titulek: 'Pij vodu před jídlem', text: 'Sklenice vody 20 minut před jídlem snižuje příjem kalorií průměrně o 13%.' },
  { ikona: '😴', titulek: 'Spánek = výsledky', text: 'Při nedostatku spánku tělo spaluje o 20% méně tuku. 7–8 hodin je stejně důležitých jako trénink.' },
  { ikona: '🥦', titulek: 'Zelenina na každém jídle', text: 'Přidej zeleninu ke každému jídlu. Zasytí, přidá vitamíny a má minimum kalorií.' },
  { ikona: '⏰', titulek: 'Pravidelnost nad perfektností', text: 'Lepší je cvičit 3× týdně pravidelně než 6× jeden týden a pak 2 týdny nic.' },
  { ikona: '🏋️', titulek: 'Progresivní přetížení', text: 'Každý týden zkus přidat 1–2 kg nebo 1–2 opakování. Tak rosteš.' },
  { ikona: '🍽️', titulek: 'Meal prep ušetří čas', text: 'Uvaření jídla na 3–4 dny dopředu tě ušetří od impulzivního jídla.' },
  { ikona: '📱', titulek: 'Trackovej všechno', text: 'Lidé kteří trackují jídlo zhubnou 2× více než ti kteří netrackují.' },
  { ikona: '🥩', titulek: 'Červené maso s mírou', text: 'Hovězí a vepřové jsou skvělé zdroje bílkovin a železa. 2–3× týdně je ideální.' },
  { ikona: '🧂', titulek: 'Pozor na sodík', text: 'Příliš soli zadržuje vodu v těle. Omez zpracované potraviny.' },
  { ikona: '🫀', titulek: 'Silový trénink před kardiem', text: 'Pokud děláš kardio i silový trénink, silový dej jako první. Budeš mít více energie.' },
  { ikona: '🍌', titulek: 'Banán před tréninkem', text: 'Banán 30–45 minut před tréninkem ti dá rychlou energii bez tíhy v břiše.' },
  { ikona: '🔄', titulek: 'Střídej cviky', text: 'Každé 4–6 týdnů mírně změň trénink. Tělo si jinak zvykne a přestane reagovat.' },
  { ikona: '🧘', titulek: 'Stres zvyšuje kortizol', text: 'Vysoký stres zvyšuje kortizol který ukládá tuk v břiše. Zařaď 10 minut relaxace denně.' },
]

function dnesniKlic() {
  const d = new Date()
  return `fp_jidla_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`
}

export default function Home() {
  const [pridana, setPridana] = useState([])
  const dnesniTip = TIPY[new Date().getDay() % TIPY.length]

  useEffect(() => {
    try {
      const ulozena = JSON.parse(localStorage.getItem(dnesniKlic()) || '[]')
      setPridana(ulozena)
    } catch {}
  }, [])

  // Kalorický cíl — načteme z localStorage pokud existuje
  const kcalCil = 2100
  const bilCil = 180
  const sachCil = 250
  const tukCil = 72

  const celkemKcal = pridana.reduce((s, j) => s + Math.round(j.kcal * j.mnozstvi / 100), 0)
  const celkemBil = pridana.reduce((s, j) => s + Math.round(j.bil * j.mnozstvi / 100), 0)
  const celkemSach = pridana.reduce((s, j) => s + Math.round(j.sach * j.mnozstvi / 100), 0)
  const celkemTuk = pridana.reduce((s, j) => s + Math.round(j.tuk * j.mnozstvi / 100), 0)

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
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>
              {new Date().toLocaleDateString('cs-CZ', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 34, letterSpacing: 1, lineHeight: 1 }}>DOBRÝ DEN 👋</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Týden 3 z 12 · Full Body program</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <span style={{ background: 'rgba(232,255,71,0.1)', border: '1px solid rgba(232,255,71,0.3)', color: 'var(--accent)', fontSize: 11, padding: '4px 10px', borderRadius: 20 }}>🔥 5 dní streak</span>
            <span style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.3)', color: 'var(--accent2)', fontSize: 11, padding: '4px 10px', borderRadius: 20 }}>−2.4 kg tento měsíc</span>
          </div>
        </div>
      </div>

      {/* KALORIE KARTA */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a00 0%, #111 100%)',
        border: '1px solid rgba(232,255,71,0.2)',
        borderRadius: 16, padding: 20, marginBottom: 12
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Kalorie dnes</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 48, color: 'var(--accent)', lineHeight: 1 }}>{celkemKcal}</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>/ {kcalCil} kcal</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Zbývá</div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 28, color: celkemKcal > kcalCil ? 'var(--accent2)' : 'var(--text)' }}>
              {Math.max(0, kcalCil - celkemKcal)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>kcal</div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 6, height: 8, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{
            height: '100%',
            width: `${Math.min(100, Math.round((celkemKcal / kcalCil) * 100))}%`,
            background: celkemKcal > kcalCil ? 'var(--accent2)' : 'var(--accent)',
            borderRadius: 6, transition: 'width 0.5s'
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {makra.map((m, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.nazev}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginBottom: 4 }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 22, color: m.barva }}>{m.hodnota}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>g</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>z {m.cil}g</div>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 3, height: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, Math.round((m.hodnota / m.cil) * 100))}%`, background: m.barva, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        {pridana.length === 0 && (
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 14, textAlign: 'center' }}>
            Přidej první jídlo v sekci <span style={{ color: 'var(--accent)' }}>Výživa →</span>
          </div>
        )}
      </div>

      {/* CO JSI JEDL DNES */}
      {pridana.length > 0 && (
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div className="card-title" style={{ margin: 0 }}>CO JSI JEDL/A DNES</div>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>{pridana.length} položek</span>
          </div>
          {pridana.slice(0, 5).map((j, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0',
              borderBottom: i < Math.min(pridana.length, 5) - 1 ? '1px solid var(--border)' : 'none'
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{j.nazev}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                  {j.mnozstvi}g · {Math.round(j.bil * j.mnozstvi / 100)}g B · {Math.round(j.sach * j.mnozstvi / 100)}g S · {Math.round(j.tuk * j.mnozstvi / 100)}g T
                </div>
              </div>
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 18, color: 'var(--accent)' }}>
                {Math.round(j.kcal * j.mnozstvi / 100)}
                <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'DM Sans', marginLeft: 2 }}>kcal</span>
              </div>
            </div>
          ))}
          {pridana.length > 5 && (
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
              +{pridana.length - 5} dalších · vše v sekci Výživa
            </div>
          )}
        </div>
      )}

      {/* TÝDENNÍ PŘEHLED */}
      <div className="card" style={{ marginBottom: 12 }}>
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
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: 'var(--muted)' }}>
          <span><span style={{ width: 8, height: 8, borderRadius: 2, background: 'rgba(232,255,71,0.3)', display: 'inline-block', marginRight: 4 }} />Splněno</span>
          <span><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--accent)', display: 'inline-block', marginRight: 4 }} />Dnes</span>
          <span><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--border)', display: 'inline-block', marginRight: 4 }} />Volno</span>
        </div>
      </div>

      {/* TIP DNE */}
      <div className="card">
        <div className="card-title">TIP DNE</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>{dnesniTip.ikona}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{dnesniTip.titulek}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{dnesniTip.text}</div>
          </div>
        </div>
      </div>

    </div>
  )
}