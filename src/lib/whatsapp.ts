import { store } from '../config/store'
import type { Product } from '../types'
import { formatPrice } from './format'

export const hasWhatsApp = () => Boolean(store.whatsapp && /^\d{8,15}$/.test(store.whatsapp))

export function whatsappUrl(message: string): string | null {
  if (!hasWhatsApp()) return null
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`
}

export function productInquiryUrl(p: Product): string | null {
  return whatsappUrl(
    `Buongiorno, vorrei informazioni sulla disponibilità di ${p.name}, codice ${p.sku}. Il prezzo indicato sul sito è ${formatPrice(p.price)}.`,
  )
}

export const generalInquiryUrl = () =>
  whatsappUrl('Buongiorno, vorrei avere informazioni sui vostri prodotti.')
