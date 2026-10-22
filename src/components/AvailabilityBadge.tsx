import { AlertCircle, CheckCircle2, Clock, HelpCircle, XCircle } from 'lucide-react'
import type { AvailabilityStatus } from '../types'

const styles: Record<AvailabilityStatus, { cls: string; Icon: typeof CheckCircle2 }> = {
  'Disponibile in negozio': { cls: 'bg-emerald-50 text-emerald-800 border-emerald-200', Icon: CheckCircle2 },
  'Disponibilità limitata': { cls: 'bg-amber-50 text-amber-900 border-amber-200', Icon: AlertCircle },
  'Disponibile su ordinazione': { cls: 'bg-blue-50 text-blue-900 border-blue-200', Icon: Clock },
  'Non disponibile': { cls: 'bg-slate-100 text-slate-700 border-slate-300', Icon: XCircle },
  'Disponibilità da confermare': { cls: 'bg-slate-50 text-slate-700 border-slate-300', Icon: HelpCircle },
}

export default function AvailabilityBadge({ status }: { status: AvailabilityStatus }) {
  const { cls, Icon } = styles[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}>
      <Icon size={14} aria-hidden /> {status}
    </span>
  )
}
