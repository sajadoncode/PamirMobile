import { useEffect, useState } from 'react'
import { repository } from '../data/repository'
import type { Category, Product } from '../types'

interface State<T> { data: T | null; loading: boolean; error: boolean }

function useAsync<T>(load: () => Promise<T>, deps: unknown[]): State<T> & { retry: () => void } {
  const [state, setState] = useState<State<T>>({ data: null, loading: true, error: false })
  const [tick, setTick] = useState(0)
  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: false }))
    load()
      .then((data) => !cancelled && setState({ data, loading: false, error: false }))
      .catch(() => !cancelled && setState({ data: null, loading: false, error: true }))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])
  return { ...state, retry: () => setTick((t) => t + 1) }
}

export const useProducts = () => useAsync<Product[]>(() => repository.listProducts(), [])
export const useProduct = (slug: string) => useAsync<Product | null>(() => repository.getProductBySlug(slug), [slug])
export const useCategories = () => useAsync<Category[]>(() => repository.listCategories(), [])
