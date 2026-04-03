import { useParams, Link } from 'react-router-dom'
import { Star, ShieldCheck, Award, Clock, MapPin, CheckCircle } from 'lucide-react'
import { SEED_GROOMERS, SEED_REVIEWS } from '../data/seedData'
import { formatCurrency, formatDate } from '../lib/utils'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const groomer = SEED_GROOMERS.find(g => g.id === id) ?? SEED_GROOMERS[0]
  const reviews = SEED_REVIEWS.filter(r => r.groomer_id === groomer.id)

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb" style={{ color: 'var(--color-text-secondary)' }}>
          <Link to="/browse" className="hover:underline" style={{ color: 'var(--color-primary)' }}>Groomers</Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text)' }}>{groomer.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-5xl flex-shrink-0" style={{ backgroundColor: 'var(--color-bg-surface)' }}>{groomer.avatar_emoji}</div>
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <h1 className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{groomer.name}</h1>
                  {groomer.background_checked && (
                    <Badge style={{ backgroundColor: 'rgba(22,163,74,0.12)', color: 'var(--color-success)', border: 'none' }} className="flex items-center gap-1">
                      <ShieldCheck size={12} />Background checked
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <MapPin size={14} aria-hidden />{groomer.city}, {groomer.state}
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star size={14} fill="currentColor" style={{ color: 'var(--color-warning)' }} />
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{groomer.rating.toFixed(1)}</span>
                    <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({groomer.review_count} reviews)</span>
                  </div>
                  <span style={{ color: 'var(--color-text-secondary)' }}>·</span>
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{groomer.years_experience} years experience</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <h2 className="font-semibold mb-3" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>About</h2>
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)' }}>{groomer.bio}</p>
            </div>

            <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>Transparent pricing by dog size</h2>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: 'Small', sub: 'Under 25 lbs', price: groomer.price_small }, { label: 'Medium', sub: '25–60 lbs', price: groomer.price_medium }, { label: 'Large', sub: 'Over 60 lbs', price: groomer.price_large }].map(tier => (
                  <div key={tier.label} className="rounded-lg p-4 text-center border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                    <div className="font-bold mb-1" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-primary)' }}>{formatCurrency(tier.price)}</div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{tier.label}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{tier.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>Specialties & services</h2>
              <div className="flex flex-wrap gap-2">
                {groomer.specialties.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>

            <div className="rounded-xl border p-6 mb-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>Certifications</h2>
              <div className="space-y-2">
                {groomer.certifications.map(c => (
                  <div key={c} className="flex items-center gap-2">
                    <CheckCircle size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>Reviews ({reviews.length})</h2>
              <div className="space-y-4">
                {reviews.map(rev => (
                  <div key={rev.id} className="rounded-xl border p-5" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{rev.reviewer_name}</div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} fill="currentColor" style={{ color: 'var(--color-warning)' }} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--color-text-secondary)' }}>{rev.body}</p>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{rev.dog_breed} · {formatDate(rev.created_at)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-xl border p-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-4">
                {groomer.available_today
                  ? <Badge style={{ backgroundColor: 'rgba(22,163,74,0.12)', color: 'var(--color-success)', border: 'none' }} className="flex items-center gap-1"><Clock size={12} />Available today</Badge>
                  : <Badge variant="secondary" className="flex items-center gap-1"><Clock size={12} />Next slot: tomorrow</Badge>}
              </div>
              <Link to="/signup">
                <Button className="w-full mb-3 min-h-[48px] font-semibold" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Book this groomer</Button>
              </Link>
              <p className="text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>Instant confirmation · Free cancellation 24h before</p>
              <div className="mt-5 space-y-3 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
                {[{ icon: <ShieldCheck size={16} />, text: 'Background checked & verified' }, { icon: <Award size={16} />, text: `${groomer.certifications.length} professional certifications` }, { icon: <Clock size={16} />, text: `${groomer.years_experience} years experience` }].map(item => (
                  <div key={item.text} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 rounded-lg" style={{ backgroundColor: 'rgba(45,122,140,0.08)' }}>
                <div className="text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>PawGroom Care Guarantee</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>All appointments include our service guarantee. Clear liability coverage — you know exactly what is protected before you book.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
