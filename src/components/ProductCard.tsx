import { Link } from 'react-router-dom'
import { getAvailability } from '../lib/availability'
import type { Product } from '../types'
import AvailabilityBadge from './AvailabilityBadge'
import PriceDisplay from './PriceDisplay'
import ProductImage from './ProductImage'

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="card flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/prodotti/${p.slug}`} className="flex h-full flex-col" aria-label={`${p.name}, ${getAvailability(p)}`}>
        <div className="relative aspect-[4/3]">
          <ProductImage src={p.images[0]} alt={p.name} category={p.category} />
          <span className="absolute left-2 top-2 rounded-md bg-white/95 px-2 py-0.5 text-xs font-semibold text-navy-900 shadow-sm">{p.condition}</span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">{p.brand}</p>
          <h3 className="text-sm font-semibold leading-snug text-ink">{p.name}</h3>
          <div className="mt-auto flex flex-col gap-2 pt-2">
            <PriceDisplay price={p.price} previousPrice={p.previousPrice} />
            <div><AvailabilityBadge status={getAvailability(p)} /></div>
          </div>
        </div>
      </Link>
    </article>
  )
}
