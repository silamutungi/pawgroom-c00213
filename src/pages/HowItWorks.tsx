import { Link } from 'react-router-dom'
import { Search, CalendarCheck, Scissors, Star, DollarSign, BarChart3 } from 'lucide-react'

export default function HowItWorks() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32">
        <div className="text-center mb-20">
          <h1 className="font-bold mb-4" style={{ fontSize: 'var(--text-large-title)', color: 'var(--color-text)' }}>How PawGroom works</h1>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-loose)' }}>Whether you are a dog owner or a professional groomer, PawGroom makes the entire experience seamless.</p>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>1</div>
            <h2 className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>For dog owners</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Search size={32} />, step: '01', title: 'Browse verified groomers', body: 'Search by location, service type, dog size, or availability. Every groomer on PawGroom is background checked and holds at least one professional certification.' },
              { icon: <CalendarCheck size={32} />, step: '02', title: 'Book a real-time slot', body: 'See live availability and select a date and time that works for you. Add your dog details — breed, size, special needs — and confirm instantly with no phone calls needed.' },
              { icon: <Scissors size={32} />, step: '03', title: 'Drop off and relax', body: 'Arrive for your appointment and receive a post-groom report card. Rate your groomer and rebook with one tap if you loved the experience.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border p-7" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="mb-5" style={{ color: 'var(--color-primary)' }}>{item.icon}</div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-overline)' }}>STEP {item.step}</div>
                <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/browse" className="inline-flex items-center justify-center rounded-lg font-semibold px-8 py-3 min-h-[44px] transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-primary)', color: '#fff' }}>Start browsing</Link>
          </div>
        </div>

        <div className="h-px mb-20" style={{ backgroundColor: 'var(--color-border)' }} />

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>2</div>
            <h2 className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>For professional groomers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Star size={32} />, step: '01', title: 'Create your professional profile', body: 'List your services, pricing by size and breed complexity, certifications, and availability. Your credentials are verified before your profile goes live.' },
              { icon: <DollarSign size={32} />, step: '02', title: 'Set transparent pricing', body: 'Define exactly what you charge for small, medium, and large dogs — plus any add-ons like dematting or specialty breeds. No more guessing games with clients.' },
              { icon: <BarChart3 size={32} />, step: '03', title: 'Grow your client base', body: 'Manage your calendar, track bookings, and collect reviews — all in one dashboard. Focus on grooming while PawGroom handles discovery and scheduling.' },
            ].map(item => (
              <div key={item.title} className="rounded-xl border p-7" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
                <div className="mb-5" style={{ color: 'var(--color-accent)' }}>{item.icon}</div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--color-text-muted)', letterSpacing: 'var(--tracking-overline)' }}>STEP {item.step}</div>
                <h3 className="font-semibold mb-3" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/for-groomers" className="inline-flex items-center justify-center rounded-lg font-semibold px-8 py-3 min-h-[44px] transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}>List for free</Link>
          </div>
        </div>

        <div className="rounded-xl p-8 text-center" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1.5px solid var(--color-border)' }}>
          <h3 className="font-bold mb-3" style={{ color: 'var(--color-text)', fontSize: 'var(--text-title-3)' }}>Clear liability — always</h3>
          <p className="max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--leading-loose)' }}>Every appointment on PawGroom is covered by the PawGroom Care Guarantee. Our terms explicitly define what is covered in the event of an incident — so there is no ambiguity for owners or groomers. Real accountability, not fine print deflection.</p>
        </div>
      </div>
    </div>
  )
}
