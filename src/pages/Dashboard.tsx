import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, CheckCircle, XCircle, PlusCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { SEED_BOOKINGS } from '../data/seedData'
import { formatCurrency, formatDate } from '../lib/utils'
import type { Booking } from '../types'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

const STATUS_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  confirmed: { bg: 'rgba(22,163,74,0.12)', text: 'var(--color-success)', icon: <CheckCircle size={12} /> },
  pending: { bg: 'rgba(217,119,6,0.12)', text: 'var(--color-warning)', icon: <Clock size={12} /> },
  completed: { bg: 'rgba(37,99,235,0.12)', text: 'var(--color-info)', icon: <CheckCircle size={12} /> },
  cancelled: { bg: 'rgba(220,38,38,0.12)', text: 'var(--color-error)', icon: <XCircle size={12} /> },
}

export default function Dashboard() {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS)
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured) return
    const load = async () => {
      setLoading(true)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setLoading(false); return }
      setUserEmail(session.user.email ?? '')
      const { data } = await supabase.from('bookings').select('*').is('deleted_at', null).order('appointment_at', { ascending: false })
      if (data) setBookings(data as Booking[])
      setLoading(false)
    }
    load()
  }, [])

  const upcoming = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending')
  const past = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {!isSupabaseConfigured && (
        <div className="text-center py-2 text-sm font-medium" style={{ backgroundColor: 'var(--color-warning)', color: '#1a1a1a' }}>Viewing sample data — connect your database to go live.</div>
      )}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>My bookings</h1>
            {userEmail && <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>{userEmail}</p>}
          </div>
          <Link to="/browse">
            <Button className="flex items-center gap-2 min-h-[44px]" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>
              <PlusCircle size={16} />Book a groomer
            </Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {[{ label: 'Total bookings', value: bookings.length }, { label: 'Upcoming', value: upcoming.length }, { label: 'Completed', value: past.filter(b => b.status === 'completed').length }].map(stat => (
            <div key={stat.label} className="rounded-xl border p-5" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
              <div className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} aria-label="Loading bookings" />
          </div>
        ) : (
          <>
            <section className="mb-10">
              <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>Upcoming appointments ({upcoming.length})</h2>
              {upcoming.length === 0 ? (
                <div className="rounded-xl border p-10 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                  <div className="text-4xl mb-3">📅</div>
                  <div className="font-semibold mb-2" style={{ color: 'var(--color-text)' }}>No upcoming bookings</div>
                  <div className="text-sm mb-5" style={{ color: 'var(--color-text-secondary)' }}>Ready to book your dog&rsquo;s next groom?</div>
                  <Link to="/browse"><Button style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Find a groomer</Button></Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>Past bookings ({past.length})</h2>
              {past.length === 0 ? (
                <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)' }}>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>No past bookings yet.</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {past.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

function BookingCard({ booking: b }: { booking: Booking }) {
  const style = STATUS_STYLES[b.status] ?? STATUS_STYLES['pending']
  return (
    <div className="rounded-xl border p-5" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="font-semibold mb-1" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{b.groomer_name}</div>
          <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{b.service} · {b.dog_name} ({b.dog_breed})</div>
          <div className="flex items-center gap-2 mt-2">
            <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} aria-hidden />
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{formatDate(b.appointment_at)}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge style={{ backgroundColor: style.bg, color: style.text, border: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {style.icon}{b.status.charAt(0).toUpperCase() + b.status.slice(1)}
          </Badge>
          <span className="font-bold" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-headline)' }}>{formatCurrency(b.price)}</span>
        </div>
      </div>
    </div>
  )
}
