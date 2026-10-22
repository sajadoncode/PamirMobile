import { SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { applyFilters, filtersFromParams, filtersToParams, type Filters } from '../lib/filters'
import { useProducts } from '../lib/hooks'
import type { CategorySlug } from '../types'
import DemoNotice from './DemoNotice'
import FiltersPanel, { ActiveFilters } from './FiltersPanel'
import ProductGrid from './ProductGrid'
import SearchBar from './SearchBar'
import { EmptyState, ErrorState, LoadingGrid } from './States'

const PAGE_SIZE = 8

export default function CatalogView({ fixedCategory }: { fixedCategory?: CategorySlug }) {
  const [params, setParams] = useSearchParams()
  const { data, loading, error, retry } = useProducts()
  const [showFilters, setShowFilters] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filters = useMemo(() => filtersFromParams(params, fixedCategory), [params, fixedCategory])
  const results = useMemo(() => applyFilters(data ?? [], filters), [data, filters])

  const update = (f: Filters) => {
    setParams(filtersToParams(f, !fixedCategory), { replace: true })
    setVisible(PAGE_SIZE)
  }
  const reset = () => update({ ...filters, q: '', category: fixedCategory ?? '', brands: [], conditions: [], min: null, max: null, onlyAvailable: false })

  return (
    <div className="space-y-4">
      <DemoNotice />
      <SearchBar key={filters.q} id="catalog-search" initial={filters.q} onSearch={(q) => update({ ...filters, q })} />

      <div className="flex items-center justify-between lg:hidden">
        <button className="btn-outline" aria-expanded={showFilters} onClick={() => setShowFilters((s) => !s)}>
          <SlidersHorizontal size={16} aria-hidden /> Filtri e ordinamento
        </button>
        {!loading && !error && <span className="text-sm text-slate-600" aria-live="polite">{results.length} risultati</span>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className={`${showFilters ? 'block' : 'hidden'} card h-fit p-4 lg:block`} aria-label="Filtri">
          <FiltersPanel filters={filters} products={data ?? []} onChange={update} lockCategory={Boolean(fixedCategory)} />
        </aside>

        <section aria-label="Risultati" className="space-y-4">
          <div className="hidden text-sm text-slate-600 lg:block" aria-live="polite">{!loading && !error && `${results.length} risultati`}</div>
          <ActiveFilters filters={filters} onChange={update} lockCategory={Boolean(fixedCategory)} />
          {loading && <LoadingGrid />}
          {error && <ErrorState onRetry={retry} />}
          {!loading && !error && results.length === 0 && (
            <EmptyState title="Nessun prodotto trovato">
              <p>Prova a modificare la ricerca o i filtri. Se non trovi ciò che cerchi, contattaci: potremmo averlo in negozio.</p>
              <button className="btn-primary mt-4" onClick={reset}>Azzera filtri</button>
            </EmptyState>
          )}
          {!loading && !error && results.length > 0 && (
            <>
              <ProductGrid products={results.slice(0, visible)} />
              {visible < results.length && (
                <div className="text-center">
                  <button className="btn-outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>Carica altri</button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}
