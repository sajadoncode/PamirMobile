import { Link } from 'react-router-dom'
import { PLACEHOLDER, store } from '../config/store'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-900 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Logo light />
          <p className="text-sm text-slate-300">Smartphone, SIM, accessori e componenti elettronici a Roma.</p>
        </div>
        <nav aria-label="Link utili" className="text-sm">
          <h2 className="mb-2 font-semibold text-white">Esplora</h2>
          <ul className="space-y-1.5">
            <li><Link className="hover:underline" to="/prodotti">Tutti i prodotti</Link></li>
            <li><Link className="hover:underline" to="/negozio">Il negozio</Link></li>
            <li><Link className="hover:underline" to="/contatti">Contatti</Link></li>
            <li><Link className="hover:underline" to="/privacy">Privacy e cookie</Link></li>
          </ul>
        </nav>
        <address className="text-sm not-italic">
          <h2 className="mb-2 font-semibold text-white">Dove siamo</h2>
          <p>{store.address ?? `${PLACEHOLDER} Indirizzo`}, {store.city}</p>
          <p>Tel: {store.phone ?? PLACEHOLDER}</p>
          {store.email && <p>{store.email}</p>}
        </address>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-300">
        © {new Date().getFullYear()} {store.name}. Prezzi e disponibilità sono indicativi: confermali sempre con il negozio.
      </div>
    </footer>
  )
}
