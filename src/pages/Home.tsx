import { Link } from 'react-router-dom'
import { Star, ShieldCheck, Clock, Award, ChevronRight } from 'lucide-react'
import { isSupabaseConfigured } from '../lib/supabase'
import { SEED_GROOMERS } from '../data/seedData'
import { formatCurrency } from '../lib/utils'
import { Badge } from '../components/ui/badge'

export default function Home() {
  const featured = SEED_GROOMERS.slice(0, 6)

  return (
    <div>
      {!isSupabaseConfigured && (
        <div className="text-center py-2 text-sm font-medium" style={{ backgroundColor: 'var(--color-warning)', color: '#1a1a1a' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}

      <section
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/27680310/pexels-photo-27680310.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        aria-label="Hero section"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 35%, rgba(0,0,0,0.30) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
          <Badge className="mb-6 text-sm font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none' }}>500+ Certified Groomers</Badge>
          <h1 className="font-bold text-white mb-6 leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em', maxWidth: '640px' }}>
            Find a certified groomer your dog will love.
          </h1>
          <p className="mb-8 text-white/80 max-w-lg" style={{ fontSize: '1.125rem', lineHeight: '1.6' }}>
            Browse verified professional groomers near you. Check real-time availability, compare transparent pricing by breed and size, and book instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/browse" className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold px-8 py-3 min-h-[44px] transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: '1rem' }}>
              Start browsing
            </Link>
            <Link to="/for-groomers" className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold px-8 py-3 min-h-[44px] transition-colors" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)', fontSize: '1rem' }}>
              List for free
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            {[{ icon: <ShieldCheck size={16} />, label: 'Background checked' }, { icon: <Award size={16} />, label: 'Certified professionals only' }, { icon: <Clock size={16} />, label: 'Instant confirmation' }].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <span style={{ color: 'var(--color-primary)' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Top-rated groomers near you</h2>
              <p style={{ color: 'var(--color-text-secondary)' }}>Every groomer is background checked and credential verified.</p>
            </div>
            <Link to="/browse" className="hidden sm:flex items-center gap-1 font-semibold text-sm hover:opacity-80 transition-opacity" style={{ color: 'var(--color-primary)' }}>
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(g => (
              <Link key={g.id} to={`/groomers/${g.id}`} className="block rounded-xl border p-5 transition-shadow hover:shadow-md" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: 'var(--color-bg-muted)' }}>{g.avatar_emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{g.name}</h3>
                      {g.background_checked && <ShieldCheck size={14} style={{ color: 'var(--color-success)', flexShrink: 0 }} aria-label="Background checked" />}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{g.city}, {g.state}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={13} fill="currentColor" style={{ color: 'var(--color-warning)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{g.rating.toFixed(1)}</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({g.review_count})</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {g.specialties.slice(0, 2).map(s => (
                    <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                  ))}
                  {g.available_today && <Badge className="text-xs" style={{ backgroundColor: 'rgba(22,163,74,0.12)', color: 'var(--color-success)', border: 'none' }}>Available today</Badge>}
                </div>
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>From</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary)', fontSize: 'var(--text-headline)' }}>{formatCurrency(g.price_small)}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/browse" className="inline-flex items-center gap-1 font-semibold text-sm hover:opacity-80" style={{ color: 'var(--color-primary)' }}>See all groomers <ChevronRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-bold text-center mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Browse by service</h2>
          <p className="text-center mb-12" style={{ color: 'var(--color-text-secondary)' }}>Every service includes a pre-groom health check and post-groom report card.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🛁', label: 'Bath & Brush', desc: 'Deep clean + blow-dry' },
              { emoji: '✂️', label: 'Full Groom', desc: 'Cut, style, and finish' },
              { emoji: '💅', label: 'Nail Care', desc: 'Trim, file, and buff' },
              { emoji: '🐩', label: 'Breed Styling', desc: 'Breed-standard cuts' },
            ].map(cat => (
              <Link key={cat.label} to={`/browse?service=${encodeURIComponent(cat.label)}`} className="rounded-xl border p-6 text-center transition-shadow hover:shadow-sm" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <div className="text-4xl mb-3">{cat.emoji}</div>
                <div className="font-semibold mb-1" style={{ color: 'var(--color-text)', fontSize: 'var(--text-subhead)' }}>{cat.label}</div>
                <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{cat.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-bold mb-6" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Why dog owners trust PawGroom</h2>
              <div className="space-y-6">
                {[
                  { emoji: '🔒', title: 'Verified professionals only', body: 'Every groomer passes a background check and must hold at least one nationally recognized certification before listing on PawGroom.' },
                  { emoji: '📋', title: 'Transparent pricing by size', body: 'No surprise fees. Pricing is shown up front by dog size and breed complexity — so you know exactly what to expect before booking.' },
                  { emoji: '⚡', title: 'Instant booking confirmation', body: 'Real-time availability means no phone tag. Book, confirm, and get a reminder — all in under 60 seconds.' },
                  { emoji: '🛡️', title: 'Clear liability coverage', body: 'Every appointment is covered by PawGroom Care — our service guarantee that defines exactly who is responsible for what, eliminating ambiguity.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-3xl mt-0.5 flex-shrink-0">{item.emoji}</span>
                    <div>
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{item.title}</div>
                      <div className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { rating: 5, body: 'PawGroom found me a certified groomer for my double-coated Husky in minutes. The pricing by coat type was a game changer — no surprises at pickup.', name: 'Jessica M.', breed: 'Siberian Husky owner' },
                { rating: 5, body: "I've tried other apps but groomers were inconsistent. Every PawGroom groomer has real credentials. My goldendoodle has never looked better.", name: 'Marcus T.', breed: 'Goldendoodle owner' },
              ].map(rev => (
                <div key={rev.name} className="rounded-xl border p-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" style={{ color: 'var(--color-warning)' }} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text)' }}>&ldquo;{rev.body}&rdquo;</p>
                  <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{rev.name}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{rev.breed}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-4 text-white" style={{ fontSize: 'var(--text-title-1)' }}>Ready to find your groomer?</h2>
          <p className="mb-8 text-white/80" style={{ fontSize: 'var(--text-body)' }}>Join thousands of dog owners who book with confidence every week.</p>
          <Link to="/browse" className="inline-flex items-center justify-center rounded-lg font-semibold px-8 py-3 min-h-[44px] transition-opacity hover:opacity-90" style={{ backgroundColor: '#fff', color: 'var(--color-primary)', fontSize: '1rem' }}>
            Explore now
          </Link>
        </div>
      </section>
    </div>
  )
}
