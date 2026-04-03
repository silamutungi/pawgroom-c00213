import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Scissors } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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
    <>
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-bold" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)', textDecoration: 'none' }} aria-label="PawGroom home">
              <Scissors size={20} style={{ color: 'var(--color-primary)' }} aria-hidden />
              PawGroom
            </Link>

            {/* Desktop nav — hidden below md */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {links.map(l => (
                <Link key={l.to} to={l.to} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px] flex items-center" style={{ color: isActive(l.to) ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: isActive(l.to) ? 'rgba(216,90,31,0.08)' : 'transparent' }}>
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Desktop auth buttons — hidden below md */}
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

            {/* Hamburger button — visible only below md */}
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: 'var(--color-text)' }}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              {/* Three horizontal lines hamburger icon */}
              {open ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <line x1="3" y1="5" x2="17" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay + slide-in panel — only rendered below md */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40" aria-hidden="true">
          {/* Semi-transparent backdrop — clicking this closes the drawer */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(31,29,26,0.40)' }}
            onClick={() => setOpen(false)}
          />

          {/* Slide-in drawer panel */}
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute top-0 right-0 h-full w-72 flex flex-col shadow-2xl"
            style={{ backgroundColor: 'var(--color-bg-surface)' }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <span className="font-semibold text-sm" style={{ color: 'var(--color-text-secondary)' }}>Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
                style={{ color: 'var(--color-text)' }}
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <line x1="3" y1="3" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="3" x2="3" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation links">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    color: isActive(l.to) ? 'var(--color-primary)' : 'var(--color-text)',
                    backgroundColor: isActive(l.to) ? 'rgba(216,90,31,0.08)' : 'transparent',
                  }}
                >
                  {isActive(l.to) && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                      aria-hidden="true"
                    />
                  )}
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="mx-4 border-t" style={{ borderColor: 'var(--color-border)' }} />

            {/* Auth section */}
            <div className="flex flex-col px-4 py-4 gap-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                    style={{
                      color: isActive('/dashboard') ? 'var(--color-primary)' : 'var(--color-text)',
                      backgroundColor: isActive('/dashboard') ? 'rgba(216,90,31,0.08)' : 'transparent',
                    }}
                  >
                    My bookings
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setOpen(false) }}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                    style={{ color: 'var(--color-text)' }}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
