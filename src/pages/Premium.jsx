export default function Premium() {
  const plany = [
    {
      nazev: 'Zdarma',
      cena: '0',
      obdobi: 'CZK / měs',
      barva: 'var(--muted)',
      featured: false,
      funkce: [
        { text: 'Kalorická kalkulačka', ano: true },
        { text: '1 tréninkový plán', ano: true },
        { text: 'Pokrok a statistiky', ano: false },
        { text: 'Jídelní plány a recepty', ano: false },
        { text: 'Chat s trenérem', ano: false },
      ],
      btn: 'Aktuální plán',
      btnStyle: 'btn-ghost',
      disabled: true,
    },
    {
      nazev: 'Měsíční',
      cena: '249',
      obdobi: 'CZK / měs',
      barva: 'var(--accent)',
      featured: true,
      funkce: [
        { text: 'Vše ze zdarma', ano: true },
        { text: 'Všechny tréninky', ano: true },
        { text: 'Pokrok a statistiky', ano: true },
        { text: 'Jídelní plány + recepty', ano: true },
        { text: 'Chat s trenérem', ano: false },
      ],
      btn: 'Začít — 249 CZK / měsíc',
      btnStyle: 'btn-accent',
      disabled: false,
    },
    {
      nazev: 'Roční',
      cena: '1990',
      obdobi: 'CZK / rok · ušetříš 998 CZK',
      barva: 'var(--accent2)',
      featured: false,
      funkce: [
        { text: 'Vše z měsíčního', ano: true },
        { text: 'Chat s trenérem', ano: true },
        { text: 'Individuální plán na míru', ano: true },
        { text: 'PDF plány ke stažení', ano: true },
        { text: 'Prioritní podpora', ano: true },
      ],
      btn: 'Roční plán — 1990 CZK',
      btnStyle: 'btn-ghost',
      disabled: false,
    },
  ]

  return (
    <div className="page">
      <div className="page-title">PREMIUM</div>
      <div className="page-subtitle" style={{ marginBottom: 14 }}>Odemkni plný potenciál</div>

      <div className="card" style={{
        background: 'linear-gradient(135deg, #1a1a00, #0a0a0a)',
        borderColor: 'rgba(232,255,71,0.2)',
        marginBottom: 16
      }}>
        <div style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
          Aktuálně na FREE plánu
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Odemkni všechny funkce</div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>Tréninky · Kalkulačka · Pokrok · Podpora</div>
      </div>

      {plany.map((p, i) => (
        <div
          key={i}
          className="card"
          style={{
            borderColor: p.featured ? p.barva : undefined,
            marginBottom: 10,
            position: 'relative'
          }}
        >
          {p.featured && (
            <div style={{
              position: 'absolute', top: 12, right: 12,
              background: 'var(--accent)', color: '#000',
              fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4
            }}>
              NEJLEPŠÍ VOLBA
            </div>
          )}
          <div style={{ fontSize: 11, color: p.barva, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            {p.nazev}
          </div>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 38, color: p.barva, lineHeight: 1, marginBottom: 4 }}>
            {p.cena} <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 400 }}>CZK</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>{p.obdobi}</div>
          <div className="sep" />
          {p.funkce.map((f, fi) => (
            <div key={fi} style={{
              fontSize: 12, padding: '3px 0',
              color: f.ano ? 'var(--text)' : 'var(--muted)'
            }}>
              {f.ano ? '✓' : '✗'} {f.text}
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <button
              className={`btn ${p.btnStyle}`}
              style={{
                opacity: p.disabled ? 0.5 : 1,
                cursor: p.disabled ? 'default' : 'pointer',
                borderColor: !p.featured ? p.barva : undefined,
                color: !p.featured && !p.disabled ? p.barva : undefined,
              }}
              disabled={p.disabled}
            >
              {p.btn}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}