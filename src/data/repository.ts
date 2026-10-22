import type { Category, Product } from '../types'
import { categories, products } from './mock'

/**
 * Livello dati. L'interfaccia è asincrona così da poter sostituire l'implementazione
 * (es. Supabase) senza modificare le pagine e i componenti.
 */
export interface ProductRepository {
  listProducts(): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product | null>
  listCategories(): Promise<Category[]>
}

const delay = () => new Promise((r) => setTimeout(r, 120))

export const mockRepository: ProductRepository = {
  async listProducts() {
    await delay()
    return products.filter((p) => p.published)
  },
  async getProductBySlug(slug) {
    await delay()
    return products.find((p) => p.slug === slug && p.published) ?? null
  },
  async listCategories() {
    return categories
  },
}

export const repository: ProductRepository = mockRepository
export const IS_DEMO_DATA = true
