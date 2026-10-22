import { Info } from 'lucide-react'
import { IS_DEMO_DATA } from '../data/repository'

export default function DemoNotice({ className = '' }: { className?: string }) {
  if (!IS_DEMO_DATA) return null
  return (
    <p className={`flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 ${className}`}>
      <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
      <span>Prodotti, prezzi e quantità sono <strong>dati dimostrativi</strong> a scopo illustrativo e non rappresentano l'inventario reale del negozio. Conferma sempre prezzo e disponibilità con il negozio.</span>
    </p>
  )
}
