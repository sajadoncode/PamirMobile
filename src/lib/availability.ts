import { store } from '../config/store'
import type { AvailabilityStatus, Product } from '../types'

export const LOW_STOCK_THRESHOLD = 3

export function isStockStale(p: Product, now = Date.now()): boolean {
  const ageDays = (now - new Date(p.updatedAt).getTime()) / 86_400_000
  return Number.isNaN(ageDays) || ageDays > store.stockFreshnessDays
}

/** La disponibilità è sempre derivata da quantità, regole d'ordine e data di verifica. */
export function getAvailability(p: Product): AvailabilityStatus {
  if (p.stockQuantity === null || isStockStale(p)) return 'Disponibilità da confermare'
  if (p.stockQuantity <= 0) return p.orderable ? 'Disponibile su ordinazione' : 'Non disponibile'
  if (p.stockQuantity <= LOW_STOCK_THRESHOLD) return 'Disponibilità limitata'
  return 'Disponibile in negozio'
}

export function isInStore(p: Product): boolean {
  const s = getAvailability(p)
  return s === 'Disponibile in negozio' || s === 'Disponibilità limitata'
}
