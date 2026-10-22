import type { CategorySlug, Condition, Product } from '../types'
import { isInStore } from './availability'

export type SortKey = 'novita' | 'prezzo-asc' | 'prezzo-desc' | 'nome'

export interface Filters {
  q: string
  category: CategorySlug | ''
  brands: string[]
  conditions: Condition[]
  min: number | null
  max: number | null
  onlyAvailable: boolean
  sort: SortKey
}

export const defaultFilters: Filters = {
  q: '', category: '', brands: [], conditions: [], min: null, max: null, onlyAvailable: false, sort: 'novita',
}

const num = (v: string | null) => {
  if (v === null || v.trim() === '') return null
  const n = Number(v)
  return Number.isFinite(n) && n >= 0 ? n : null
}

const SORTS: SortKey[] = ['novita', 'prezzo-asc', 'prezzo-desc', 'nome']

export function filtersFromParams(sp: URLSearchParams, fixedCategory?: CategorySlug): Filters {
  const sort = sp.get('ordina') as SortKey | null
  return {
    q: sp.get('q') ?? '',
    category: fixedCategory ?? ((sp.get('categoria') as CategorySlug | null) ?? ''),
    brands: sp.getAll('marca'),
    conditions: sp.getAll('condizione') as Condition[],
    min: num(sp.get('min')),
    max: num(sp.get('max')),
    onlyAvailable: sp.get('disponibili') === '1',
    sort: sort && SORTS.includes(sort) ? sort : 'novita',
  }
}

export function filtersToParams(f: Filters, withCategory = true): URLSearchParams {
  const sp = new URLSearchParams()
  if (f.q) sp.set('q', f.q)
  if (withCategory && f.category) sp.set('categoria', f.category)
  f.brands.forEach((b) => sp.append('marca', b))
  f.conditions.forEach((c) => sp.append('condizione', c))
  if (f.min !== null) sp.set('min', String(f.min))
  if (f.max !== null) sp.set('max', String(f.max))
  if (f.onlyAvailable) sp.set('disponibili', '1')
  if (f.sort !== 'novita') sp.set('ordina', f.sort)
  return sp
}

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim()

export function applyFilters(list: Product[], f: Filters): Product[] {
  const tokens = norm(f.q).split(' ').filter(Boolean)
  const out = list.filter((p) => {
    if (tokens.length) {
      const hay = norm(`${p.name} ${p.brand} ${p.model} ${p.sku}`)
      if (!tokens.every((t) => hay.includes(t))) return false
    }
    if (f.category && p.category !== f.category) return false
    if (f.brands.length && !f.brands.includes(p.brand)) return false
    if (f.conditions.length && !f.conditions.includes(p.condition)) return false
    if (f.min !== null && p.price < f.min) return false
    if (f.max !== null && p.price > f.max) return false
    if (f.onlyAvailable && !isInStore(p)) return false
    return true
  })
  const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
    novita: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
    'prezzo-asc': (a, b) => a.price - b.price,
    'prezzo-desc': (a, b) => b.price - a.price,
    nome: (a, b) => a.name.localeCompare(b.name, 'it'),
  }
  return out.sort(sorters[f.sort])
}

export function countActive(f: Filters, ignoreCategory = false): number {
  return (
    (f.category && !ignoreCategory ? 1 : 0) + f.brands.length + f.conditions.length +
    (f.min !== null ? 1 : 0) + (f.max !== null ? 1 : 0) + (f.onlyAvailable ? 1 : 0) + (f.q ? 1 : 0)
  )
}
