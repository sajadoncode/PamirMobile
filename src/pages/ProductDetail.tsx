import { ArrowLeft, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AvailabilityBadge from '../components/AvailabilityBadge'
import DemoNotice from '../components/DemoNotice'
import PriceDisplay from '../components/PriceDisplay'
import ProductImage from '../components/ProductImage'
import { EmptyState, ErrorState } from '../components/States'
import WhatsAppButton from '../components/WhatsAppButton'
import { categories } from '../data/mock'
import { getAvailability } from '../lib/availability'
import { formatDate } from '../lib/format'
import { useProduct } from '../lib/hooks'
import { useSeo } from '../lib/seo'
import { productInquiryUrl } from '../lib/whatsapp'
import NotFound from './NotFound'

export default function ProductDetail() {
  const { slug = '' } = useParams()
  const { data: p, loading, error, retry } = useProduct(slug)
  const [img, setImg] = useState(0)

  useSeo(
    p ? p.name : 'Prodotto',
    p ? `${p.name} (${p.condition}) a Roma. ${p.description}` : 'Dettaglio prodotto',
    !p,
  )

  if (loading) return <div className="mx-auto max-w-7xl px-4 py-8"><div role="status" className="card h-96 animate-pulse bg-slate-100"><span className="sr-only">Caricamento…</span></div></div>
  if (error) return <div className="mx-auto max-w-3xl px-4 py-8"><ErrorState onRetry={retry} /></div>
  if (!p) return <NotFound />

  const status = getAvailability(p)
  const category = categories.find((c) => c.slug === p.category)
  const specs = Object.entries(p.specifications)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link to="/prodotti" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
        <ArrowLeft size={16} aria-hidden /> Torna ai prodotti
      </Link>
      <DemoNotice className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="card aspect-[4/3] overflow-hidden"><ProductImage src={p.images[img]} alt={p.name} category={p.category} /></div>
          {p.images.length > 1 && (
            <ul className="flex gap-2">
              {p.images.map((src, i) => (
                <li key={src} className="h-16 w-16 overflow-hidden rounded-lg border border-slate-200">
                  <button className="h-full w-full" onClick={() => setImg(i)} aria-label={`Mostra immagine ${i + 1}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-600">{p.brand} · {category?.name}</p>
            <h1 className="mt-1 text-2xl font-bold text-navy-900 sm:text-3xl">{p.name}</h1>
            <p className="mt-1 text-sm text-slate-600">Modello: {p.model} · Codice (SKU): <span className="font-mono">{p.sku}</span></p>
          </div>

          <PriceDisplay price={p.price} previousPrice={p.previousPrice} size="lg" />

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold">{p.condition}</span>
            <AvailabilityBadge status={status} />
          </div>

          {status === 'Non disponibile' && <p className="text-sm text-slate-700">Questo prodotto al momento non è disponibile.</p>}
          <p className="text-sm text-slate-600">
            Ultimo aggiornamento: {formatDate(p.updatedAt)}. Prezzo e disponibilità possono variare: conferma con il negozio prima di venire.
          </p>

          <p>{p.description}</p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <WhatsAppButton href={productInquiryUrl(p)} label="Chiedi disponibilità su WhatsApp" />
            <Link to={`/contatti?prodotto=${encodeURIComponent(p.name)}&sku=${encodeURIComponent(p.sku)}`} className="btn-outline">
              <Phone size={18} aria-hidden /> Contatta il negozio
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="specs">
        <h2 id="specs" className="mb-3 text-xl font-semibold">Specifiche principali</h2>
        {specs.length === 0 ? <EmptyState title="Specifiche non disponibili" /> : (
          <dl className="card divide-y divide-slate-200">
            {specs.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 gap-4 px-4 py-3 text-sm sm:grid-cols-[200px_1fr]">
                <dt className="font-medium text-slate-700">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </div>
  )
}
