import { useState, useEffect } from 'react'

const PROGRAMY = {
  fullbody_zac: {
    nazev: 'Full Body — Začátečník', popis: 'Celé tělo 3× týdně · 3 série · 8–12 opak.', uroven: 'Začátečník', serie: 3,
    treninky: [
      { den: 'Trénink A', cviky: [
        { id: 'fza_drep', nazev: 'Dřep', partie: 'Nohy · Hýždě', popis: 'Postav se na šířku ramen a dřepni dolů jako bys chtěl sednout na židli.', video: 'https://www.youtube.com/results?search_query=drep+spravna+technika' },
        { id: 'fza_bench', nazev: 'Bench press / Kliky', partie: 'Hrudník · Triceps', popis: 'Tlačíš činku nebo vlastní váhu od hrudi nahoru.', video: 'https://www.youtube.com/results?search_query=bench+press+technika' },
        { id: 'fza_row', nazev: 'Veslování s činkou', partie: 'Záda · Biceps', popis: 'Předkloníš se a tahneš činku k břichu.', video: 'https://www.youtube.com/results?search_query=veslování+s+činkou+technika' },
        { id: 'fza_ohp', nazev: 'Tlak nad hlavu', partie: 'Ramena · Triceps', popis: 'Tlačíš činku nebo jednoručky nad hlavu.', video: 'https://www.youtube.com/results?search_query=overhead+press+technika' },
        { id: 'fza_plank', nazev: 'Plank', partie: 'Břicho · Jádro', popis: 'Výdrž v poloze jako bys dělal kliky. Posiluje střed těla.', video: 'https://www.youtube.com/results?search_query=plank+spravne+provedeni' },
      ]},
      { den: 'Trénink B', cviky: [
        { id: 'fzb_vylady', nazev: 'Výpady', partie: 'Nohy · Hýždě', popis: 'Krok vpřed a pokrčíš koleno k zemi.', video: 'https://www.youtube.com/results?search_query=výpady+technika' },
        { id: 'fzb_hip', nazev: 'Zvedání pánve', partie: 'Hýždě · Hamstring', popis: 'Lehneš si na záda, chodidla na zemi, zvedáš pánev nahoru.', video: 'https://www.youtube.com/results?search_query=hip+thrust+technika' },
        { id: 'fzb_shyby', nazev: 'Shyby / Stahování na kladce', partie: 'Záda · Biceps', popis: 'Taháš se nahoru nebo stahuješ kladku dolů.', video: 'https://www.youtube.com/results?search_query=shyby+technika' },
        { id: 'fzb_bicep', nazev: 'Bicep curl', partie: 'Biceps', popis: 'Ohybuješ paži s jednoručkou.', video: 'https://www.youtube.com/results?search_query=bicep+curl+technika' },
        { id: 'fzb_mrtvy', nazev: 'Mrtvý tah', partie: 'Záda · Nohy · Celé tělo', popis: 'Zvedáš činku ze země. Jeden z nejdůležitějších cviků vůbec.', video: 'https://www.youtube.com/results?search_query=mrtvý+tah+technika' },
      ]},
    ]
  },
  fullbody_pok: {
    nazev: 'Full Body — Pokročilý', popis: 'Celé tělo 3× týdně · 4 série · 6–10 opak.', uroven: 'Pokročilý', serie: 4,
    treninky: [
      { den: 'Trénink A — Síla', cviky: [
        { id: 'fpa_drep', nazev: 'Dřep s velkou váhou', partie: 'Nohy · Hýždě', popis: 'Dřep s těžší činkou zaměřený na sílu.', video: 'https://www.youtube.com/results?search_query=squat+technika' },
        { id: 'fpa_bench', nazev: 'Bench press — těžký', partie: 'Hrudník · Triceps', popis: 'Bench press s těžší váhou zaměřený na sílu.', video: 'https://www.youtube.com/results?search_query=bench+press+síla' },
        { id: 'fpa_mrtvy', nazev: 'Mrtvý tah', partie: 'Záda · Celé tělo', popis: 'Těžký mrtvý tah. Jeden z nejdůležitějších silových cviků.', video: 'https://www.youtube.com/results?search_query=mrtvý+tah+technika' },
        { id: 'fpa_shyby', nazev: 'Shyby s přídavnou váhou', partie: 'Záda · Biceps', popis: 'Shyby s opaskovým závažím nebo do vyčerpání.', video: 'https://www.youtube.com/results?search_query=weighted+pull+ups' },
        { id: 'fpa_ohp', nazev: 'Tlak nad hlavu stojmo', partie: 'Ramena · Triceps', popis: 'Overhead press stojmo s velkou váhou.', video: 'https://www.youtube.com/results?search_query=overhead+press+stojmo' },
      ]},
      { den: 'Trénink B — Objem', cviky: [
        { id: 'fpb_goblet', nazev: 'Goblet dřep', partie: 'Nohy · Hýždě', popis: 'Dřep s jednoručkou u hrudi. Zaměřeno na objem.', video: 'https://www.youtube.com/results?search_query=goblet+squat+technika' },
        { id: 'fpb_incline', nazev: 'Šikmý bench press', partie: 'Horní hrudník', popis: 'Bench na nakloněné lavici.', video: 'https://www.youtube.com/results?search_query=incline+bench+press' },
        { id: 'fpb_row', nazev: 'Veslování jednoruč', partie: 'Záda · Biceps', popis: 'Opřeš se o lavici a tahneš jednoručku k boku.', video: 'https://www.youtube.com/results?search_query=dumbbell+row+technika' },
        { id: 'fpb_lateral', nazev: 'Boční zdvihy', partie: 'Ramena', popis: 'Zvedáš jednoručky do stran do výšky ramen.', video: 'https://www.youtube.com/results?search_query=lateral+raises+technika' },
        { id: 'fpb_hip', nazev: 'Zvedání pánve s činkou', partie: 'Hýždě', popis: 'Hip thrust s velkou váhou na bocích.', video: 'https://www.youtube.com/results?search_query=hip+thrust+s+činkou' },
      ]},
      { den: 'Trénink C — Kombinovaný', cviky: [
        { id: 'fpc_dips', nazev: 'Dipy na bradlech', partie: 'Hrudník · Triceps', popis: 'Opřeš se o bradla a spouštíš tělo dolů.', video: 'https://www.youtube.com/results?search_query=dipy+bradla+technika' },
        { id: 'fpc_pulldown', nazev: 'Stahování na kladce', partie: 'Záda · Biceps', popis: 'Sedíš a stahuješ kladku k hrudi.', video: 'https://www.youtube.com/results?search_query=lat+pulldown+technika' },
        { id: 'fpc_drep', nazev: 'Přední dřep', partie: 'Nohy · Hýždě', popis: 'Dřep s činkou před tělem. Více zapojuje přední stehna.', video: 'https://www.youtube.com/results?search_query=front+squat+technika' },
        { id: 'fpc_bicep', nazev: 'Bicep curl jednoručky', partie: 'Biceps', popis: 'Střídavé zdvíhání jednoruček.', video: 'https://www.youtube.com/results?search_query=bicep+curl+jednoručky' },
        { id: 'fpc_tricep', nazev: 'Tricep na kladce', partie: 'Triceps', popis: 'Tlačíš kladku dolů nataženýma rukama.', video: 'https://www.youtube.com/results?search_query=tricep+pushdown' },
      ]},
    ]
  },
  upper_lower: {
    nazev: 'Horní / Dolní tělo', popis: '4× týdně · každá partie 2× týdně · 4 série', uroven: 'Středně pokročilý', serie: 4,
    treninky: [
      { den: 'Horní tělo A', cviky: [
        { id: 'ula_bench', nazev: 'Bench press', partie: 'Hrudník · Triceps', popis: 'Základní cvik na hrudník.', video: 'https://www.youtube.com/results?search_query=bench+press+technika' },
        { id: 'ula_ohp', nazev: 'Tlak nad hlavu', partie: 'Ramena · Triceps', popis: 'Tlačíš činku nad hlavu.', video: 'https://www.youtube.com/results?search_query=overhead+press+technika' },
        { id: 'ula_row', nazev: 'Veslování s činkou', partie: 'Záda · Biceps', popis: 'Předkloníš se a tahneš činku k břichu.', video: 'https://www.youtube.com/results?search_query=veslování+s+činkou' },
        { id: 'ula_pulldown', nazev: 'Stahování na kladce', partie: 'Záda · Biceps', popis: 'Sedíš a stahuješ kladku k hrudi.', video: 'https://www.youtube.com/results?search_query=stahování+na+kladce' },
        { id: 'ula_bicep', nazev: 'Bicep curl', partie: 'Biceps', popis: 'Ohybuješ paži s jednoručkou.', video: 'https://www.youtube.com/results?search_query=bicep+curl+technika' },
        { id: 'ula_tricep', nazev: 'Tricep na kladce', partie: 'Triceps', popis: 'Tlačíš kladku dolů.', video: 'https://www.youtube.com/results?search_query=tricep+kladka' },
      ]},
      { den: 'Dolní tělo A', cviky: [
        { id: 'uldla_drep', nazev: 'Dřep', partie: 'Stehna · Hýždě', popis: 'Základní cvik na nohy.', video: 'https://www.youtube.com/results?search_query=drep+technika' },
        { id: 'uldla_legpress', nazev: 'Leg press', partie: 'Stehna · Hýždě', popis: 'Na stroji tlačíš plošinu nohama od sebe.', video: 'https://www.youtube.com/results?search_query=leg+press+technika' },
        { id: 'uldla_hip', nazev: 'Zvedání pánve', partie: 'Hýždě', popis: 'Lehneš si na záda a zvedáš pánev.', video: 'https://www.youtube.com/results?search_query=hip+thrust+technika' },
        { id: 'uldla_vylady', nazev: 'Výpady', partie: 'Stehna · Hýždě', popis: 'Krok vpřed a pokrčíš koleno k zemi.', video: 'https://www.youtube.com/results?search_query=výpady+technika' },
        { id: 'uldla_lytka', nazev: 'Zvedání na lýtka', partie: 'Lýtka', popis: 'Stojíš a zvedáš se na špičky.', video: 'https://www.youtube.com/results?search_query=lýtka+cvik' },
      ]},
      { den: 'Horní tělo B', cviky: [
        { id: 'ulb_incline', nazev: 'Šikmý bench press', partie: 'Horní hrudník', popis: 'Bench na nakloněné lavici.', video: 'https://www.youtube.com/results?search_query=incline+bench+technika' },
        { id: 'ulb_shyby', nazev: 'Shyby', partie: 'Záda · Biceps', popis: 'Taháš se nahoru na hrazdě.', video: 'https://www.youtube.com/results?search_query=shyby+technika' },
        { id: 'ulb_lateral', nazev: 'Boční zdvihy', partie: 'Ramena', popis: 'Zvedáš jednoručky do stran.', video: 'https://www.youtube.com/results?search_query=boční+zdvihy+ramena' },
        { id: 'ulb_row', nazev: 'Veslování jednoruč', partie: 'Záda · Biceps', popis: 'Opřeš se o lavici a tahneš jednoručku k boku.', video: 'https://www.youtube.com/results?search_query=veslování+jednoruč' },
        { id: 'ulb_tricep', nazev: 'Francouzský tlak', partie: 'Triceps', popis: 'Ležíš na lavici a ohybuješ paže s činkou nad hlavou.', video: 'https://www.youtube.com/results?search_query=francouzský+tlak+technika' },
      ]},
      { den: 'Dolní tělo B', cviky: [
        { id: 'uldlb_mrtvy', nazev: 'Mrtvý tah', partie: 'Záda · Nohy · Celé tělo', popis: 'Zvedáš činku ze země.', video: 'https://www.youtube.com/results?search_query=mrtvý+tah+technika' },
        { id: 'uldlb_goblet', nazev: 'Goblet dřep', partie: 'Stehna · Hýždě', popis: 'Dřep s jednoručkou u hrudi.', video: 'https://www.youtube.com/results?search_query=goblet+squat+technika' },
        { id: 'uldlb_legcurl', nazev: 'Leg curl', partie: 'Hamstring', popis: 'Na stroji ohybuješ nohy.', video: 'https://www.youtube.com/results?search_query=leg+curl+technika' },
        { id: 'uldlb_split', nazev: 'Výpad s jednou nohou', partie: 'Stehna · Hýždě', popis: 'Zadní noha na lavici, přední noha dřepuje.', video: 'https://www.youtube.com/results?search_query=bulgarian+split+squat' },
        { id: 'uldlb_lytka', nazev: 'Zvedání na lýtka', partie: 'Lýtka', popis: 'Stojíš a zvedáš se na špičky.', video: 'https://www.youtube.com/results?search_query=lýtka+cvik' },
      ]},
    ]
  },
  ppl: {
    nazev: 'Tlačení / Tahání / Nohy', popis: '6× týdně · každá partie 2× týdně · 4 série', uroven: 'Pokročilý', serie: 4,
    treninky: [
      { den: 'Tlačení — Hrudník · Ramena · Triceps', cviky: [
        { id: 'push_bench', nazev: 'Bench press', partie: 'Hrudník', popis: 'Základní cvik na hrudník.', video: 'https://www.youtube.com/results?search_query=bench+press+technika' },
        { id: 'push_incline', nazev: 'Šikmý bench press', partie: 'Horní hrudník', popis: 'Bench na nakloněné lavici.', video: 'https://www.youtube.com/results?search_query=incline+bench+technika' },
        { id: 'push_ohp', nazev: 'Tlak nad hlavu', partie: 'Ramena', popis: 'Tlačíš činku nad hlavu.', video: 'https://www.youtube.com/results?search_query=overhead+press+technika' },
        { id: 'push_lateral', nazev: 'Boční zdvihy', partie: 'Ramena', popis: 'Zvedáš jednoručky do stran.', video: 'https://www.youtube.com/results?search_query=boční+zdvihy+technika' },
        { id: 'push_tricep', nazev: 'Tricep na kladce', partie: 'Triceps', popis: 'Tlačíš kladku dolů.', video: 'https://www.youtube.com/results?search_query=tricep+kladka' },
      ]},
      { den: 'Tahání — Záda · Biceps', cviky: [
        { id: 'pull_mrtvy', nazev: 'Mrtvý tah', partie: 'Záda · Celé tělo', popis: 'Nejdůležitější cvik na záda.', video: 'https://www.youtube.com/results?search_query=mrtvý+tah+technika' },
        { id: 'pull_shyby', nazev: 'Shyby', partie: 'Záda · Biceps', popis: 'Taháš se nahoru na hrazdě.', video: 'https://www.youtube.com/results?search_query=shyby+technika' },
        { id: 'pull_row', nazev: 'Veslování s činkou', partie: 'Záda · Biceps', popis: 'Předkloníš se a tahneš činku k břichu.', video: 'https://www.youtube.com/results?search_query=veslování+s+činkou' },
        { id: 'pull_pulldown', nazev: 'Stahování na kladce', partie: 'Záda', popis: 'Sedíš a stahuješ kladku k hrudi.', video: 'https://www.youtube.com/results?search_query=stahování+kladce' },
        { id: 'pull_bicep', nazev: 'Bicep curl', partie: 'Biceps', popis: 'Ohybuješ paži s jednoručkou.', video: 'https://www.youtube.com/results?search_query=bicep+curl+technika' },
      ]},
      { den: 'Nohy — Stehna · Hýždě · Lýtka', cviky: [
        { id: 'legs_drep', nazev: 'Dřep', partie: 'Stehna · Hýždě', popis: 'Základní cvik na nohy.', video: 'https://www.youtube.com/results?search_query=drep+technika' },
        { id: 'legs_legpress', nazev: 'Leg press', partie: 'Stehna · Hýždě', popis: 'Na stroji tlačíš plošinu nohama.', video: 'https://www.youtube.com/results?search_query=leg+press+technika' },
        { id: 'legs_hip', nazev: 'Zvedání pánve', partie: 'Hýždě', popis: 'Nejlepší cvik na hýždě.', video: 'https://www.youtube.com/results?search_query=hip+thrust+technika' },
        { id: 'legs_legcurl', nazev: 'Leg curl', partie: 'Hamstring', popis: 'Na stroji ohybuješ nohy.', video: 'https://www.youtube.com/results?search_query=leg+curl+technika' },
        { id: 'legs_lytka', nazev: 'Zvedání na lýtka', partie: 'Lýtka', popis: 'Stojíš a zvedáš se na špičky.', video: 'https://www.youtube.com/results?search_query=lýtka+cvik' },
      ]},
    ]
  }
}

const DOPORUCENI = {
  zacatecnik: { 3: 'fullbody_zac', 4: 'fullbody_zac', 6: 'upper_lower' },
  pokrocily: { 3: 'fullbody_pok', 4: 'upper_lower', 6: 'ppl' },
  expert: { 3: 'fullbody_pok', 4: 'upper_lower', 6: 'ppl' },
}

function load(key, def) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def } catch { return def } }
function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }

export default function Trenink() {
  const [profil, setProfil] = useState(() => load('fp_profil', null))
  const [program, setProgram] = useState(() => load('fp_program', null))
  const [vlastni, setVlastni] = useState(() => load('fp_vlastni', []))
  const [historie, setHistorie] = useState(() => load('fp_historie', {}))
  const [onbKrok, setOnbKrok] = useState(0)
  const [onbData, setOnbData] = useState({})
  const [sekce, setSekce] = useState('programy')
  const [zobrazitVyber, setZobrazitVyber] = useState(false)
  const [aktivni, setAktivni] = useState(null)
  const [novy, setNovy] = useState({ nazev: '', cviky: [], serie: 3 })
  const [novyCvik, setNovyCvik] = useState('')
  const [beh, setBeh] = useState({})

  useEffect(() => save('fp_profil', profil), [profil])
  useEffect(() => save('fp_program', program), [program])
  useEffect(() => save('fp_vlastni', vlastni), [vlastni])
  useEffect(() => save('fp_historie', historie), [historie])

  const ulozSerii = (id, s, kg, opak) => setBeh(p => ({ ...p, [`${id}-${s}`]: { kg, opak } }))

  const ulozHistorii = (id, pocet) => {
    const serie = Array.from({ length: pocet }, (_, i) => beh[`${id}-${i}`]).filter(s => s?.kg && s?.opak)
    if (!serie.length) return
    const datum = new Date().toLocaleDateString('cs-CZ')
    const updated = { ...historie, [id]: [...(historie[id] || []).slice(-3), { datum, serie }] }
    setHistorie(updated)
  }

  const dokoncitOnb = (data) => {
    const prog = DOPORUCENI[data.uroven]?.[data.dny] || 'fullbody_zac'
    setProfil(data)
    setProgram(prog)
  }

  const pridatCvik = () => {
    if (!novyCvik.trim()) return
    setNovy(p => ({ ...p, cviky: [...p.cviky, { id: `v_${Date.now()}`, nazev: novyCvik.trim(), partie: 'Vlastní', popis: '', video: `https://www.youtube.com/results?search_query=${encodeURIComponent(novyCvik)}+technika` }] }))
    setNovyCvik('')
  }

  const ulozVlastni = () => {
    if (!novy.nazev || !novy.cviky.length) return
    const updated = [...vlastni, { ...novy, id: Date.now() }]
    setVlastni(updated)
    setNovy({ nazev: '', cviky: [], serie: 3 })
    setSekce('moje')
  }

  // ONBOARDING
  if (!profil || !program) {
    const otazky = [
      { otazka: 'Jaký máš cíl?', klic: 'cil', moznosti: [{ label: '🔥 Zhubnout a zpevnit', value: 'zhubnout' }, { label: '💪 Nabrat svaly', value: 'nabrat' }, { label: '⚡ Zlepšit kondici', value: 'kondice' }] },
      { otazka: 'Kolikrát týdně chceš cvičit?', klic: 'dny', moznosti: [{ label: '2–3× týdně', value: 3 }, { label: '4× týdně', value: 4 }, { label: '5–6× týdně', value: 6 }] },
      { otazka: 'Jaká je tvoje úroveň?', klic: 'uroven', moznosti: [{ label: '🌱 Začátečník', value: 'zacatecnik' }, { label: '📈 Mírně pokročilý', value: 'pokrocily' }, { label: '🏆 Pokročilý', value: 'expert' }] },
    ]
    const q = otazky[onbKrok]
    return (
      <div className="page">
        <div style={{ marginBottom: 24 }}>
          <div className="page-title">NASTAVENÍ</div>
          <div className="page-subtitle">Vyplníš jednou — uložíme si to</div>
          <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= onbKrok ? 'var(--accent)' : 'var(--border)' }} />)}
          </div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>{q.otazka}</div>
          {q.moznosti.map((m, i) => (
            <button key={i} className="btn btn-ghost"
              style={{ marginBottom: 10, justifyContent: 'flex-start', borderColor: onbData[q.klic] === m.value ? 'var(--accent)' : undefined, color: onbData[q.klic] === m.value ? 'var(--accent)' : undefined }}
              onClick={() => {
                const np = { ...onbData, [q.klic]: m.value }
                setOnbData(np)
                if (onbKrok < 2) setOnbKrok(onbKrok + 1)
                else dokoncitOnb(np)
              }}>
              {m.label}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // VÝBĚR PROGRAMU
  if (zobrazitVyber) {
    return (
      <div className="page">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: 12 }} onClick={() => setZobrazitVyber(false)}>← Zpět</button>
        <div className="page-title" style={{ marginBottom: 16 }}>VYBER PROGRAM</div>
        {Object.entries(PROGRAMY).map(([key, p]) => (
          <div key={key} className="card" style={{ cursor: 'pointer', marginBottom: 10, borderColor: program === key ? 'var(--accent)' : undefined }}
            onClick={() => { setProgram(key); setZobrazitVyber(false) }}>
            <div className="row">
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{p.nazev}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{p.popis}</div>
                <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 4 }}>Pro: {p.uroven}</div>
              </div>
              {program === key && <div style={{ color: 'var(--accent)', fontSize: 18 }}>✓</div>}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // VYTVÁŘENÍ VLASTNÍHO
  if (sekce === 'vytvorit') {
    return (
      <div className="page">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: 12 }} onClick={() => setSekce('moje')}>← Zpět</button>
        <div className="page-title" style={{ marginBottom: 14 }}>NOVÝ TRÉNINK</div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="inp-label">Název tréninku</div>
          <input className="inp" placeholder="např. Můj push trénink" value={novy.nazev}
            onChange={e => setNovy(p => ({ ...p, nazev: e.target.value }))} />
          <div className="inp-label" style={{ marginTop: 12 }}>Počet sérií</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            {[2, 3, 4, 5].map(n => (
              <button key={n} className={`btn ${novy.serie === n ? 'btn-accent' : 'btn-ghost'}`}
                style={{ width: 'auto', padding: '8px 18px' }}
                onClick={() => setNovy(p => ({ ...p, serie: n }))}>
                {n}×
              </button>
            ))}
          </div>
        </div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="card-title">PŘIDAT CVIK</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="inp" placeholder="Název cviku..." value={novyCvik}
              onChange={e => setNovyCvik(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && pridatCvik()} />
            <button className="btn btn-accent" style={{ width: 'auto', padding: '0 18px', whiteSpace: 'nowrap' }} onClick={pridatCvik}>+</button>
          </div>
          {novy.cviky.length > 0 && (
            <div style={{ marginTop: 12 }}>
              {novy.cviky.map((c, i) => (
                <div key={i} className="ex-row">
                  <div className="ex-info"><div className="ex-name">{c.nazev}</div></div>
                  <div style={{ color: 'var(--accent2)', cursor: 'pointer', fontSize: 18 }}
                    onClick={() => setNovy(p => ({ ...p, cviky: p.cviky.filter((_, idx) => idx !== i) }))}>×</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="btn btn-accent" style={{ opacity: !novy.nazev || !novy.cviky.length ? 0.4 : 1 }} onClick={ulozVlastni}>
          Uložit trénink
        </button>
      </div>
    )
  }

  // DETAIL TRÉNINKU
  if (aktivni !== null) {
    const jeProg = aktivni.typ === 'program'
    const trenink = jeProg ? PROGRAMY[program].treninky[aktivni.index] : { den: vlastni[aktivni.index].nazev, cviky: vlastni[aktivni.index].cviky }
    const pocetSerii = jeProg ? PROGRAMY[program].serie : vlastni[aktivni.index]?.serie || 3
    return (
      <div className="page">
        <button className="btn btn-ghost btn-sm" style={{ marginBottom: 12 }} onClick={() => { setAktivni(null); setBeh({}) }}>← Zpět</button>
        <div style={{ marginBottom: 14 }}>
          <div className="page-title" style={{ fontSize: 22 }}>{trenink.den}</div>
          <div className="page-subtitle">{pocetSerii} série · 8–12 opakování</div>
        </div>
        {trenink.cviky.map((cvik) => {
          const hist = historie[cvik.id] || []
          const posledni = hist[hist.length - 1]
          return (
            <div key={cvik.id} className="card" style={{ marginBottom: 12 }}>
              <div className="row" style={{ marginBottom: 6 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{cvik.nazev}</div>
                  <div style={{ fontSize: 11, color: 'var(--accent)', marginTop: 1 }}>{cvik.partie}</div>
                </div>
                <a href={cvik.video} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, color: 'var(--muted)', textDecoration: 'none', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 8 }}>
                  ▶ Jak na to?
                </a>
              </div>
              {cvik.popis && <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>{cvik.popis}</div>}
              {posledni && (
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '8px 10px', marginBottom: 10 }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 4 }}>MINULE ({posledni.datum})</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {posledni.serie.map((s, si) => (
                      <span key={si} style={{ fontSize: 12, background: 'var(--border)', padding: '2px 8px', borderRadius: 6 }}>{s.kg}kg × {s.opak}</span>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 1fr 32px', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center' }}>#</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center' }}>Kg</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center' }}>Opak.</div>
                <div style={{ fontSize: 10, color: 'var(--muted)', textAlign: 'center' }}>✓</div>
              </div>
              {Array.from({ length: pocetSerii }, (_, si) => {
                const h = beh[`${cvik.id}-${si}`] || { kg: '', opak: '' }
                const hotovo = h.kg && h.opak
                return (
                  <div key={si} style={{ display: 'grid', gridTemplateColumns: '28px 1fr 1fr 32px', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textAlign: 'center', color: 'var(--muted)' }}>{si + 1}</div>
                    <input className="inp" type="number" placeholder="kg" value={h.kg}
                      style={{ padding: '8px', fontSize: 13, textAlign: 'center' }}
                      onChange={e => ulozSerii(cvik.id, si, e.target.value, h.opak)} />
                    <input className="inp" type="number" placeholder="opak." value={h.opak}
                      style={{ padding: '8px', fontSize: 13, textAlign: 'center' }}
                      onChange={e => ulozSerii(cvik.id, si, h.kg, e.target.value)} />
                    <div className={`check ${hotovo ? 'done' : ''}`} style={{ width: 32, height: 32 }}
                      onClick={() => hotovo && ulozHistorii(cvik.id, pocetSerii)}>
                      {hotovo ? '✓' : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
        <button className="btn btn-accent" style={{ marginTop: 8 }} onClick={() => { setAktivni(null); setBeh({}) }}>
          Dokončit trénink ✓
        </button>
      </div>
    )
  }

  // HLAVNÍ OBRAZOVKA
  const aktProg = PROGRAMY[program]
  return (
    <div className="page">
      <div className="page-title" style={{ marginBottom: 14 }}>TRÉNINK</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button className={`btn ${sekce === 'programy' ? 'btn-accent' : 'btn-ghost'} btn-sm`} onClick={() => setSekce('programy')}>Programy</button>
        <button className={`btn ${sekce === 'moje' ? 'btn-accent' : 'btn-ghost'} btn-sm`} onClick={() => setSekce('moje')}>
          Moje tréninky {vlastni.length > 0 && `(${vlastni.length})`}
        </button>
      </div>

      {sekce === 'programy' && (
        <>
          <div className="card" style={{ marginBottom: 12, background: 'linear-gradient(135deg,#1a1a00,#0a0a0a)', borderColor: 'rgba(232,255,71,0.2)' }}>
            <div style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Tvůj program</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{aktProg.nazev}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{aktProg.popis}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }} onClick={() => setZobrazitVyber(true)}>Změnit program</button>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }} onClick={() => { setProfil(null); setProgram(null); setOnbKrok(0); setOnbData({}) }}>Nové nastavení</button>
            </div>
          </div>
          {aktProg.treninky.map((t, i) => (
            <div key={i} className="card" style={{ cursor: 'pointer', marginBottom: 10 }}
              onClick={() => setAktivni({ typ: 'program', index: i })}>
              <div className="row">
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{t.den}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{t.cviky.length} cviků · {aktProg.serie} série</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{t.cviky.map(c => c.nazev).join(' · ')}</div>
                </div>
                <div style={{ color: 'var(--accent)', fontSize: 20 }}>→</div>
              </div>
            </div>
          ))}
        </>
      )}

      {sekce === 'moje' && (
        <>
          {vlastni.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: 32 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>💪</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Zatím žádné vlastní tréninky</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>Vytvoř si trénink přesně podle sebe</div>
              <button className="btn btn-accent" onClick={() => setSekce('vytvorit')}>+ Vytvořit trénink</button>
            </div>
          ) : (
            <>
              {vlastni.map((t, i) => (
                <div key={t.id} className="card" style={{ marginBottom: 10, borderColor: 'rgba(255,107,53,0.3)' }}>
                  <div className="row" style={{ marginBottom: 6 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{t.nazev}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{t.cviky.length} cviků · {t.serie} série</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-accent btn-sm" onClick={() => setAktivni({ typ: 'vlastni', index: i })}>Cvičit</button>
                      <button className="btn btn-ghost btn-sm" style={{ color: 'var(--accent2)', borderColor: 'var(--accent2)' }}
                        onClick={() => setVlastni(prev => prev.filter(x => x.id !== t.id))}>×</button>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{t.cviky.map(c => c.nazev).join(' · ')}</div>
                </div>
              ))}
              <button className="btn btn-ghost" style={{ borderColor: 'var(--accent2)', color: 'var(--accent2)', marginTop: 4 }}
                onClick={() => setSekce('vytvorit')}>
                + Přidat další trénink
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}