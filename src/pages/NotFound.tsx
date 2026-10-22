import { Link } from 'react-router-dom'
import { useSeo } from '../lib/seo'

export default function NotFound() {
  useSeo('Pagina non trovata', 'La pagina che cerchi non esiste.', true)
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-5xl font-bold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-navy-900">Pagina non trovata</h1>
      <p className="mt-2 text-slate-600">La pagina che cerchi non esiste o è stata spostata.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/" className="btn-primary">Torna alla home</Link>
        <Link to="/prodotti" className="btn-outline">Vai ai prodotti</Link>
      </div>
    </div>
  )
}
