import CatalogView from '../components/CatalogView'
import { useSeo } from '../lib/seo'

export default function Catalog() {
  useSeo('Prodotti', 'Sfoglia smartphone nuovi e ricondizionati, SIM, accessori e componenti elettronici. Filtra per marca, prezzo e disponibilità.')
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-navy-900 sm:text-3xl">Prodotti</h1>
      <CatalogView />
    </div>
  )
}
