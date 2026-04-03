import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { type FormEvent } from 'react'
import { LogIn, AlertCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isSupabaseConfigured) { navigate('/dashboard'); return }
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100svh-72px)] px-6 py-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🐾</div>
          <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Welcome back</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Sign in to manage your bookings.</p>
        </div>
        <div className="rounded-2xl border p-8" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required autoComplete="current-password" />
            </div>
            {error && (
              <div className="flex items-start gap-2 rounded-lg p-3" style={{ backgroundColor: 'rgba(220,38,38,0.08)' }} role="alert">
                <AlertCircle size={16} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: '2px' }} aria-hidden />
                <span className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</span>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full min-h-[48px] font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <LogIn size={16} />}
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            No account? <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
