import { formatPrice } from '../lib/format'

interface Props {
  price: number
  previousPrice?: number
  size?: 'md' | 'lg'
}

export default function PriceDisplay({ price, previousPrice, size = 'md' }: Props) {
  const discounted = previousPrice !== undefined && previousPrice > price
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className={`font-bold text-navy-900 ${size === 'lg' ? 'text-3xl' : 'text-xl'}`}>{formatPrice(price)}</span>
      {discounted && (
        <span className="text-sm text-slate-500 line-through">
          <span className="sr-only">Prezzo precedente </span>{formatPrice(previousPrice)}
        </span>
      )}
    </div>
  )
}
