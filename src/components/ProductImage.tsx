import { Cable, CircuitBoard, CreditCard, Smartphone } from 'lucide-react'
import type { CategorySlug } from '../types'

export const categoryIcons = {
  smartphone: Smartphone,
  'sim-telefonia': CreditCard,
  accessori: Cable,
  componenti: CircuitBoard,
} as const

interface Props {
  src?: string
  alt: string
  category: CategorySlug
  className?: string
}

/** Mostra l'immagine del prodotto; in assenza di foto reali usa un segnaposto dichiarato come tale. */
export default function ProductImage({ src, alt, category, className = '' }: Props) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  }
  const Icon = categoryIcons[category]
  return (
    <div role="img" aria-label={`${alt} (foto non ancora disponibile)`} className={`grid h-full w-full place-items-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <Icon size={48} strokeWidth={1.25} aria-hidden />
        <span className="text-xs">Foto non disponibile</span>
      </div>
    </div>
  )
}
