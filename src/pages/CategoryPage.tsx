import { Link, useParams } from 'react-router-dom'
import CatalogView from '../components/CatalogView'
import { categories } from '../data/mock'
import { useSeo } from '../lib/seo'
import NotFound from './NotFound'

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categories.find((c) => c.slug === slug)
  useSeo(category?.name ?? 'Categoria', category?.description ?? 'Categoria non trovata', !category)
  if (!category) return <NotFound />
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav aria-label="Percorso" className="mb-2 text-sm text-slate-600">
        <Link to="/prodotti" className="hover:underline">Prodotti</Link> / {category.name}
      </nav>
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl">{category.name}</h1>
      <p className="mb-6 mt-1 text-slate-600">{category.description}</p>
      <CatalogView key={category.slug} fixedCategory={category.slug} />
    </div>
  )
}
