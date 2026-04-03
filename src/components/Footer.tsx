import { Link } from 'react-router-dom'
import { Scissors } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--color-bg-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-4 gap-10 mb-10">
          <div className="sm:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold mb-3" style={{ color: 'var(--color-text)', fontSize: 'var(--text-headline)' }}>
              <Scissors size={18} style={{ color: 'var(--color-primary)' }} aria-hidden />
              PawGroom
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>The marketplace for certified professional dog groomers.</p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text)' }}>For owners</div>
            <ul className="space-y-3">
              {[{ to: '/browse', label: 'Find a groomer' }, { to: '/how-it-works', label: 'How it works' }, { to: '/login', label: 'Sign in' }].map(l => (
                <li key={l.to}><Link to={l.to} className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text)' }}>For groomers</div>
            <ul className="space-y-3">
              {[{ to: '/for-groomers', label: 'Join the marketplace' }, { to: '/for-groomers', label: 'Pricing & commission' }, { to: '/how-it-works', label: 'Groomer guide' }].map(l => (
                <li key={l.label}><Link to={l.to} className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text)' }}>Company</div>
            <ul className="space-y-3">
              {[{ to: '/how-it-works', label: 'About' }, { to: '/', label: 'Privacy policy' }, { to: '/', label: 'Terms of service' }].map(l => (
                <li key={l.label}><Link to={l.to} className="text-sm hover:underline" style={{ color: 'var(--color-text-secondary)' }}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>&copy; {year} PawGroom. All rights reserved.</p>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Every groomer is background checked and credential verified.</p>
        </div>
      </div>
    </footer>
  )
}
