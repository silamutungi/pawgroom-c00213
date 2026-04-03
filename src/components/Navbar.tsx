import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Scissors } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  const links = [
    { to: '/browse', label: 'Browse' },
    { to: '/how-it-works', label: 'How it works' },
    { to: '/for-groomers', label: 'For groomers' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }} aria-label="PawGroom home">
            <Scissors size={20} style={{ color: 'var(--color-primary)' }} aria-hidden />
            PawGroom
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map(l => (
              <Link key={l.to} to={l.to} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px] flex items-center" style={{ color: isActive(l.to) ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: isActive(l.to) ? 'rgba(216,90,31,0.08)' : 'transparent' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>My bookings</Link>
                <button onClick={handleSignOut} className="px-4 py-2 rounded-lg text-sm font-semibold border min-h-[40px] transition-colors hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>Sign in</Link>
                <Link to="/browse" className="px-4 py-2 rounded-lg text-sm font-semibold min-h-[40px] flex items-center transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Start browsing</Link>
              </>
            )}
          </div>

          <button onClick={() => setOpen(o => !o)} className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg" style={{ color: 'var(--color-text)' }} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t px-6 py-4 space-y-1" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }} role="navigation" aria-label="Mobile navigation">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium" style={{ color: isActive(l.to) ? 'var(--color-primary)' : 'var(--color-text)', backgroundColor: isActive(l.to) ? 'rgba(216,90,31,0.08)' : 'transparent' }}>{l.label}</Link>
          ))}
          <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>My bookings</Link>
                <button onClick={() => { handleSignOut(); setOpen(false) }} className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>Sign out</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium" style={{ color: 'var(--color-text)' }}>Sign in</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-semibold text-center mt-2 rounded-lg" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
