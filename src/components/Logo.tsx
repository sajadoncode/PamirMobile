import { Link } from 'react-router-dom'
import { Smartphone } from 'lucide-react'
import { store } from '../config/store'

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label={`${store.name} - Home`}>
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-900 text-white">
        <Smartphone size={20} aria-hidden />
      </span>
      <span className={`text-base font-bold leading-tight ${light ? 'text-white' : 'text-navy-900'}`}>{store.name}</span>
    </Link>
  )
}
