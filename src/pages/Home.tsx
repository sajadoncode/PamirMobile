import { Headphones, PackageCheck, ShieldCheck, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import DemoNotice from '../components/DemoNotice'
import { categoryIcons } from '../components/ProductImage'
import ProductGrid from '../components/ProductGrid'
import SearchBar from '../components/SearchBar'
import { EmptyState, ErrorState, LoadingGrid } from '../components/States'
import { categories } from '../data/mock'
import { PLACEHOLDER, store } from '../config/store'
import { getAvailability, isInStore } from '../lib/availability'
import { useProducts } from '../lib/hooks'
import { useSeo } from '../lib/seo'

const benefits = [
  { Icon: PackageCheck, title: 'Verifica la disponibilità', text: 'Scrivici o chiamaci prima di venire per confermare prezzo e disponibilità.' },
  { Icon: Headphones, title: 'Assistenza', text: 'Chiedi consiglio sul prodotto giusto per le tue esigenze.' },
  { Icon: Store, title: 'Ritiro in negozio', text: 'Modalità di ritiro e ordinazione da confermare con il negozio.' },
  { Icon: ShieldCheck, title: 'Condizioni chiare', text: 'Ogni prodotto indica se è nuovo, ricondizionato o usato.' },
]

export default function Home() {
  useSeo('Elettronica e telefonia a Roma', 'Smartphone nuovi e ricondizionati, SIM, accessori e componenti elettronici a Roma. Controlla prezzi e disponibilità prima di venire in negozio.')
  const { data, loading, error, retry } = useProducts()
  const featured = (data ?? []).filter((p) => p.featured).slice(0, 4)
  const recent = [...(data ?? [])].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4)
  const inStore = (data ?? []).filter(isInStore).slice(0, 4)

  const section = (title: string, id: string, items: typeof featured, link?: string) => (
    <section aria-labelledby={id} className="space-y-4">
      <div className="flex items-end justify-between">
        <h2 id={id} className="text-xl font-bold text-navy-900 sm:text-2xl">{title}</h2>
        {link && <Link to={link} className="text-sm font-medium text-brand-600 hover:underline">Vedi tutti</Link>}
      </div>
      {loading ? <LoadingGrid count={4} /> : error ? <ErrorState onRetry={retry} /> :
        items.length ? <ProductGrid products={items} /> : <EmptyState title="Nessun prodotto da mostrare" />}
    </section>
  )

  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:py-16">
          <p className="text-sm font-medium text-blue-200">Elettronica e telefonia · {store.city}</p>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">La tecnologia giusta, al prezzo giusto.</h1>
          <p className="max-w-xl text-blue-100">Smartphone nuovi e ricondizionati, SIM, accessori e componenti. Cerca il prodotto e controlla la disponibilità prima di venire in negozio.</p>
          <div className="max-w-2xl"><SearchBar large id="hero-search" /></div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-10">
        <DemoNotice />

        <section aria-labelledby="categorie" className="space-y-4">
          <h2 id="categorie" className="text-xl font-bold text-navy-900 sm:text-2xl">Categorie</h2>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {categories.map((c) => {
              const Icon = categoryIcons[c.slug]
              return (
                <li key={c.slug}>
                  <Link to={`/categoria/${c.slug}`} className="card flex h-full flex-col items-center gap-3 p-5 text-center transition-shadow hover:shadow-md">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-brand-600"><Icon size={26} aria-hidden /></span>
                    <span className="font-semibold">{c.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {section('In evidenza', 'in-evidenza', featured, '/prodotti')}
        {section('Aggiunti di recente', 'recenti', recent, '/prodotti')}

        <section aria-labelledby="disponibilita" className="card space-y-4 p-6">
          <h2 id="disponibilita" className="text-xl font-bold text-navy-900 sm:text-2xl">Disponibilità in negozio</h2>
          <p className="text-slate-600">Mostriamo la disponibilità in base alle quantità registrate e alla data dell'ultimo aggiornamento. Le informazioni possono cambiare durante la giornata: conferma sempre con il negozio.</p>
          {!loading && !error && (
            inStore.length ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {inStore.map((p) => (
                  <li key={p.id}>
                    <Link to={`/prodotti/${p.slug}`} className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50">
                      <span className="font-medium">{p.name}</span>
                      <span className="shrink-0 text-xs text-slate-600">{getAvailability(p)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm">Nessun prodotto con disponibilità verificata al momento.</p>
          )}
          <Link to="/prodotti?disponibili=1" className="btn-primary">Mostra solo i disponibili</Link>
        </section>

        <section aria-labelledby="vantaggi" className="space-y-4">
          <h2 id="vantaggi" className="text-xl font-bold text-navy-900 sm:text-2xl">Perché sceglierci</h2>
          <p className="text-sm text-slate-600">I servizi elencati saranno confermati dal titolare prima della pubblicazione.</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ Icon, title, text }) => (
              <li key={title} className="card p-5">
                <Icon className="mb-3 text-brand-600" aria-hidden />
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="dove" className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="dove" className="text-xl font-bold text-navy-900 sm:text-2xl">Dove siamo</h2>
            <p className="mt-1 text-slate-600">{store.address ?? `${PLACEHOLDER} Indirizzo`}, {store.city}</p>
          </div>
          <Link to="/negozio" className="btn-primary">Orari e indicazioni</Link>
        </section>
      </div>
    </>
  )
}
