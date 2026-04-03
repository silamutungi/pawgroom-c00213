import { Link } from 'react-router-dom'
import { TrendingUp, Shield, Calendar, DollarSign, Users, Zap } from 'lucide-react'

export default function ForGroomers() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-2xl mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(216,90,31,0.12)', color: 'var(--color-primary)', letterSpacing: 'var(--tracking-overline)' }}>For Professional Groomers</div>
          <h1 className="font-bold mb-6" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)', lineHeight: 'var(--leading-tight)' }}>Grow your grooming business on a platform built for professionals.</h1>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-loose)' }}>PawGroom is the only marketplace that requires certifications — which means clients come to us because they want quality. That is the audience you want booking you.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/signup" className="inline-flex items-center justify-center rounded-lg font-semibold px-8 py-3 min-h-[44px] transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Join the marketplace</Link>
            <Link to="/how-it-works" className="inline-flex items-center justify-center rounded-lg font-semibold px-8 py-3 min-h-[44px] border transition-colors hover:opacity-80" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)', backgroundColor: 'transparent' }}>See how it works</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: <Users size={28} />, title: 'Access quality clients', body: 'Dog owners on PawGroom actively filter for certified professionals. You spend less time educating and more time grooming.' },
            { icon: <DollarSign size={28} />, title: 'Set your own pricing', body: 'Define rates by dog size, breed complexity, coat condition, and add-ons. Transparent pricing builds trust and eliminates haggling.' },
            { icon: <Calendar size={28} />, title: 'Real-time scheduling', body: 'Manage your availability calendar and get confirmed bookings automatically — no back-and-forth messages or no-shows.' },
            { icon: <Shield size={28} />, title: 'Liability clarity', body: 'PawGroom Care defines exactly what coverage applies to each appointment. You know your responsibilities before every groom.' },
            { icon: <TrendingUp size={28} />, title: 'Build your reputation', body: 'Verified reviews from real bookings build your profile over time. Great work compounds into a growing client base.' },
            { icon: <Zap size={28} />, title: 'Save 8-10 hours per week', body: 'Automated reminders, digital invoices, and a full booking dashboard replace the manual admin that eats into your day.' },
          ].map(item => (
            <div key={item.title} className="rounded-xl border p-6" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
              <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-10 mb-16" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1.5px solid var(--color-border)' }}>
          <h2 className="font-bold mb-8 text-center" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Simple, transparent commission</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { plan: 'Starter', commission: '15%', desc: 'For groomers just launching their profile. No monthly fee, just a percentage per completed booking.', features: ['Verified profile listing', 'Real-time booking calendar', 'Digital invoices', 'Review collection'] },
              { plan: 'Pro', commission: '10%', desc: 'For established groomers doing consistent volume. Lower commission plus priority placement in search results.', features: ['Everything in Starter', 'Priority search placement', 'Advanced analytics', 'Dedicated support', 'Custom cancellation policy'], highlight: true },
              { plan: 'Studio', commission: '8%', desc: 'For grooming studios and multi-chair businesses. Team management and bulk scheduling tools included.', features: ['Everything in Pro', 'Team member accounts', 'Bulk schedule import', 'Custom branding options'] },
            ].map(p => (
              <div key={p.plan} className="rounded-xl border p-6" style={{ backgroundColor: p.highlight ? 'var(--color-primary)' : 'var(--color-bg)', borderColor: p.highlight ? 'var(--color-primary)' : 'var(--color-border)' }}>
                <div className="font-bold mb-1" style={{ color: p.highlight ? '#fff' : 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{p.plan}</div>
                <div className="font-bold mb-3" style={{ color: p.highlight ? '#fff' : 'var(--color-primary)', fontSize: 'var(--text-title-1)' }}>{p.commission} <span className="text-sm font-normal opacity-70">commission</span></div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: p.highlight ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)' }}>{p.desc}</p>
                <ul className="space-y-2">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: p.highlight ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)' }}>
                      <span className="mt-0.5" style={{ color: p.highlight ? '#fff' : 'var(--color-success)' }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Ready to grow your grooming business?</h2>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>Sign up free today. Your profile is live once credentials are verified — usually within 24 hours.</p>
          <Link to="/signup" className="inline-flex items-center justify-center rounded-lg font-semibold px-10 py-4 min-h-[52px] transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)', color: '#fff', fontSize: 'var(--text-body)' }}>Post your listing</Link>
        </div>
      </div>
    </div>
  )
}
