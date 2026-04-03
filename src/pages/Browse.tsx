import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, Star, ShieldCheck, MapPin, X } from 'lucide-react'
import { SEED_GROOMERS } from '../data/seedData'
import { isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'

const SERVICES = ['Bath & Brush', 'Full Groom', 'Nail Care', 'Breed Styling']
const SIZES = ['Small', 'Medium', 'Large']
const SORTS = ['Top rated', 'Price: low to high', 'Price: high to low', 'Most reviewed']

export default function Browse() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [selectedService, setSelectedService] = useState(searchParams.get('service') ?? '')
  const [selectedSize, setSelectedSize] = useState('')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sort, setSort] = useState('Top rated')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    let list = [...SEED_GROOMERS]
    if (query) list = list.filter(g => g.name.toLowerCase().includes(query.toLowerCase()) || g.city.toLowerCase().includes(query.toLowerCase()))
    if (selectedService) list = list.filter(g => g.specialties.some(s => s.toLowerCase().includes(selectedService.toLowerCase())))
    if (availableOnly) list = list.filter(g => g.available_today)
    if (sort === 'Top rated') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'Price: low to high') list.sort((a, b) => a.price_small - b.price_small)
    else if (sort === 'Price: high to low') list.sort((a, b) => b.price_small - a.price_small)
    else if (sort === 'Most reviewed') list.sort((a, b) => b.review_count - a.review_count)
    return list
  }, [query, selectedService, selectedSize, availableOnly, sort])

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {!isSupabaseConfigured && (
        <div className="text-center py-2 text-sm font-medium" style={{ backgroundColor: 'var(--color-warning)', color: '#1a1a1a' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-bold mb-2" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Find a groomer</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>All groomers are certified professionals. No exceptions.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} aria-hidden />
            <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or city..." className="pl-9" />
          </div>
          <button onClick={() => setShowFilters(f => !f)} className="flex items-center gap-2 rounded-lg border px-4 py-2 font-medium text-sm min-h-[44px] transition-colors hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)', backgroundColor: 'var(--color-bg-surface)' }} aria-label="Toggle filters">
            <SlidersHorizontal size={16} />
            Filters
            {(selectedService || selectedSize || availableOnly) && <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />}
          </button>
        </div>

        {showFilters && (
          <div className="rounded-xl border p-5 mb-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Service type</div>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map(s => (
                    <button key={s} onClick={() => setSelectedService(selectedService === s ? '' : s)} className="rounded-full px-3 py-1 text-sm font-medium border min-h-[36px] transition-colors" style={{ backgroundColor: selectedService === s ? 'var(--color-primary)' : 'transparent', color: selectedService === s ? '#fff' : 'var(--color-text)', borderColor: selectedService === s ? 'var(--color-primary)' : 'var(--color-border)' }}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Dog size</div>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button key={s} onClick={() => setSelectedSize(selectedSize === s ? '' : s)} className="rounded-full px-3 py-1 text-sm font-medium border min-h-[36px] transition-colors" style={{ backgroundColor: selectedSize === s ? 'var(--color-primary)' : 'transparent', color: selectedSize === s ? '#fff' : 'var(--color-text)', borderColor: selectedSize === s ? 'var(--color-primary)' : 'var(--color-border)' }}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Availability</div>
                <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                  <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="w-4 h-4 rounded" style={{ accentColor: 'var(--color-primary)' }} />
                  <span className="text-sm" style={{ color: 'var(--color-text)' }}>Available today only</span>
                </label>
              </div>
            </div>
            {(selectedService || selectedSize || availableOnly) && (
              <button onClick={() => { setSelectedService(''); setSelectedSize(''); setAvailableOnly(false) }} className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: 'var(--color-error)' }}>
                <X size={14} />Clear filters
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>{results.length} groomer{results.length !== 1 ? 's' : ''} found</span>
          <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm rounded-lg border px-3 py-2 min-h-[40px]" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text)' }} aria-label="Sort groomers">
            {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🐶</div>
            <div className="font-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>No groomers found</div>
            <div style={{ color: 'var(--color-text-secondary)' }}>Try adjusting your filters or search term.</div>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {results.map(g => (
              <Link key={g.id} to={`/groomers/${g.id}`} className="block rounded-xl border p-5 transition-shadow hover:shadow-md" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: 'var(--color-bg-muted)' }}>{g.avatar_emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{g.name}</h3>
                      {g.background_checked && <ShieldCheck size={14} style={{ color: 'var(--color-success)' }} aria-label="Background checked" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      <MapPin size={12} aria-hidden />{g.city}, {g.state}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={13} fill="currentColor" style={{ color: 'var(--color-warning)' }} />
                      <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{g.rating.toFixed(1)}</span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>({g.review_count})</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {g.specialties.slice(0, 2).map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                  {g.available_today && <Badge className="text-xs" style={{ backgroundColor: 'rgba(22,163,74,0.12)', color: 'var(--color-success)', border: 'none' }}>Available today</Badge>}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center rounded-lg p-3" style={{ backgroundColor: 'var(--color-bg-muted)' }}>
                  {[['S', g.price_small], ['M', g.price_medium], ['L', g.price_large]].map(([label, price]) => (
                    <div key={String(label)}>
                      <div className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-text-secondary)' }}>{label}</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{formatCurrency(Number(price))}</div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
