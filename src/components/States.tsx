import { AlertTriangle, PackageSearch } from 'lucide-react'
import type { ReactNode } from 'react'

export function LoadingGrid({ count = 8 }: { count?: number }) {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <span className="sr-only">Caricamento prodotti…</span>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card h-64 animate-pulse bg-slate-100" />
      ))}
    </div>
  )
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
      <PackageSearch size={40} className="text-slate-500" aria-hidden />
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="max-w-md text-sm text-slate-600">{children}</div>
    </div>
  )
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="card flex flex-col items-center gap-3 px-6 py-12 text-center">
      <AlertTriangle size={40} className="text-amber-600" aria-hidden />
      <h2 className="text-lg font-semibold">Si è verificato un errore</h2>
      <p className="text-sm text-slate-600">Non è stato possibile caricare i prodotti. Riprova tra qualche istante.</p>
      {onRetry && <button onClick={onRetry} className="btn-primary">Riprova</button>}
    </div>
  )
}
