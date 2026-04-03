import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { type FormEvent } from 'react'
import { UserPlus, AlertCircle, CheckCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'owner' | 'groomer'>('owner')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isSupabaseConfigured) { navigate('/dashboard'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setError('')
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role } },
    })
    setLoading(false)
    if (authError) { setError(authError.message); return }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100svh-72px)] px-6 py-12" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="text-center max-w-sm">
          <CheckCircle size={48} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
          <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Check your email</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100svh-72px)] px-6 py-12" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🐾</div>
          <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Create your account</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Join the marketplace for professional groomers.</p>
        </div>
        <div className="rounded-2xl border p-8" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex rounded-lg overflow-hidden border mb-6" style={{ borderColor: 'var(--color-border)' }}>
            {(['owner', 'groomer'] as const).map(r => (
              <button key={r} type="button" onClick={() => setRole(r)} className="flex-1 py-2 text-sm font-semibold transition-colors min-h-[40px]" style={{ backgroundColor: role === r ? 'var(--color-primary)' : 'transparent', color: role === r ? '#fff' : 'var(--color-text-secondary)' }}>
                {r === 'owner' ? 'Dog owner' : 'Groomer'}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required autoComplete="new-password" />
            </div>
            {error && (
              <div className="flex items-start gap-2 rounded-lg p-3" style={{ backgroundColor: 'rgba(220,38,38,0.08)' }} role="alert">
                <AlertCircle size={16} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: '2px' }} aria-hidden />
                <span className="text-sm" style={{ color: 'var(--color-error)' }}>{error}</span>
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full min-h-[48px] font-semibold flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              {loading ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <UserPlus size={16} />}
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
          <p className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
            Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
