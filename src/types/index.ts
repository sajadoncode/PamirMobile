export type CategorySlug = 'smartphone' | 'sim-telefonia' | 'accessori' | 'componenti'

export type Condition = 'Nuovo' | 'Ricondizionato' | 'Usato'

export type AvailabilityStatus =
  | 'Disponibile in negozio'
  | 'Disponibilità limitata'
  | 'Disponibile su ordinazione'
  | 'Non disponibile'
  | 'Disponibilità da confermare'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  model: string
  category: CategorySlug
  sku: string
  description: string
  price: number
  previousPrice?: number
  currency: 'EUR'
  condition: Condition
  /** null = quantità non verificata */
  stockQuantity: number | null
  /** true se il prodotto può essere ordinato quando non è in negozio */
  orderable: boolean
  specifications: Record<string, string>
  images: string[]
  featured: boolean
  published: boolean
  /** ISO 8601 */
  updatedAt: string
}
