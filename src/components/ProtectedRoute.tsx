import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { type ReactNode } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) { setAuthed(true); setChecking(false); return }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthed(Boolean(session))
      setChecking(false)
    })
  }, [])

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} aria-label="Checking authentication" />
      </div>
    )
  }

  if (!authed) return <Navigate to="/login" replace />

  return <>{children}</>
}
