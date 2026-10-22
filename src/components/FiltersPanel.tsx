import { X } from 'lucide-react'
import { useMemo } from 'react'
import { categories } from '../data/mock'
import { countActive, defaultFilters, type Filters, type SortKey } from '../lib/filters'
import type { Condition, Product } from '../types'

const conditions: Condition[] = ['Nuovo', 'Ricondizionato', 'Usato']

interface Props {
  filters: Filters
  products: Product[]
  onChange: (f: Filters) => void
  lockCategory?: boolean
}

export default function FiltersPanel({ filters, products, onChange, lockCategory = false }: Props) {
  const brands = useMemo(
    () => [...new Set(products.filter((p) => !filters.category || p.category === filters.category).map((p) => p.brand))].sort(),
    [products, filters.category],
  )
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch })
  const toggle = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])
  const active = countActive(filters, lockCategory)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filtri {active > 0 && <span className="text-slate-600">({active})</span>}</h2>
        {active > 0 && (
          <button className="text-sm font-medium text-brand-600 hover:underline" onClick={() => onChange({ ...defaultFilters, category: lockCategory ? filters.category : '' })}>
            Azzera filtri
          </button>
        )}
      </div>

      <div>
        <label htmlFor="sort" className="mb-1 block text-sm font-medium">Ordina per</label>
        <select id="sort" className="input" value={filters.sort} onChange={(e) => set({ sort: e.target.value as SortKey })}>
          <option value="novita">Ultimi arrivi</option>
          <option value="prezzo-asc">Prezzo: dal più basso</option>
          <option value="prezzo-desc">Prezzo: dal più alto</option>
          <option value="nome">Nome (A-Z)</option>
        </select>
      </div>

      {!lockCategory && (
        <div>
          <label htmlFor="cat" className="mb-1 block text-sm font-medium">Categoria</label>
          <select id="cat" className="input" value={filters.category} onChange={(e) => set({ category: e.target.value as Filters['category'], brands: [] })}>
            <option value="">Tutte le categorie</option>
            {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
        </div>
      )}

      <fieldset>
        <legend className="mb-1 text-sm font-medium">Marca</legend>
        <div className="space-y-1">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4" checked={filters.brands.includes(b)} onChange={() => set({ brands: toggle(filters.brands, b) })} /> {b}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium">Condizione</legend>
        <div className="space-y-1">
          {conditions.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="h-4 w-4" checked={filters.conditions.includes(c)} onChange={() => set({ conditions: toggle(filters.conditions, c) })} /> {c}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-1 text-sm font-medium">Prezzo (€)</legend>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label htmlFor="min" className="sr-only">Prezzo minimo</label>
            <input id="min" type="number" min={0} inputMode="decimal" placeholder="Min" className="input" value={filters.min ?? ''} onChange={(e) => set({ min: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) })} />
          </div>
          <span aria-hidden>–</span>
          <div className="flex-1">
            <label htmlFor="max" className="sr-only">Prezzo massimo</label>
            <input id="max" type="number" min={0} inputMode="decimal" placeholder="Max" className="input" value={filters.max ?? ''} onChange={(e) => set({ max: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) })} />
          </div>
        </div>
      </fieldset>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input type="checkbox" className="h-4 w-4" checked={filters.onlyAvailable} onChange={(e) => set({ onlyAvailable: e.target.checked })} />
        Solo disponibili in negozio
      </label>
    </div>
  )
}

export function ActiveFilters({ filters, onChange, lockCategory }: { filters: Filters; onChange: (f: Filters) => void; lockCategory?: boolean }) {
  const chips: { label: string; clear: () => void }[] = []
  if (filters.q) chips.push({ label: `“${filters.q}”`, clear: () => onChange({ ...filters, q: '' }) })
  if (filters.category && !lockCategory) {
    const name = categories.find((c) => c.slug === filters.category)?.name ?? filters.category
    chips.push({ label: name, clear: () => onChange({ ...filters, category: '' }) })
  }
  filters.brands.forEach((b) => chips.push({ label: b, clear: () => onChange({ ...filters, brands: filters.brands.filter((x) => x !== b) }) }))
  filters.conditions.forEach((c) => chips.push({ label: c, clear: () => onChange({ ...filters, conditions: filters.conditions.filter((x) => x !== c) }) }))
  if (filters.min !== null) chips.push({ label: `Da ${filters.min} €`, clear: () => onChange({ ...filters, min: null }) })
  if (filters.max !== null) chips.push({ label: `Fino a ${filters.max} €`, clear: () => onChange({ ...filters, max: null }) })
  if (filters.onlyAvailable) chips.push({ label: 'Solo disponibili', clear: () => onChange({ ...filters, onlyAvailable: false }) })
  if (!chips.length) return null
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Filtri attivi">
      {chips.map((c) => (
        <li key={c.label}>
          <button onClick={c.clear} className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1 text-sm hover:bg-slate-100" aria-label={`Rimuovi filtro ${c.label}`}>
            {c.label} <X size={14} aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  )
}
