import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import SearchBar from './SearchBar'

const nav = [
  { to: '/prodotti', label: 'Prodotti' },
  { to: '/categoria/smartphone', label: 'Smartphone' },
  { to: '/categoria/accessori', label: 'Accessori' },
  { to: '/negozio', label: 'Il negozio' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-100 text-navy-900' : 'text-slate-700 hover:bg-slate-100'}`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Logo />
        <nav aria-label="Principale" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => <NavLink key={n.to} to={n.to} className={link}>{n.label}</NavLink>)}
        </nav>
        <div className="hidden w-80 lg:block"><SearchBar id="header-search" /></div>
        <div className="flex items-center gap-2">
          <Link to="/contatti" className="btn-primary hidden sm:inline-flex">Contattaci</Link>
          <button
            className="btn-outline px-3 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="space-y-3 border-t border-slate-200 px-4 py-4 lg:hidden">
          <SearchBar id="mobile-search" />
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((n) => <NavLink key={n.to} to={n.to} className={link}>{n.label}</NavLink>)}
            <NavLink to="/contatti" className={link}>Contatti</NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
