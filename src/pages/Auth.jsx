import { useState } from 'react'
import { supabase } from '../supabase'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [jmeno, setJmeno] = useState('')
  const [datumNarozeni, setDatumNarozeni] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) {
      setError('Chyba při přihlašování přes Google: ' + error.message)
      setGoogleLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError('Špatný email nebo heslo.')
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: jmeno, birth_date: datumNarozeni },
        },
      })
      if (error) {
        setError(error.message)
      } else {
        if (data.user) {
          await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: jmeno,
            birth_date: datumNarozeni,
            email: email,
          })
        }
        setSuccess('Registrace úspěšná! Zkontroluj email pro potvrzení.')
      }
    }
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">💪</span>
          <h1>FitPro</h1>
        </div>

        <h2>{isLogin ? 'Přihlášení' : 'Registrace'}</h2>

        <button
          className="btn-google"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <span>Přesměrovávám...</span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Přihlásit se přes Google
            </>
          )}
        </button>

        <div className="auth-divider">
          <span>nebo</span>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Celé jméno"
                value={jmeno}
                onChange={(e) => setJmeno(e.target.value)}
                required
              />
              <input
                type="date"
                placeholder="Datum narození"
                value={datumNarozeni}
                onChange={(e) => setDatumNarozeni(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Heslo"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Načítám...' : isLogin ? 'Přihlásit se' : 'Registrovat se'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'Nemáš účet?' : 'Už máš účet?'}{' '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess('') }}>
            {isLogin ? 'Registruj se' : 'Přihlas se'}
          </button>
        </p>
      </div>
    </div>
  )
}